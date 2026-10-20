import type { AbstractIntlMessages } from 'next-intl';

/**
 * Разделы переводов, которые нужны клиентским компонентам (шапка, подвал, бриф,
 * cookie, палитра, калькулятор, тарифы, страница ошибки). Остальное — тексты
 * страниц, политика, кейсы — рендерится на сервере и в браузер не уходит.
 *
 * Новый клиентский компонент с useTranslations — добавьте его раздел сюда,
 * иначе в браузере будет MISSING_MESSAGE.
 */
const CLIENT_NAMESPACES = [
  '404',
  'error-page',
  'brand',
  'brief',
  'calculator',
  'common',
  'contacts',
  'cookie',
  'footer',
  'header',
  'materials',
  'nav',
  'palette',
  'service-labels',
  'services',
] as const;

/** Из согласий клиенту нужны только подписи чекбокса в брифе, а не сами документы. */
const CONSENT_KEYS = ['checkbox', 'checkbox-policy', 'checkbox-policy-link'] as const;

export const pickClientMessages = (messages: AbstractIntlMessages): AbstractIntlMessages => {
  const picked: AbstractIntlMessages = {};

  for (const ns of CLIENT_NAMESPACES) {
    if (messages[ns] !== undefined) picked[ns] = messages[ns];
  }

  const consent = messages.consent as Record<string, unknown> | undefined;
  if (consent) {
    picked.consent = Object.fromEntries(
      CONSENT_KEYS.filter((key) => key in consent).map((key) => [key, consent[key]]),
    ) as AbstractIntlMessages;
  }

  return picked;
};
