import type { FC } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import s from './Checkbox.module.css';

/** Чекбокс с произвольной подписью. Нативный input с accent-color — доступен и без каскада. */
export const Checkbox: FC<CheckboxProps> = (props) => {
  const { name, checked, onChange, children, required } = props;

  return (
    <label className={s.root}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className={s.input}
      />

      <span className={s.label}>{children}</span>
    </label>
  );
};
