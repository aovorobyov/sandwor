'use client';

import type { FC } from 'react';
import { Link as ViewTransitionsLink } from 'next-view-transitions';
import { useLocale } from 'next-intl';
import { localizeHref } from './localizeHref';
import type { LinkProps } from './Link.types';

/**
 * Локале-зависимая обёртка над Link из next-view-transitions.
 * Сохраняет view-transitions и подставляет префикс `/{locale}` для не-дефолтной локали,
 * чтобы навигация на EN оставалась на `/en/...`, а не проваливалась в RU.
 */
export const Link: FC<LinkProps> = (props) => {
  const { href, ...rest } = props;
  const locale = useLocale();
  const localizedHref = typeof href === 'string' ? localizeHref(href, locale) : href;

  return <ViewTransitionsLink href={localizedHref} {...rest} />;
};
