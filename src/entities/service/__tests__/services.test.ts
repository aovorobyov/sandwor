import ru from '../../../../messages/ru.json';
import en from '../../../../messages/en.json';
import { ACTIVE_SERVICE_IDS, SERVICE_STATUS, isServiceActive } from '../model/services';

describe('статусы направлений', () => {
  it('сейчас работают только сайты, остальное — «Скоро»', () => {
    expect(ACTIVE_SERVICE_IDS).toEqual(['sites']);
    expect(SERVICE_STATUS).toEqual({ crm: 'soon', sites: 'active', smm: 'soon', ai: 'soon' });
    expect(isServiceActive('crm')).toBe(false);
  });

  it('в текстах нет упоминаний Битрикс24 — партнёрство только с amoCRM', () => {
    const text = JSON.stringify(ru) + JSON.stringify(en);

    expect(text).not.toMatch(/битрикс|bitrix/i);
  });
});
