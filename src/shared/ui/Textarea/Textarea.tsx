import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { TextareaProps } from './Textarea.types';
import s from './Textarea.module.css';

export const Textarea: FC<TextareaProps> = ({ label, error, id, className, ...rest }) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={s.wrapper}>
            {label && (
                <label htmlFor={inputId} className={s.label}>
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={cn(s.textarea, error && s.textareaError, className)}
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
