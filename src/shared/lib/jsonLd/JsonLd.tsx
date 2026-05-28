import type { FC } from 'react';
import type { JsonLdProps } from './JsonLd.types';

/** Защита от закрывающего тега в строковых полях схемы. */
const escapeJsonForHtml = (json: string) => {
  return json.replace(/</g, '\\u003c');
};

export const JsonLd: FC<JsonLdProps> = (props) => {
  const { data } = props;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonForHtml(JSON.stringify(data)) }}
    />
  );
};
