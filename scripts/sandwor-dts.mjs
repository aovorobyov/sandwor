/**
 * Раскладывает типы дизайн-системы по файлам компонентов.
 *
 * Архив ДС приносит один `types/index.d.ts` на все компоненты, а сайт импортирует
 * компоненты поштучно (`@sw/components/Button`) — так в клиентский бандл страницы
 * попадают только её компоненты, а не весь barrel. Скрипт кладёт рядом с каждым
 * `*.jsx` и `utils.js` декларацию, которая реэкспортирует нужные значения из общего
 * файла типов.
 *
 * Запускать после замены `src/shared/sandwor` новой версией архива:
 *   node scripts/sandwor-dts.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'shared', 'sandwor');
const srcDir = join(root, 'src');
const componentsDir = join(srcDir, 'components');
const typesFile = readFileSync(join(root, 'types', 'index.d.ts'), 'utf8');

const EXPORT_PATTERN = /^export (?:function|const) (\w+)/gm;
const HEADER = '// Сгенерировано scripts/sandwor-dts.mjs — не редактировать руками.\n';

const declared = (name) => {
  return new RegExp(`export declare (?:function|const) ${name}\\b`).test(typesFile);
};

const exportsOf = (file) => {
  return [...readFileSync(file, 'utf8').matchAll(EXPORT_PATTERN)].map((match) => match[1]);
};

const writeDts = (jsFile, typesPath, extra = '') => {
  const names = exportsOf(jsFile);
  const missing = names.filter((name) => !declared(name));

  if (missing.length > 0) {
    throw new Error(`${jsFile}: нет типов для ${missing.join(', ')}`);
  }

  const dtsFile = jsFile.replace(/\.jsx?$/, '.d.ts');
  const body =
    `${HEADER}export { ${names.join(', ')} } from '${typesPath}';\n` +
    `export type * from '${typesPath}';\n${extra}`;

  writeFileSync(dtsFile, body);
};

for (const file of readdirSync(componentsDir)) {
  if (file.endsWith('.jsx')) {
    writeDts(join(componentsDir, file), '../../types');
  }
}

writeFileSync(
  join(srcDir, 'utils.d.ts'),
  `${HEADER}import type { ServiceId } from '../types';

export declare function cx(...parts: unknown[]): string;
export declare const SERVICES: Record<ServiceId, { id: ServiceId; label: string; icon: string }>;
export declare function formatNumber(n: number): string;
export declare function plural(n: number, forms: [string, string, string]): string;
export declare function formatRub(n: number): string;
`,
);

console.warn('sandwor: декларации компонентов обновлены');
