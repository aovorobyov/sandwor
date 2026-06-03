export type ChunkSource = 'about' | 'project' | 'post';

export type ChatRole = 'system' | 'user' | 'assistant';

export interface KnowledgeChunk {
  id: string;
  source: ChunkSource;
  title: string;
  url: string;
  lang: string;
  text: string;
  embedding: number[];
}

export interface KnowledgeIndex {
  model: string;
  dim: number;
  chunks: KnowledgeChunk[];
}

export interface RetrievedChunk {
  title: string;
  url: string;
  text: string;
  score: number;
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
}
