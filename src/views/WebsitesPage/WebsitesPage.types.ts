export interface ToolItem {
  title: string;
  desc: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TariffItem {
  title: string;
  price: string;
  desc: string;
  features: string[];
}

export interface ReviewItem {
  author: string;
  role: string;
  text: string;
}

export type DirectChannelId = 'telegram' | 'whatsapp';
