'use client';

import { useId } from 'react';
import type { FC, MouseEvent } from 'react';
import { cn } from '@/shared/lib/cn';
import { useSelectState } from './useSelectState/useSelectState';
import type { SelectProps } from './Select.types';
import s from './Select.module.css';

export const Select: FC<SelectProps> = (props) => {
  const { value, options, onChange, name, className } = props;
  const { isOpen, rootRef, toggle, close } = useSelectState();
  const listId = useId();

  const selected = options.find((option) => {
    return option.value === value;
  });

  const handleTriggerClick = () => {
    toggle();
  };

  const handleOptionClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChange(event.currentTarget.dataset.value || '', name || '');
    close();
  };

  return (
    <div ref={rootRef} className={cn(s.root, className)}>
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        name={name}
        className={s.trigger}
        onClick={handleTriggerClick}
      >
        <span className={s.triggerLabel}>{selected?.label || value}</span>

        <span className={cn(s.arrow, isOpen && s.arrowOpen)} aria-hidden />
      </button>

      {isOpen && (
        <div id={listId} className={s.list} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              data-value={option.value}
              className={s.option}
              onClick={handleOptionClick}
            >
              <span
                className={cn(s.optionDot, option.value === value && s.optionDotActive)}
                aria-hidden
              />

              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
