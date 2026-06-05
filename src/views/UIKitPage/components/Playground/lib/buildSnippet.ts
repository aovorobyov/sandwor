import type { PlaygroundSpec, PlaygroundValue, PlaygroundValues } from '../Playground.types';

/** Форматирует один проп для JSX-сниппета; пустые строки и false опускаются. */
const formatProp = (prop: string, value: PlaygroundValue): string => {
  switch (typeof value) {
    case 'string':
      return value ? `${prop}="${value}"` : '';
    case 'number':
      return `${prop}={${value}}`;
    case 'boolean':
      return value ? prop : '';
    default:
      return '';
  }
};

/** Собирает JSX-сниппет по текущим значениям пропсов компонента. */
export const buildSnippet = (spec: PlaygroundSpec, values: PlaygroundValues): string => {
  const { name, childrenProp, controls } = spec;

  const attrs = controls
    .filter((control) => {
      return control.prop !== childrenProp;
    })
    .map((control) => {
      return formatProp(control.prop, values[control.prop]);
    })
    .filter(Boolean);

  const opening = [`<${name}`, ...attrs].join(' ');
  const children = childrenProp ? String(values[childrenProp] || '') : '';

  if (!children) {
    return `${opening} />`;
  }

  return `${opening}>\n  ${children}\n</${name}>`;
};
