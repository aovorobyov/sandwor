import { buildBriefLead, isBriefPayload, isSpamBrief, isValidBrief } from '../briefLead';
import type { BriefPayload } from '../briefLead';

const brief = (patch: Partial<BriefPayload> = {}): BriefPayload => {
  return {
    services: ['crm', 'sites'],
    company: 'Кедр',
    teamSize: '6-20',
    task: 'Заявки теряются',
    budget: 'lt100',
    name: 'Ирина',
    contact: '+7 900 123-45-67',
    telegram: false,
    consent: true,
    elapsedMs: 10000,
    ...patch,
  };
};

describe('бриф «Обсудим ваш проект»', () => {
  it('узнаёт тело брифа и отбрасывает чужое', () => {
    expect(isBriefPayload(brief())).toBe(true);
    expect(isBriefPayload({ name: 'Ирина' })).toBe(false);
    expect(isBriefPayload(null)).toBe(false);
  });

  it('требует хотя бы одно известное направление', () => {
    expect(isValidBrief(brief({ services: [] }))).toBe(false);
    expect(isValidBrief(brief({ services: ['seo'] }))).toBe(false);
  });

  it('принимает телефон или ник в Telegram и отклоняет мусор', () => {
    expect(isValidBrief(brief({ contact: '@kedr_mebel' }))).toBe(true);
    expect(isValidBrief(brief({ contact: 't.me/kedr' }))).toBe(true);
    expect(isValidBrief(brief({ contact: '123' }))).toBe(false);
  });

  it('не принимает заявку без согласия на обработку ПД', () => {
    expect(isValidBrief(brief({ consent: false }))).toBe(false);
    expect(isValidBrief(brief({ consent: undefined }))).toBe(false);
  });

  it('записывает в заявку редакцию согласия', () => {
    expect(buildBriefLead(brief()).task).toMatch(/Согласие на обработку ПД: дано, редакция \d/);
  });

  it('требует имя', () => {
    expect(isValidBrief(brief({ name: '  ' }))).toBe(false);
  });

  it('считает мгновенную отправку спамом', () => {
    expect(isSpamBrief(brief({ elapsedMs: 500 }))).toBe(true);
    expect(isSpamBrief(brief())).toBe(false);
  });

  it('собирает примечание для менеджера из всех шагов', () => {
    const lead = buildBriefLead(brief());

    expect(lead.name).toBe('Ирина');
    expect(lead.phone).toBe('+7 900 123-45-67');
    expect(lead.telegram).toBe('');
    expect(lead.task).toContain('Направления: CRM, Сайт');
    expect(lead.task).toContain('Компания: Кедр');
    expect(lead.task).toContain('Бюджет: до 100 тыс. ₽');
    expect(lead.task).toContain('Удобный канал: звонок');
  });

  it('кладёт ник в поле Telegram', () => {
    const lead = buildBriefLead(brief({ contact: '@kedr_mebel' }));

    expect(lead.telegram).toBe('@kedr_mebel');
    expect(lead.task).toContain('Удобный канал: Telegram');
  });
});
