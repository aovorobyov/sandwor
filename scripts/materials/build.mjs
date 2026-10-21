/**
 * PDF-материалы и их обложки: public/materials/<id>-<locale>.pdf и <id>-<locale>.webp.
 *
 *   node scripts/materials/build.mjs        # все материалы
 *   node scripts/materials/build.mjs site   # только id, начинающиеся с «site»
 *
 * Тексты — scripts/materials/content.mjs, вёрстка — material.html на токенах ДС.
 * Печать — Chrome DevTools Protocol (Page.printToPDF), без сторонних библиотек.
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { MATERIALS } from './content.mjs';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const OUT = join(ROOT, 'public/materials');
const only = process.argv[2] || '';
const CHROME =
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const EDITION = { ru: 'Редакция: октябрь 2026', en: 'Edition: October 2026' };
const POINTS = { ru: 'пунктов', en: 'points' };

/**
 * Неразрывные пробелы, чтобы в PDF не было переносов «до 1 / млн ₽», «ст. / 9» и строк,
 * начинающихся с тире: число + единица, сокращения перед числом, однобуквенные слова (RU).
 */
const NBSP = '\u00a0';
const UNITS =
  'тыс\\.|млн|млрд|₽|рабоч|дн|час|лет|год|месяц|минут|пункт|thousand|million|roubles|working|days|hours|years|months';
const typograph = (text, locale) => {
  let out = text
    .replace(new RegExp(`(\\d) (?=${UNITS})`, 'g'), `$1${NBSP}`)
    .replace(/(\d), (?=\d)/g, `$1,${NBSP}`)
    .replace(/(^|[\s(])(ст\.|ч\.|п\.|пп\.|№|art\.|part|clause|No\.) (?=\d)/g, `$1$2${NBSP}`)
    .replace(/ —/g, `${NBSP}—`);
  if (locale === 'ru') {
    // Два прохода: «и в своём» — у второго слова пробел перед ним уже занят первым.
    for (let i = 0; i < 2; i++) {
      out = out.replace(/(^|[\s(«])([вВиИсСкКоОуУаАяЯ]) /g, `$1$2${NBSP}`);
    }
  }
  return out;
};
const typographAll = (value, locale) => {
  if (typeof value === 'string') return typograph(value, locale);
  if (Array.isArray(value)) return value.map((item) => typographAll(item, locale));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typographAll(v, locale)]));
  }
  return value;
};

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const server = createServer((req, res) => {
  const file = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(ROOT) || !existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(8814, '127.0.0.1', r));

const port = 9600 + Math.floor(Math.random() * 300);
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cdp-'))}`,
    '--no-first-run',
    '--hide-scrollbars',
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let list;
for (let i = 0; i < 60 && !list; i++) {
  try {
    list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  } catch {
    await sleep(200);
  }
}
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

mkdirSync(OUT, { recursive: true });
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 794,
  height: 1123,
  deviceScaleFactor: 1.5,
  mobile: false,
});

for (const [materialId, locales] of Object.entries(MATERIALS)) {
  if (!materialId.startsWith(only)) continue;
  for (const [locale, data] of Object.entries(locales)) {
    const payload = {
      ...typographAll(data, locale),
      edition: EDITION[locale],
      pointsLabel: POINTS[locale],
    };
    const url = `http://127.0.0.1:8814/scripts/materials/material.html?v=${materialId}-${locale}#${encodeURIComponent(JSON.stringify(payload))}`;
    await send('Page.navigate', { url });
    for (let i = 0; i < 50; i++) {
      const r = await send('Runtime.evaluate', {
        expression: 'document.body.dataset.ready',
        returnByValue: true,
      });
      if (r.result.result.value === '1') break;
      await sleep(100);
    }
    await sleep(300);

    const pdf = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true });
    writeFileSync(join(OUT, `${materialId}-${locale}.pdf`), Buffer.from(pdf.result.data, 'base64'));

    // Обложка для блока на сайте — верх первой страницы.
    const shot = await send('Page.captureScreenshot', {
      format: 'webp',
      quality: 82,
      clip: { x: 0, y: 0, width: 794, height: 1060, scale: 0.5 },
    });
    writeFileSync(
      join(OUT, `${materialId}-${locale}.webp`),
      Buffer.from(shot.result.data, 'base64'),
    );
    console.log('material', `${materialId}-${locale}`);
  }
}

ws.close();
chrome.kill();
server.close();
