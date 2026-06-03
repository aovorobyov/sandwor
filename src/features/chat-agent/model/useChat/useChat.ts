import { useState } from 'react';
import { useLocale } from 'next-intl';
import type { ChatUiMessage, UseChatResult } from './useChat.types';

/**
 * Состояние чата с агентом: история, отправка вопроса и приём стрим-ответа
 * от /api/chat (текстовые дельты дописываются в последнее сообщение ассистента).
 */
export const useChat = (): UseChatResult => {
  const locale = useLocale();
  const [messages, setMessages] = useState<ChatUiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasError, setHasError] = useState(false);

  const send = async (text: string): Promise<void> => {
    const trimmed = text.trim();

    if (!trimmed || isStreaming) {
      return;
    }

    setHasError(false);
    const history = [...messages, { role: 'user', content: trimmed } as ChatUiMessage];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, locale }),
      });

      if (!res.ok || !res.body) {
        throw new Error('chat request failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const delta = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + delta };

          return next;
        });
      }
    } catch {
      setHasError(true);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  };

  const reset = (): void => {
    setMessages([]);
    setHasError(false);
  };

  return { messages, isStreaming, hasError, send, reset };
};
