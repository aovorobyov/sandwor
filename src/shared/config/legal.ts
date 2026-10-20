import { SITE_HOST } from './site';

/**
 * Реквизиты оператора персональных данных и редакция юридических документов.
 * Подставляются в политику (/privacy), согласия (/consent), бриф и заявку в amoCRM
 * вместо меток {operator}, {operator_dat}, {inn_part}, {email}, {edition}, {version}, {site}.
 *
 * При любом изменении текстов политики или согласий — новая дата в `edition`,
 * а для согласий ещё и `consentVersion`: версия уходит в каждую заявку.
 */
export const LEGAL = {
  operator: {
    ru: 'Воробьев Александр Олегович',
    en: 'Alexander Olegovich Vorobyov',
  },
  /** «даю согласие кому?» — для текстов согласий. */
  operatorDative: {
    ru: 'Воробьеву Александру Олеговичу',
    en: 'Alexander Olegovich Vorobyov',
  },
  /** ИНН самозанятого — заполнить; пока пусто, строка «ИНН …» в документах не выводится. */
  inn: '',
  /** Адрес для запросов субъектов и отзыва согласия. */
  email: 'aovorobyov@mail.ru',
  /** Дата текущей редакции политики и согласий. */
  edition: { ru: '20 октября 2026', en: '20 October 2026' },
  consentVersion: '1.0',
} as const;

type LegalLocale = 'ru' | 'en';

/** Подставляет реквизиты оператора в текст документа. */
export const fillLegal = (text: string, locale: string): string => {
  const lang: LegalLocale = locale === 'en' ? 'en' : 'ru';
  const innPart = LEGAL.inn ? (lang === 'en' ? `, TIN ${LEGAL.inn}` : `, ИНН ${LEGAL.inn}`) : '';

  return text
    .replaceAll('{operator_dat}', LEGAL.operatorDative[lang])
    .replaceAll('{operator}', LEGAL.operator[lang])
    .replaceAll('{inn_part}', innPart)
    .replaceAll('{email}', LEGAL.email)
    .replaceAll('{edition}', LEGAL.edition[lang])
    .replaceAll('{version}', LEGAL.consentVersion)
    .replaceAll('{site}', SITE_HOST);
};
