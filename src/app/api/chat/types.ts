import type { ChatMessage } from '@/shared/lib/rag';

export type ChatLocale = 'ru' | 'en';

export interface ChatRequest {
  messages: ChatMessage[];
  locale: ChatLocale;
}
