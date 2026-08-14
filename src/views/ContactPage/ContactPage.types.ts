/** Идентификатор канала связи. Совпадает с именем SVG-иконки. */
export type ContactChannelId = 'telegram' | 'github' | 'mail';

/** Канал связи в ряду соцсетей. */
export interface ContactChannel {
  id: ContactChannelId;
  label: string;
  href: string;
}
