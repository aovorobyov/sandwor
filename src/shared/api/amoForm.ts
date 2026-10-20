/**
 * Отправка заявок с сайта в amoCRM — в ту же ручку, что дёргают её встроенные формы.
 *
 * Server-only и намеренно: браузеру ходить на `forms.amocrm.ru` нельзя — ручка не
 * отдаёт CORS-заголовки, и запрос с нашего домена браузер зарубит. Со стороны сервера
 * CORS не участвует вовсе, это правило только для браузера. Побочно: посетителю не
 * видны ни идентификаторы форм, ни их хеши, и заявка уходит уже после нашей валидации.
 */

import {
  isQueueResponse,
  type AmoContactLead,
  type AmoFormConfig,
  type AmoOrderLead,
} from './amoForm.types';

/** Ручка очереди форм amoCRM. Принимает только `application/x-www-form-urlencoded`. */
const AMO_FORM_URL = 'https://forms.amocrm.ru/queue/add';

/** Форма обратной связи — та, что стоит на `/contact`. */
const CONTACT_FORM: AmoFormConfig = {
  id: '1740602',
  hash: '7fe4d02287a1ee7f536ac93577f01dab',
};

/** Форма заявки на сайт — `/websites` и главная. */
const ORDER_FORM: AmoFormConfig = {
  id: '1740630',
  hash: '01e34c6c1d5c59a6ec1bcf88550ae74d',
};

/**
 * Имена полей в разметке форм amoCRM: собраны из id поля и id значения, поэтому
 * нечитаемы. У телефона и почты есть суффикс типа (`[1461899]`), у текстовых полей его
 * нет. Меняются только вслед за формой в amoCRM — свериться можно, отправив её вручную
 * и посмотрев тело запроса на `queue/add`.
 */
const CONTACT_FIELD = {
  name: 'fields[name_1]',
  email: 'fields[1021661_1][1461911]',
  message: 'fields[note_2]',
  consent: 'fields[1040089_1_1]',
} as const;

const ORDER_FIELD = {
  name: 'fields[name_1]',
  phone: 'fields[1021659_1][1461899]',
  telegram: 'fields[1044355_1]',
  task: 'fields[note_2]',
} as const;

/** Отмеченный чекбокс — amoCRM ждёт ровно `on`, как прислал бы браузер. */
const CHECKED_VALUE = 'on';

/** Часовой пояс бизнеса — в нём amoCRM показывает время обращения. */
const AMO_TIMEZONE = 'Europe/Moscow';

/** Потолок ожидания amoCRM — дольше держать посетителя на кнопке «Отправить» незачем. */
const AMO_TIMEOUT_MS = 5000;

/**
 * Код успеха в ответе ручки. amoCRM отвечает `{"error_code":0,"lock_form":false}`,
 * а на отказ — ненулевым кодом (`{"error_code":400,"msg":"invalid_form"}`), поэтому
 * одного HTTP-статуса мало.
 */
const AMO_OK_CODE = 0;

/**
 * Повтор той же заявки amoCRM отклоняет 400-м с этим `msg`. Для нас это не сбой:
 * сделка уже создана первой отправкой, дублировать её и не нужно.
 */
const AMO_DUPLICATE_MSG = 'queue_duplicate';

/** Случайный идентификатор отправки — по нему amoCRM отсекает дубли ретраев. */
const REQUEST_ID_LENGTH = 10;
const REQUEST_ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** Формат даты у родной формы — `Date.toString()`, то есть en-US и 24 часа. */
const ORIGIN_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: AMO_TIMEZONE,
  weekday: 'short',
  month: 'short',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'longOffset',
});

/** `Tue Aug 25 2026 17:35:40 GMT+0300 (Europe/Moscow)` — как шлёт форма из браузера. */
const formatOriginDate = (): string => {
  const parts = Object.fromEntries(
    ORIGIN_DATE_FORMAT.formatToParts(new Date()).map(({ type, value }) => [type, value]),
  );

  const { weekday, month, day, year, hour, minute, second, timeZoneName } = parts;
  const offset = timeZoneName.replace('GMT', '').replace(':', '') || '+0000';

  return `${weekday} ${month} ${day} ${year} ${hour}:${minute}:${second} GMT${offset} (${AMO_TIMEZONE})`;
};

/** Метка происхождения заявки — amoCRM показывает её в карточке сделки. */
const buildUserOrigin = (referer: string): string => {
  return JSON.stringify({
    datetime: formatOriginDate(),
    timezone: AMO_TIMEZONE,
    referer,
  });
};

const buildRequestId = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(REQUEST_ID_LENGTH));

  return Array.from(bytes, (byte) => REQUEST_ID_ALPHABET[byte % REQUEST_ID_ALPHABET.length]).join(
    '',
  );
};

/**
 * Кладёт заявку в очередь форм amoCRM.
 * Возвращает false при таймауте, сетевой ошибке или отказе ручки.
 */
const submitForm = async (
  form: AmoFormConfig,
  fields: Record<string, string>,
  referer: string,
  requestId: string = buildRequestId(),
): Promise<boolean> => {
  const body = new URLSearchParams({
    ...fields,
    form_id: form.id,
    hash: form.hash,
    user_origin: buildUserOrigin(referer),
    form_request_id: requestId,
  });

  // AbortController, а не AbortSignal.timeout: тот же результат, но без завязки
  // на версию рантайма — в jsdom из тестов метода ещё нет.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AMO_TIMEOUT_MS);

  try {
    const res = await fetch(AMO_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: referer,
      },
      body,
      signal: controller.signal,
    });

    const result: unknown = await res.json().catch(() => null);

    if (!isQueueResponse(result)) {
      // Тело не разобралось — судим по статусу: 2xx у этой ручки означает «принято».
      return res.ok;
    }

    if (result.msg === AMO_DUPLICATE_MSG) {
      return true;
    }

    return res.ok && result.error_code === AMO_OK_CODE;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Сообщение из формы обратной связи. Все поля обязательны, согласие на обработку
 * ПДн проверено раньше — до вызова.
 */
export const sendAmoContactLead = ({
  name,
  email,
  message,
  referer,
  requestId,
}: AmoContactLead): Promise<boolean> => {
  return submitForm(
    CONTACT_FORM,
    {
      [CONTACT_FIELD.name]: name,
      [CONTACT_FIELD.email]: email,
      [CONTACT_FIELD.message]: message,
      [CONTACT_FIELD.consent]: CHECKED_VALUE,
    },
    referer,
    requestId,
  );
};

/** Заявка на сайт. Telegram в форме необязателен — уходит как есть, хоть и пустым. */
export const sendAmoOrderLead = ({
  name,
  phone,
  telegram,
  task,
  referer,
  requestId,
}: AmoOrderLead): Promise<boolean> => {
  return submitForm(
    ORDER_FORM,
    {
      [ORDER_FIELD.name]: name,
      [ORDER_FIELD.phone]: phone,
      [ORDER_FIELD.telegram]: telegram,
      [ORDER_FIELD.task]: task,
    },
    referer,
    requestId,
  );
};
