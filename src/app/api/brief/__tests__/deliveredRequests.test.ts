import { isDelivered, markDelivered } from '../deliveredRequests';
import { getRequestId } from '../briefLead';

describe('защита от дублей брифа', () => {
  it('помнит доставленную заявку 30 минут', () => {
    markDelivered('req-abcdefgh', 1000);

    expect(isDelivered('req-abcdefgh', 1000 + 60_000)).toBe(true);
    expect(isDelivered('req-abcdefgh', 1000 + 31 * 60_000)).toBe(false);
    expect(isDelivered('other-request', 1000)).toBe(false);
  });

  it('берёт только корректный идентификатор отправки', () => {
    const base = {
      services: [],
      company: '',
      teamSize: null,
      task: '',
      budget: null,
      name: '',
      contact: '',
      telegram: false,
    };

    expect(getRequestId({ ...base, requestId: 'Ab3_-xYz90' })).toBe('Ab3_-xYz90');
    expect(getRequestId({ ...base, requestId: 'short' })).toBeUndefined();
    expect(getRequestId({ ...base, requestId: '<script>alert(1)</script>' })).toBeUndefined();
  });
});
