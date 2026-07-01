import type { FC } from 'react';
import { Button } from '@/shared/ui/Button';
import type { FormSuccessProps } from './FormSuccess.types';
import s from './FormSuccess.module.css';

/** Экран успешной отправки формы: галочка, текст и кнопка возврата к форме. */
export const FormSuccess: FC<FormSuccessProps> = (props) => {
  const { text, actionLabel, onReset } = props;

  const handleReset = () => {
    onReset();
  };

  return (
    <div className={s.root}>
      <svg
        className={s.icon}
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.5 2.5 4.5-5" />
      </svg>

      <p className={s.text}>{text}</p>

      <Button variant="secondary" onClick={handleReset}>
        {actionLabel}
      </Button>
    </div>
  );
};
