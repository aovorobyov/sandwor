'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { FC, KeyboardEvent, MouseEvent } from 'react';
import type { ModalProps } from './Modal.types';
import s from './Modal.module.css';

/** Что считаем фокусируемым — для удержания фокуса внутри диалога. */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])';

export const Modal: FC<ModalProps> = (props) => {
  const { isOpen, title, children, onClose } = props;
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  /** Пока модалка открыта: блокируем скролл body, ставим фокус в диалог и возвращаем его при закрытии. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  /** Закрытие по Esc — слушаем на уровне документа, пока модалка открыта. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentKeydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleDocumentKeydown);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  /** Клик по самому диалогу не должен закрывать модалку (всплытие до подложки). */
  const handleDialogClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  /** Удержание Tab внутри диалога: с краёв списка фокусируемых заворачиваем фокус. */
  const handleKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

    if (!focusable || focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const { activeElement } = document;

    if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus();

      return;
    }

    if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleClose}>
      <div
        ref={dialogRef}
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={handleDialogClick}
        onKeyDown={handleKeydown}
      >
        <div className={s.header}>
          <h2 id={titleId} className={s.title}>
            {title}
          </h2>

          <button type="button" className={s.close} onClick={handleClose} aria-label="Закрыть">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className={s.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
