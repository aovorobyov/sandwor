'use client';

import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';
import { useChat } from '../../model/useChat/useChat';
import s from './ChatAgent.module.css';

export const ChatAgent: FC = () => {
  const t = useTranslations('chat');
  const { messages, isStreaming, hasError, send, reset } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input;
    setInput('');
    await send(text);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      {isOpen && (
        <div className={s.panel} role="dialog" aria-label={t('title')}>
          <div className={s.header}>
            <span className={s.title}>{t('title')}</span>

            <div className={s.headerActions}>
              <button
                type="button"
                className={s.iconButton}
                onClick={handleReset}
                aria-label={t('reset')}
              >
                ↺
              </button>

              <button
                type="button"
                className={s.iconButton}
                onClick={handleToggle}
                aria-label={t('close')}
              >
                ×
              </button>
            </div>
          </div>

          <div className={s.messages}>
            {messages.length === 0 && <p className={s.greeting}>{t('greeting')}</p>}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(s.message, message.role === 'user' ? s.user : s.assistant)}
              >
                {message.content || (isStreaming && <span className={s.typing}>…</span>)}
              </div>
            ))}

            {hasError && <p className={s.error}>{t('error')}</p>}
          </div>

          <form className={s.inputRow} onSubmit={handleSubmit}>
            <input
              className={s.input}
              value={input}
              onChange={handleInputChange}
              placeholder={t('placeholder')}
              disabled={isStreaming}
              aria-label={t('placeholder')}
            />

            <Button type="submit" size="sm" disabled={isStreaming || !input.trim()}>
              {t('send')}
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={s.launcher}
        onClick={handleToggle}
        aria-label={t('launcher')}
        aria-expanded={isOpen}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </>
  );
};
