import type { ChangeEvent, FC } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '@/shared/ui/Select';
import type { PlaygroundControl } from '../Playground.types';
import type { ControlsProps } from './Controls.types';
import s from './Controls.module.css';

export const Controls: FC<ControlsProps> = (props) => {
  const { controls, values, onValueChange } = props;
  const t = useTranslations('uikit');

  const handleSelectChange = (value: string, name: string) => {
    onValueChange(name, value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.name, event.target.checked);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.name, event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.name, Number(event.target.value) || 0);
  };

  const renderControl = (control: PlaygroundControl) => {
    switch (control.type) {
      case 'select':
        return (
          <Select
            name={control.prop}
            value={String(values[control.prop])}
            options={control.options.map((option) => {
              return { value: option, label: option };
            })}
            onChange={handleSelectChange}
          />
        );
      case 'boolean':
        return (
          <input
            className={s.checkbox}
            type="checkbox"
            name={control.prop}
            checked={Boolean(values[control.prop])}
            onChange={handleCheckboxChange}
          />
        );
      case 'text':
        return (
          <input
            className={s.field}
            type="text"
            name={control.prop}
            value={String(values[control.prop])}
            onChange={handleTextChange}
          />
        );
      case 'number':
        return (
          <input
            className={s.field}
            type="number"
            name={control.prop}
            min={control.min}
            max={control.max}
            value={Number(values[control.prop])}
            onChange={handleNumberChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={s.root}>
      <span className={s.title}>{t('playground-props')}</span>

      <ul className={s.list}>
        {controls.map((control) => (
          <li key={control.prop} className={s.item}>
            <label className={s.label}>
              <span className={s.labelText}>{control.prop}</span>

              {renderControl(control)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
