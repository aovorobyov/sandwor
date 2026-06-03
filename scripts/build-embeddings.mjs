// @ts-nocheck
/**
 * Сборка базы знаний для RAG-агента сайта.
 *
 * Источники: знания о сайте (knowledge/*.md), проекты (projects.json) и посты
 * блога (публичная страница Telegram-канала). Каждый источник бьётся на чанки,
 * каждый чанк эмбеддится локальной моделью bge-m3 через Ollama, результат
 * пишется в src/shared/lib/rag/knowledge.json.
 *
 * Запуск: npm run embeddings (Ollama должен быть запущен и модель bge-m3 скачана).
 */

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = join(ROOT, 'src/shared/lib/rag/knowledge.json');
const KNOWLEDGE_DIR = join(ROOT, 'knowledge');
const PROJECTS_PATH = join(ROOT, 'src/entities/project/data/projects.json');

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const EMBED_MODEL = process.env.EMBED_MODEL || 'bge-m3';
const MAX_CHUNK_CHARS = 700;
const MIN_POST_CHARS = 100;

/** Считывает TELEGRAM_CHANNEL_USERNAME: из окружения или из .env.local. */
const readChannel = async () => {
  if (process.env.TELEGRAM_CHANNEL_USERNAME) {
    return process.env.TELEGRAM_CHANNEL_USERNAME;
  }

  const envPath = join(ROOT, '.env.local');

  if (!existsSync(envPath)) {
    return '';
  }

  const env = await readFile(envPath, 'utf8');
  const match = env.match(/^TELEGRAM_CHANNEL_USERNAME=(.+)$/m);

  return match ? match[1].trim() : '';
};

/** HTML → чистый текст. */
const htmlToText = (html) => {
  return parse(html)
    .text.replace(/\s{2,}/g, ' ')
    .trim();
};

/** Бьёт текст на чанки по абзацам, не длиннее MAX_CHUNK_CHARS. */
const chunkText = (text) => {
  const paragraphs = text
    .split(/\n{2,}|\.\s+(?=[А-ЯA-Z])/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if ((current + paragraph).length > MAX_CHUNK_CHARS && current) {
      chunks.push(current.trim());
      current = '';
    }

    current += `${paragraph} `;
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
};

/** Знания о сайте из knowledge/*.md. */
const collectAbout = async () => {
  if (!existsSync(KNOWLEDGE_DIR)) {
    return [];
  }

  const files = (await readdir(KNOWLEDGE_DIR)).filter((f) => f.endsWith('.md'));
  const docs = [];

  for (const file of files) {
    const lang = file.includes('.en.') ? 'en' : 'ru';
    const raw = await readFile(join(KNOWLEDGE_DIR, file), 'utf8');
    const text = raw.replace(/^#.*$/gm, '').replace(/[*_`>#-]/g, '');

    chunkText(text).forEach((chunk, i) => {
      docs.push({
        id: `about-${lang}-${i}`,
        source: 'about',
        title: 'О сайте sandwor.com',
        url: '/',
        lang,
        text: chunk,
      });
    });
  }

  return docs;
};

/** Проекты из projects.json (ru и en отдельно). */
const collectProjects = async () => {
  const projects = JSON.parse(await readFile(PROJECTS_PATH, 'utf8'));
  const docs = [];

  for (const project of projects) {
    for (const lang of ['ru', 'en']) {
      const title = project.title[lang];
      const description = project.description[lang];
      const body = htmlToText(project.body[lang]);
      const tags = project.tags.join(', ');
      const text = `${title}. ${description} Технологии: ${tags}. ${body}`;

      chunkText(text).forEach((chunk, i) => {
        docs.push({
          id: `project-${project.slug}-${lang}-${i}`,
          source: 'project',
          title,
          url: `/projects/${project.slug}`,
          lang,
          text: chunk,
        });
      });
    }
  }

  return docs;
};

/** Посты блога с публичной страницы Telegram-канала. */
const collectPosts = async (channel) => {
  if (!channel) {
    console.warn('  ! TELEGRAM_CHANNEL_USERNAME не задан — посты пропущены');
    return [];
  }

  const res = await fetch(`https://t.me/s/${channel}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NextJS)' },
  });

  if (!res.ok) {
    console.warn(`  ! Telegram вернул ${res.status} — посты пропущены`);
    return [];
  }

  const root = parse(await res.text());
  const docs = [];

  for (const wrap of root.querySelectorAll('.tgme_widget_message_wrap')) {
    const msg = wrap.querySelector('[data-post]');
    const textEl = wrap.querySelector('.tgme_widget_message_text');
    const id = (msg?.getAttribute('data-post') ?? '').split('/').at(-1) ?? '';
    const plain = (textEl?.text ?? '').replace(/\s{2,}/g, ' ').trim();

    if (!id || plain.length < MIN_POST_CHARS) {
      continue;
    }

    const title = plain.split('\n')[0].replace(/#\S+/g, '').trim().slice(0, 120);

    chunkText(plain).forEach((chunk, i) => {
      docs.push({
        id: `post-${id}-${i}`,
        source: 'post',
        title: title || `Post #${id}`,
        url: `/blog/${id}`,
        lang: 'ru',
        text: chunk,
      });
    });
  }

  return docs;
};

/** Эмбеддит один текст через Ollama. */
const embed = async (text) => {
  const res = await fetch(`${OLLAMA_HOST}/api/embed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: text }),
  });

  if (!res.ok) {
    throw new Error(`Ollama embed failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();

  return data.embeddings[0];
};

const main = async () => {
  console.log('→ Сбор источников...');
  const channel = await readChannel();

  const [about, projects, posts] = await Promise.all([
    collectAbout(),
    collectProjects(),
    collectPosts(channel),
  ]);

  const docs = [...about, ...projects, ...posts];
  console.log(`  about: ${about.length}, projects: ${projects.length}, posts: ${posts.length}`);
  console.log(`→ Эмбеддинг ${docs.length} чанков моделью ${EMBED_MODEL}...`);

  const chunks = [];
  let dim = 0;

  for (let i = 0; i < docs.length; i++) {
    const embedding = await embed(docs[i].text);
    dim = embedding.length;
    chunks.push({ ...docs[i], embedding });

    if ((i + 1) % 10 === 0 || i === docs.length - 1) {
      console.log(`  ${i + 1}/${docs.length}`);
    }
  }

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, JSON.stringify({ model: EMBED_MODEL, dim, chunks }, null, 2));

  console.log(`✓ Записано ${chunks.length} чанков (dim ${dim}) → ${OUTPUT}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
