export type ChatRole = 'user' | 'assistant';

export interface ChatUiMessage {
  role: ChatRole;
  content: string;
}

export interface UseChatResult {
  messages: ChatUiMessage[];
  isStreaming: boolean;
  hasError: boolean;
  send: (text: string) => Promise<void>;
  reset: () => void;
}
