import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { InputProps } from './Input.types';
import s from './Input.module.css';

export const Input: FC<InputProps> = (props) => {
    const { label, error, id, className, ...rest } = props;
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={s.wrapper}>
            {label && (
                <label htmlFor={inputId} className={s.label}>
                    {label}
                </label>
            )}

            <input
                id={inputId}
                className={cn(s.input, error && s.inputError, className)}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...rest}
            />

            {error && (
                <p id={`${inputId}-error`} className={s.error}>
                    {error}
                </p>
            )}
        </div>
    );
};
