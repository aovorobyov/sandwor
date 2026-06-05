'use client';

import type { FC, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/cn';
import type { PlaygroundValue } from './Playground.types';
import { createPlaygroundSpecs } from './Playground.specs';
import { usePlaygroundState } from './usePlaygroundState/usePlaygroundState';
import { buildSnippet } from './lib/buildSnippet';
import { Controls } from './Controls/Controls';
import { Snippet } from './Snippet/Snippet';
import s from './Playground.module.css';

export const Playground: FC = () => {
  const t = useTranslations('uikit');
  const specs = createPlaygroundSpecs(t);
  const { spec, values, selectComponent, changeValue } = usePlaygroundState(specs);

  const code = buildSnippet(spec, values);

  const handleTabClick = (event: MouseEvent<HTMLButtonElement>) => {
    selectComponent(event.currentTarget.dataset.name || '');
  };

  const handleValueChange = (prop: string, value: PlaygroundValue) => {
    changeValue(prop, value);
  };

  return (
    <div className={s.root}>
      <div className={s.tabs} role="tablist">
        {specs.map((item) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={item.name === spec.name}
            data-name={item.name}
            className={cn(s.tab, item.name === spec.name && s.tabActive)}
            onClick={handleTabClick}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className={s.body}>
        <div className={s.preview}>
          <div className={s.previewInner}>{spec.render(values)}</div>
        </div>

        <div className={s.controlsPane}>
          <Controls controls={spec.controls} values={values} onValueChange={handleValueChange} />
        </div>
      </div>

      <Snippet code={code} />
    </div>
  );
};
