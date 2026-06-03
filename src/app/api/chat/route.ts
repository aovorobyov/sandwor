import { embedQuery, retrieve, streamChat } from '@/shared/lib/rag';
import type { ChatMessage } from '@/shared/lib/rag';
import type { ChatLocale, ChatRequest } from './types';

/** Нужен Node-рантайм: модель крутится локально, edge до неё не дотянется. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_HISTORY = 8;
const TOP_K = 5;
const MIN_SCORE = 0.3;

/** Системный промпт под язык пользователя с подложенным RAG-контекстом. */
const buildSystemPrompt = (locale: ChatLocale, context: string): string => {
  switch (locale) {
    case 'en':
      return `You are the assistant for the personal portfolio site sandwor.com.
Use the CONTEXT below to answer questions about the site, its author, blog posts and projects.
If the context does not contain the answer, you may still answer general questions from your own knowledge — but never invent facts about the site or its author.
Answer in English. Be concise, friendly and helpful.

CONTEXT:
${context || '(no relevant context found)'}`;
    case 'ru':
    default:
      return `Ты — ассистент персонального сайта-портфолио sandwor.com.
Используй КОНТЕКСТ ниже для ответов о сайте, его авторе, постах блога и проектах.
Если в контексте нет ответа, можешь ответить на общий вопрос из своих знаний — но никогда не выдумывай факты о сайте или авторе.
Отвечай по-русски. Будь кратким, дружелюбным и полезным.

КОНТЕКСТ:
${context || '(релевантный контекст не найден)'}`;
  }
};

export const POST = async (req: Request): Promise<Response> => {
  let body: ChatRequest;

  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }

  const { messages, locale } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'no messages' }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((message) => message.role === 'user');
  const query = lastUser?.content || '';

  let context = '';

  try {
    const embedding = await embedQuery(query);
    const chunks = await retrieve(embedding, TOP_K);
    context = chunks
      .filter((chunk) => chunk.score > MIN_SCORE)
      .map((chunk) => `[${chunk.title}] ${chunk.text}`)
      .join('\n\n');
  } catch {
    // Эмбеддинг/ретрив недоступны — продолжаем без контекста (общий чат).
  }

  const lang: ChatLocale = locale === 'en' ? 'en' : 'ru';

  const ollamaMessages: ChatMessage[] = [
    { role: 'system', content: buildSystemPrompt(lang, context) },
    ...messages.slice(-MAX_HISTORY),
  ];

  try {
    const stream = await streamChat(ollamaMessages);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return Response.json({ error: 'model unavailable' }, { status: 503 });
  }
};
