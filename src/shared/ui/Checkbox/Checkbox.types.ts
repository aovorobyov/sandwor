import type { ChangeEventHandler, ReactNode } from 'react';

export interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Содержимое подписи — текст и, при необходимости, ссылки. */
  children: ReactNode;
  required?: boolean;
}
