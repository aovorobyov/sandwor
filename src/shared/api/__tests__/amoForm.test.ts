import { sendAmoContactLead, sendAmoOrderLead } from '../amoForm';

const CONTACT_LEAD = {
  name: 'Тест',
  email: 'test@test.test',
  message: 'Тестовое описание',
  referer: 'https://sandwor.ru/contact',
};

const ORDER_LEAD = {
  name: 'Тест',
  phone: '+79999999999',
  telegram: 'sandwor',
  task: 'Лендинг для кофейни',
  referer: 'https://sandwor.ru/websites',
};

/** Разбирает вызов fetch: адрес, настройки и тело как URLSearchParams. */
const readRequest = (call = 0) => {
  const [url, init] = (global.fetch as jest.Mock).mock.calls[call];

  return { url, init, body: init.body as URLSearchParams };
};

/** Ответ успешной ручки: 200 и нулевой код ошибки в теле. */
const okResponse = () => {
  return { ok: true, json: async () => ({ error_code: 0, lock_form: false }) } as Response;
};

describe('отправка заявок в amoCRM', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue(okResponse());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendAmoContactLead', () => {
    it('стучится в ручку очереди форм amoCRM формой, а не JSON', async () => {
      await sendAmoContactLead(CONTACT_LEAD);
      const { url, init } = readRequest();

      expect(url).toBe('https://forms.amocrm.ru/queue/add');
      expect(init.method).toBe('POST');
      expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded; charset=UTF-8');
    });

    it('кладёт поля под именами формы обратной связи', async () => {
      await sendAmoContactLead(CONTACT_LEAD);
      const { body } = readRequest();

      expect(body.get('fields[name_1]')).toBe('Тест');
      expect(body.get('fields[1021661_1][1461911]')).toBe('test@test.test');
      expect(body.get('fields[note_2]')).toBe('Тестовое описание');
      expect(body.get('fields[1040089_1_1]')).toBe('on');
      expect(body.get('form_id')).toBe('1740602');
      expect(body.get('hash')).toBe('7fe4d02287a1ee7f536ac93577f01dab');
    });

    it('передаёт метку происхождения со страницей заявки', async () => {
      await sendAmoContactLead(CONTACT_LEAD);
      const origin = JSON.parse(readRequest().body.get('user_origin') as string);

      expect(origin.referer).toBe(CONTACT_LEAD.referer);
      expect(origin.timezone).toBe('Europe/Moscow');
      expect(origin.datetime).toMatch(/^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4}/);
    });

    it('на каждую отправку выдаёт свой идентификатор запроса', async () => {
      await sendAmoContactLead(CONTACT_LEAD);
      await sendAmoContactLead(CONTACT_LEAD);

      const first = readRequest(0).body.get('form_request_id') as string;
      const second = readRequest(1).body.get('form_request_id') as string;

      expect(first).toHaveLength(10);
      expect(first).not.toBe(second);
    });
  });

  describe('sendAmoOrderLead', () => {
    it('кладёт поля под именами формы заявки на сайт', async () => {
      await sendAmoOrderLead(ORDER_LEAD);
      const { body } = readRequest();

      expect(body.get('fields[name_1]')).toBe('Тест');
      expect(body.get('fields[1021659_1][1461899]')).toBe('+79999999999');
      expect(body.get('fields[1044355_1]')).toBe('sandwor');
      expect(body.get('fields[note_2]')).toBe('Лендинг для кофейни');
      expect(body.get('form_id')).toBe('1740630');
      expect(body.get('hash')).toBe('01e34c6c1d5c59a6ec1bcf88550ae74d');
    });

    it('не шлёт чекбокс согласия — в этой форме его нет', async () => {
      await sendAmoOrderLead(ORDER_LEAD);

      expect(readRequest().body.get('fields[1040089_1_1]')).toBeNull();
    });

    it('отправляет пустой telegram, раз поле формы необязательное', async () => {
      await sendAmoOrderLead({ ...ORDER_LEAD, telegram: '' });

      expect(readRequest().body.get('fields[1044355_1]')).toBe('');
    });
  });

  describe('ответ ручки', () => {
    it('возвращает false, если amoCRM ответила ошибкой', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error_code: 400, msg: 'invalid_form' }),
      } as Response);

      await expect(sendAmoContactLead(CONTACT_LEAD)).resolves.toBe(false);
    });

    it('считает повтор заявки успехом — сделка уже создана первой отправкой', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error_code: 400, msg: 'queue_duplicate' }),
      } as Response);

      await expect(sendAmoContactLead(CONTACT_LEAD)).resolves.toBe(true);
    });

    it('при неразобранном теле судит по статусу ответа', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('not json');
        },
      } as unknown as Response);

      await expect(sendAmoContactLead(CONTACT_LEAD)).resolves.toBe(true);
    });

    it('возвращает false, если запрос не дошёл', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network down'));

      await expect(sendAmoOrderLead(ORDER_LEAD)).resolves.toBe(false);
    });
  });
});
