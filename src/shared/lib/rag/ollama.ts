import type { ChatMessage } from './types';

/** Хост локального Ollama; переопределяется через env при выносе в прод. */
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

/** Чат-модель: русский + английский. */
export const CHAT_MODEL = process.env.CHAT_MODEL || 'qwen2.5:3b';

/** Мультиязычная модель эмбеддингов для RAG. */
export const EMBED_MODEL = process.env.EMBED_MODEL || 'bge-m3';

/** Эмбеддит строку запроса — вектор для косинусного поиска по базе знаний. */
export const embedQuery = async (text: string): Promise<number[]> => {
  const res = await fetch(`${OLLAMA_HOST}/api/embed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: text }),
  });

  if (!res.ok) {
    throw new Error(`Ollama embed failed: ${res.status}`);
  }

  const data = (await res.json()) as { embeddings: number[][] };

  return data.embeddings[0];
};

/**
 * Стримит ответ чат-модели. Ollama отдаёт NDJSON-поток; парсим построчно и
 * перекодируем в поток текстовых дельт, готовый отдать в Response.
 */
export const streamChat = async (messages: ChatMessage[]): Promise<ReadableStream<Uint8Array>> => {
  const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: CHAT_MODEL, messages, stream: true }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Ollama chat failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();

      if (done) {
        controller.close();

        return;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) {
          continue;
        }

        const json = JSON.parse(line) as { message?: { content?: string }; done?: boolean };

        if (json.message?.content) {
          controller.enqueue(encoder.encode(json.message.content));
        }

        if (json.done) {
          controller.close();

          return;
        }
      }
    },

    cancel() {
      reader.cancel();
    },
  });
};
