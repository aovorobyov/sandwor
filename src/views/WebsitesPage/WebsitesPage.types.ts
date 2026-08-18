export interface ToolItem {
  title: string;
  desc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type DirectChannelId = 'telegram' | 'whatsapp';
