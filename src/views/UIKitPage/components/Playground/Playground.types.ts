import type { ReactNode } from 'react';

/** Перевод в рамках namespace `uikit`. */
export type PlaygroundTranslate = (key: string) => string;

/** Значение пропа в песочнице. */
export type PlaygroundValue = string | number | boolean;

export type PlaygroundValues = Record<string, PlaygroundValue>;

interface PlaygroundControlBase {
  /** Имя пропа компонента. */
  prop: string;
}

export interface PlaygroundSelectControl extends PlaygroundControlBase {
  type: 'select';
  options: readonly string[];
}

export interface PlaygroundBooleanControl extends PlaygroundControlBase {
  type: 'boolean';
}

export interface PlaygroundTextControl extends PlaygroundControlBase {
  type: 'text';
}

export interface PlaygroundNumberControl extends PlaygroundControlBase {
  type: 'number';
  min: number;
  max: number;
}

export type PlaygroundControl =
  | PlaygroundSelectControl
  | PlaygroundBooleanControl
  | PlaygroundTextControl
  | PlaygroundNumberControl;

/** Спецификация одного компонента песочницы. */
export interface PlaygroundSpec {
  /** Имя компонента — подпись таба и тег в сниппете. */
  name: string;
  /** Проп, который рендерится как children в сниппете, а не как атрибут. */
  childrenProp?: string;
  controls: PlaygroundControl[];
  defaults: PlaygroundValues;
  render: (values: PlaygroundValues) => ReactNode;
}
