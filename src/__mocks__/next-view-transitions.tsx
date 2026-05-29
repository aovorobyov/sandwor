/**
 * Jest-стуб для `next-view-transitions`. Сам пакет ESM-only (`import` в dist),
 * Jest не транспилирует его через node_modules — поэтому подсовываем простые
 * аналоги. Для UI-тестов важно только, что `Link` рендерит `<a>`, а
 * `ViewTransitions` пробрасывает children.
 */

import type { AnchorHTMLAttributes, FC, ReactNode } from 'react';

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const { children, ...rest } = props;

  return <a {...rest}>{children}</a>;
};

export const ViewTransitions: FC<{ children: ReactNode }> = (props) => {
  return <>{props.children}</>;
};

const noop = () => {};

export const useTransitionRouter = () => {
  return {
    push: noop,
    replace: noop,
    back: noop,
    forward: noop,
    refresh: noop,
    prefetch: noop,
  };
};
