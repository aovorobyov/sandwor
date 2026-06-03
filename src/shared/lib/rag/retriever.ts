import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { KnowledgeIndex, RetrievedChunk } from './types';

const INDEX_PATH = join(process.cwd(), 'src/shared/lib/rag/knowledge.json');

const EMPTY_INDEX: KnowledgeIndex = { model: '', dim: 0, chunks: [] };

/** Индекс грузится один раз и кэшируется в памяти процесса. */
let cachedIndex: KnowledgeIndex | null = null;

/** Загружает базу знаний; если файла нет — пустой индекс (агент работает как общий чат). */
const loadIndex = async (): Promise<KnowledgeIndex> => {
  if (cachedIndex) {
    return cachedIndex;
  }

  try {
    cachedIndex = JSON.parse(await readFile(INDEX_PATH, 'utf8')) as KnowledgeIndex;
  } catch {
    cachedIndex = EMPTY_INDEX;
  }

  return cachedIndex;
};

/** Косинусное сходство двух векторов. */
const cosine = (a: number[], b: number[]): number => {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);

  return denom > 0 ? dot / denom : 0;
};

/** Возвращает top-k наиболее релевантных запросу кусков базы знаний. */
export const retrieve = async (queryEmbedding: number[], k = 4): Promise<RetrievedChunk[]> => {
  const index = await loadIndex();

  return index.chunks
    .map((chunk) => ({
      title: chunk.title,
      url: chunk.url,
      text: chunk.text,
      score: cosine(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
};
