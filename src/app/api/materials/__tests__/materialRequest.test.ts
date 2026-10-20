import { buildMaterialNote, isSpamMaterialRequest, parseMaterialRequest } from '../materialRequest';

const body = (patch: Record<string, unknown> = {}) => ({
  materialId: 'site-law',
  placement: 'article',
  name: 'Анна',
  email: 'anna@example.ru',
  consent: true,
  elapsedMs: 8000,
  ...patch,
});

describe('запрос материала', () => {
  it('принимает корректный запрос', () => {
    expect(parseMaterialRequest(body())).not.toBeNull();
  });

  it('без согласия, с неизвестным материалом или плохой почтой — нет', () => {
    expect(parseMaterialRequest(body({ consent: false }))).toBeNull();
    expect(parseMaterialRequest(body({ materialId: 'other' }))).toBeNull();
    expect(parseMaterialRequest(body({ email: 'anna@' }))).toBeNull();
    expect(parseMaterialRequest(body({ placement: 'popup' }))).toBeNull();
  });

  it('мгновенная отправка — спам', () => {
    expect(isSpamMaterialRequest(parseMaterialRequest(body({ elapsedMs: 300 }))!)).toBe(true);
  });

  it('пишет в заявку материал, место и согласие', () => {
    const note = buildMaterialNote(parseMaterialRequest(body())!);

    expect(note).toContain('«Сайт и закон: что проверить перед запуском»');
    expect(note).toContain('в конце статьи');
    expect(note).toMatch(/Согласие на обработку ПД \(получение материалов\): дано/);
  });
});
