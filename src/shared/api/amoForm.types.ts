/** Реквизиты формы в amoCRM: id и hash из её кода вставки. */
export interface AmoFormConfig {
  id: string;
  hash: string;
}

/** Общее для любой заявки — страница, с которой она пришла. */
export interface AmoLeadOrigin {
  referer: string;
}

/** Заявка с формы обратной связи (`/contact`). */
export interface AmoContactLead extends AmoLeadOrigin {
  name: string;
  email: string;
  message: string;
}

/** Заявка на сайт (`/websites` и главная). */
export interface AmoOrderLead extends AmoLeadOrigin {
  name: string;
  phone: string;
  /** Необязательное поле формы — уходит в amoCRM как есть, хоть и пустым. */
  telegram: string;
  task: string;
}

/** Ответ ручки очереди форм. `msg` приходит только вместе с ошибкой. */
export interface AmoQueueResponse {
  error_code?: number;
  msg?: string;
}

/** Ответ разобрался и похож на ответ очереди форм — иначе судим по HTTP-статусу. */
export const isQueueResponse = (value: unknown): value is AmoQueueResponse => {
  return !!value && typeof value === 'object' && 'error_code' in value;
};
