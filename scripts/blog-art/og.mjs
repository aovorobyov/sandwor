/**
 * Статичные OG-картинки 1200×630 для статей и основных страниц: public/og/<key>-<locale>.jpg.
 *
 *   npm run dev                       # сайт на :3107 — оттуда берём время чтения и заголовки кейсов
 *   node scripts/blog-art/og.mjs      # все картинки
 *   node scripts/blog-art/og.mjs blog # только те, чей ключ начинается с «blog»
 *
 * Тексты — из messages/*.json и статей, цены — из entities/service: картинка не расходится
 * с сайтом. После новой статьи — перезапустить скрипт; без картинки страница возьмёт
 * динамическую обложку /api/og.
 */
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { readFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const SITE = process.env.SITE_URL || 'http://localhost:3107';
const OUT = join(ROOT, 'public/og');
const only = process.argv[2] || '';
const LOCALES = ['ru', 'en'];

const messages = Object.fromEntries(
  LOCALES.map((l) => [l, JSON.parse(readFileSync(join(ROOT, `messages/${l}.json`), 'utf8'))]),
);
const nb = (s = '') => s.replace(/ /g, ' ');

/* Цены тарифов — прямо из entities/service. */
const servicesTs = readFileSync(join(ROOT, 'src/entities/service/model/services.ts'), 'utf8');
const planPrices = Object.fromEntries(
  [...servicesTs.matchAll(/^\s+(\w+): (\d+),$/gm)]
    .filter(([, id]) => ['landing', 'store'].includes(id))
    .map(([, id, n]) => [id, +n]),
);
const rub = (n) => `${n.toLocaleString('ru-RU').replace(/ /g, ' ')} ₽`;

/* Статьи: slug, обложка и тексты — из файлов статей. */
const ARTICLES_DIR = join(ROOT, 'src/entities/post/model/articles');
const articles = readdirSync(ARTICLES_DIR)
  .filter((f) => f.endsWith('.ts') && !['index.ts', 'articles.types.ts'].includes(f))
  .map((f) => {
    const src = readFileSync(join(ARTICLES_DIR, f), 'utf8');
    const slug = src.match(/slug: '([^']+)'/)[1];
    const image = src.match(/image: '([^']+)'/)?.[1];
    const parts = Object.fromEntries(
      LOCALES.map((l) => {
        const block = src.slice(src.indexOf(`    ${l}: {`));
        const pick = (key) =>
          nb(
            block.match(new RegExp(`${key}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1] ?? '',
          ).replace(/\\'/g, "'");
        return [l, { title: pick('title'), tag: pick('tag') }];
      }),
    );
    return { slug, image, ...parts };
  });

const fetchText = async (path) => (await fetch(`${SITE}${path}`)).text();
const readTime = async (path) => (await fetchText(path)).match(/(\d+)\s(?:мин|min)/)?.[1];
const h1 = async (path) => nb((await fetchText(path)).match(/<h1[^>]*>([^<]+)</)?.[1] ?? '');

const specs = [];
const add = (key, locale, data) => specs.push({ key, locale, data });

for (const l of LOCALES) {
  const m = messages[l];
  const sites = m.services.items.sites;
  const plans = sites.plans.map((p) => ({
    name: nb(p.name),
    sub: nb(`${p.subtitle} · ${p.term}`),
    price: planPrices[p.id]
      ? `${l === 'en' ? 'from' : 'от'} ${rub(planPrices[p.id])}`
      : nb(p.price),
  }));

  add('home', l, {
    big: true,
    tag: nb(m.home['hero-sites'].meta),
    title: nb(m.home['hero-sites'].title),
    lead: nb(m.home['hero-sites'].lead),
    // Та же иллюстрация, что на первом экране: снимаем живой блок со страницы (см. ниже).
    art: { type: 'image', src: `../../public/og/.hero-activity-${l}.png` },
  });
  add('services', l, {
    tag: nb(m.services['hero-meta']),
    title: nb(m.services['hero-title']),
    lead: nb(m.services['hero-lead']),
    art: { type: 'plans', head: nb(m.services['plans-panel']), items: plans },
  });
  add('services-sites', l, {
    tag: nb(m.services.title),
    title: nb(sites['hero-title']),
    lead: nb(sites['hero-lead']),
    art: { type: 'plans', head: nb(m.services['plans-panel']), items: plans },
  });
  add('cases', l, {
    tag: nb(m['cases-page'].meta),
    title: nb(m['cases-page'].title),
    lead: nb(m['cases-page'].lead),
    art: {
      type: 'two-sites',
      items: [
        { desktop: '../../public/cases/skynia-hall/hero-1600.webp', domain: 'skynia.space' },
        { desktop: '../../public/cases/model-agency/catalog-1600.webp', domain: 'openupmodels.ru' },
      ],
    },
  });
  add('blog', l, {
    tag: nb(m['blog-page'].meta),
    title: nb(m['blog-page'].title),
    lead: nb(m['blog-page'].lead),
    art: {
      type: 'covers',
      // Схемы из статей наглядней обложек: окупаемость, формула, одна кнопка.
      items: ['cafe-payback', 'vibecoding-formula', 'cta-one-primary'].map(
        (name) => `../../public/blog/${name}-${l}.webp`,
      ),
    },
  });
  add('contact', l, {
    tag: nb(m.nav.contact),
    title: nb(m['contact-page'].title),
    lead: nb(m['contact-page'].lead),
    art: {
      type: 'channels',
      items: [
        { icon: 'brand-telegram', label: 'Telegram', value: '@sandworbot' },
        { icon: 'mail', label: l === 'en' ? 'Email' : 'Почта', value: 'sandwor@mail.ru' },
        { icon: 'phone', label: l === 'en' ? 'Phone' : 'Телефон', value: '+7 985 431-69-70' },
      ],
    },
  });

  for (const slug of ['skynia-hall', 'model-agency']) {
    const prefix = l === 'en' ? '/en' : '';
    const shots =
      slug === 'skynia-hall'
        ? { desktop: 'hero-1600', mobile: 'mobile-hero-780', domain: 'skynia.space' }
        : { desktop: 'catalog-1600', mobile: `mobile-menu-${l}-780`, domain: 'openupmodels.ru' };
    add(`cases-${slug}`, l, {
      tag: nb(m['cases-page'].meta),
      title: await h1(`${prefix}/cases/${slug}`),
      art: {
        type: 'site',
        desktop: `../../public/cases/${slug}/${shots.desktop}.webp`,
        mobile: `../../public/cases/${slug}/${shots.mobile}.webp`,
        domain: shots.domain,
      },
    });
  }

  for (const a of articles) {
    const prefix = l === 'en' ? '/en' : '';
    const minutes = await readTime(`${prefix}/blog/${a.slug}`);
    add(`blog-${a.slug}`, l, {
      tag: a[l].tag,
      title: a[l].title,
      meta: minutes
        ? `${minutes} ${l === 'en' ? 'min read' : 'мин чтения'} · ${l === 'en' ? 'sandwor studio blog' : 'блог sandwor studio'}`
        : '',
      art: { type: 'cover', src: `../../public${a.image}` },
    });
  }
}

/* Статика из корня репозитория: шаблон, токены, шрифты, картинки. */
const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
};
const server = createServer((req, res) => {
  const file = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(ROOT) || !existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(8813, '127.0.0.1', r));

mkdirSync(OUT, { recursive: true });

/* Иллюстрация главной — снимок блока HeroActivity с работающего сайта. */
const shotTool = join(ROOT, 'scripts/blog-art/shot.mjs');
for (const l of LOCALES) {
  if (!'home'.startsWith(only) && only) break;
  await run('node', [
    shotTool,
    `${SITE}${l === 'en' ? '/en' : ''}/`,
    '1280',
    '900',
    join(OUT, `.hero-activity-${l}.png`),
    '--dpr=2',
    '--wait=4200',
    '--clip=[data-hero-activity]',
  ]);
}

const todo = specs.filter((s) => s.key.startsWith(only));
const shot = shotTool;
for (let i = 0; i < todo.length; i += 4) {
  await Promise.all(
    todo.slice(i, i + 4).map(async ({ key, locale, data }) => {
      const url = `http://127.0.0.1:8813/scripts/blog-art/og.html#${encodeURIComponent(JSON.stringify(data))}`;
      const out = join(OUT, `${key}-${locale}.jpg`);
      await run('node', [shot, url, '1200', '630', out, '--dpr=1', '--wait=2500', '--jpeg=86']);
      console.log('og', `${key}-${locale}.jpg`);
    }),
  );
}
server.close();
for (const l of LOCALES) rmSync(join(OUT, `.hero-activity-${l}.png`), { force: true });
