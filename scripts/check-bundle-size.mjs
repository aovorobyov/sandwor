#!/usr/bin/env node

/**
 * Бюджет на JS-бандл. Считает gzipped-размер всех чанков в .next/static/chunks
 * после `npm run build` и фейлится, если превышен порог. Запускается в CI
 * после `npm run build`.
 *
 * Зачем не size-limit/bundlewatch: для Next.js App Router они требуют тонкой
 * настройки чанк-paths. Простой скрипт честнее измеряет общий «вес» JS, который
 * браузер тянет.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const CHUNKS_DIR = '.next/static/chunks';
const BUDGET_KB = 350;

const collectJsFiles = (dir) => {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectJsFiles(fullPath));
    } else if (entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  return files;
};

const formatKb = (bytes) => {
  return `${(bytes / 1024).toFixed(1)} KB`;
};

try {
  statSync(CHUNKS_DIR);
} catch {
  console.error(`✗ Папка ${CHUNKS_DIR} не найдена — сначала выполни \`npm run build\`.`);
  process.exit(1);
}

const files = collectJsFiles(CHUNKS_DIR);
const totalGzipped = files.reduce((sum, file) => {
  return sum + gzipSync(readFileSync(file)).length;
}, 0);

const budgetBytes = BUDGET_KB * 1024;
const usedPercent = ((totalGzipped / budgetBytes) * 100).toFixed(0);

console.log(`Bundle size (gzipped): ${formatKb(totalGzipped)}`);
console.log(`Budget:                ${formatKb(budgetBytes)}`);
console.log(`Used:                  ${usedPercent}% of budget`);
console.log(`Files checked:         ${files.length}`);

if (totalGzipped > budgetBytes) {
  console.error(`\n✗ Бюджет превышен на ${formatKb(totalGzipped - budgetBytes)}.`);
  console.error('  Запусти `npm run analyze` для разбора, что разрослось.');
  process.exit(1);
}

console.log('\n✓ В рамках бюджета');
