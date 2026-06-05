import { useState } from 'react';
import type { PlaygroundSpec, PlaygroundValue, PlaygroundValues } from '../Playground.types';

/**
 * Состояние песочницы: активный компонент и переопределённые пользователем значения пропсов.
 * Переопределения хранятся по имени компонента, чтобы переключение табов не сбрасывало настройки.
 */
export const usePlaygroundState = (specs: PlaygroundSpec[]) => {
  const [activeName, setActiveName] = useState(specs[0].name);
  const [overridesByName, setOverridesByName] = useState<Record<string, PlaygroundValues> | null>(
    null,
  );

  const spec =
    specs.find((item) => {
      return item.name === activeName;
    }) || specs[0];

  const values: PlaygroundValues = { ...spec.defaults, ...(overridesByName?.[spec.name] || {}) };

  const selectComponent = (name: string) => {
    setActiveName(name);
  };

  const changeValue = (prop: string, value: PlaygroundValue) => {
    setOverridesByName((prev) => {
      return {
        ...(prev || {}),
        [spec.name]: { ...(prev?.[spec.name] || {}), [prop]: value },
      };
    });
  };

  return { spec, values, selectComponent, changeValue };
};
