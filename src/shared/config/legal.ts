import { SITE_HOST } from './site';

/**
 * Реквизиты оператора персональных данных и редакция юридических документов.
 * Подставляются в политику (/privacy), согласия (/consent/…), контакты, бриф и заявку в amoCRM
 * вместо меток {operator}, {operator_dat}, {inn_part}, {address_part}, {email}, {edition},
 * {version}, {site}.
 *
 * Сейчас оператор — самозанятый (НПД). При переходе в ИП: статус в текстах политики и согласий
 * («плательщик налога на профессиональный доход» → «индивидуальный предприниматель»),
 * поле ОГРНИП, новое уведомление в РКН — см. локальную инструкцию docs/rkn-notification.md.
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
  /**
   * Адрес оператора (место нахождения) — владелец сайта обязан его указать
   * (ч. 2 ст. 10 149-ФЗ); тот же адрес — в уведомлении РКН. Пока пусто, не выводится.
   */
  address: { ru: '', en: '' },
  /** Адрес для запросов субъектов и отзыва согласия. */
  email: 'aovorobyov@mail.ru',
  /** Дата текущей редакции политики и согласий. */
  edition: { ru: '22 октября 2026', en: '22 October 2026' },
  consentVersion: '1.4',
} as const;

/**
 * Согласия — каждое на своей странице /consent/<id>: закон требует оформлять согласие
 * отдельно от иных документов, в том числе от согласий на другие цели (ч. 1 ст. 9 152-ФЗ).
 * Тексты — messages/*.json → consent.sections (id совпадает).
 */
export const CONSENT_DOCS = ['request', 'cookies', 'materials'] as const;

export type ConsentDocId = (typeof CONSENT_DOCS)[number];

export const isConsentDoc = (value: string): value is ConsentDocId =>
  (CONSENT_DOCS as readonly string[]).includes(value);

/** Адрес текста согласия (без префикса локали). */
export const consentPath = (id: ConsentDocId): string => `/consent/${id}`;

type LegalLocale = 'ru' | 'en';

/** Подставляет реквизиты оператора в текст документа. */
export const fillLegal = (text: string, locale: string): string => {
  const lang: LegalLocale = locale === 'en' ? 'en' : 'ru';
  const innPart = LEGAL.inn ? (lang === 'en' ? `, TIN ${LEGAL.inn}` : `, ИНН ${LEGAL.inn}`) : '';
  const address = LEGAL.address[lang];
  const addressPart = address
    ? lang === 'en'
      ? `, address: ${address}`
      : `, адрес: ${address}`
    : '';

  return text
    .replaceAll('{operator_dat}', LEGAL.operatorDative[lang])
    .replaceAll('{operator}', LEGAL.operator[lang])
    .replaceAll('{inn_part}', innPart)
    .replaceAll('{address_part}', addressPart)
    .replaceAll('{email}', LEGAL.email)
    .replaceAll('{edition}', LEGAL.edition[lang])
    .replaceAll('{version}', LEGAL.consentVersion)
    .replaceAll('{site}', SITE_HOST);
};
