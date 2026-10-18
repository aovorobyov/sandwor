# sandwor.ru

Сайт студии: услуги, кейсы, блог, формы заявок. Next.js 14 (App Router),
TypeScript, CSS Modules, next-intl (ru / en), архитектура FSD.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

Node.js ≥ 20.

| Скрипт          | Что делает                               |
| --------------- | ---------------------------------------- |
| `npm run build` | продакшн-сборка (`output: 'standalone'`) |
| `npm run lint`  | ESLint + проверка форматирования         |
| `npm test`      | Jest + Testing Library                   |
| `npm run size`  | бюджет бандла (350 KB gzip)              |

## Переменные окружения

`.env.local` в корне:

| Переменная                  | Зачем                                                 |
| --------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_YM_ID`         | счётчик Яндекс.Метрики; без него счётчик не грузится  |
| `NEXT_PUBLIC_SITE_URL`      | канонический адрес; дефолт — `https://sandwor.online` |
| `TELEGRAM_CHANNEL_USERNAME` | канал для отключённого телеграм-движка блога          |
| `TELEGRAM_WEBHOOK_SECRET`   | подпись вебхука того же движка                        |

Заявки идут в amoCRM (см. ниже), Telegram в них не участвует. Две `TELEGRAM_*`
переменные нужны только отключённому движку блога — пока он выключен, сайт
работает и без них.

`NEXT_PUBLIC_*` инлайнятся в бандл на сборке, а собирает GitHub Actions — значит,
значения нужны в секретах репозитория, а не только локально.

## Структура

```
src/
├── app/         # роутинг, API-хендлеры, sitemap/robots/feed — без бизнес-логики
├── views/       # страницы целиком (HomePage, WebsitesPage, CasePage, …)
├── widgets/     # крупные блоки: Header, Footer, CommandPalette, Tariffs
├── features/    # действия пользователя: формы, переключатель языка, cookie-баннер
├── entities/    # сущности: post (статьи), case (кейсы)
└── shared/      # ui-кит, config, lib (seo, jsonLd, analytics, crm)
```

Импорты идут только вниз: `app → views → widgets → features → entities → shared`.
Каждый слайс экспортируется через свой `index.ts`.

## Где что лежит

- **Статьи блога** — `entities/post/model/articles/`, по файлу на статью, ru и en
  в одном черновике. Телеграм-движок (`api/telegram.ts`) сохранён, но отключён:
  активный источник задаётся в `api/posts.ts`.
- **Тексты интерфейса** — `messages/ru.json`, `messages/en.json`.
- **Маршрутизация локалей** — `src/i18n-routing.ts`. Режим `as-needed`: ru без
  префикса, en на `/en/…`.
- **Канонические URL** — `shared/config/site.ts` и `shared/lib/seo/buildLocaleUrl.ts`.
  Через них строятся canonical, hreflang, `sitemap.xml` и Atom-фид.
- **SEO** — `app/sitemap.ts`, `app/robots.ts`, `app/feed.xml/`, `app/api/og/`
  (динамические OG-картинки), `shared/lib/jsonLd`.
- **Конвенции кода** — `.claude/rules/`.

## Аналитика и внешние скрипты

**Яндекс.Метрика** (`shared/lib/analytics`) рендерится из `CookieConsent` — только
после явного согласия. JS-цели собраны в `YM_GOAL` и засчитываются при успешной
отправке форм: `order_websites` и `contact`. Одноимённые цели заводятся вручную
в интерфейсе Метрики.

**Виджет amoCRM** (`shared/lib/crm`) — плавающая кнопка со связью и чатом,
подключена в `app/[locale]/layout.tsx`. Грузится независимо от согласия на cookie:
это канал связи, а не аналитика. `id` и `hash` лежат в `crm/config.ts`, берутся
в amoCRM → «Сайт» → «Кнопка на сайт».

**Заявки в amoCRM.** Обе формы шлют данные на свои роуты (`/api/contact`,
`/api/order`), а оттуда сервер кладёт их в amoCRM (`shared/api/amoForm.ts`) — в ту же
ручку `forms.amocrm.ru/queue/add`, что дёргают её встроенные формы. Запрос идёт со
стороны сервера, поэтому CORS не участвует: ручка не отдаёт нужных заголовков и из
браузера была бы заблокирована. Форме на `/contact` соответствует одна форма в amoCRM,
форме заявки с `/websites` и главной — другая, у каждой свои `form_id`, `hash` и имена
полей. amoCRM — единственный приёмник заявок, поэтому её отказ роут отдаёт как 502:
посетитель увидит ошибку, а не ложное «отправлено».

Идентификаторы форм и имена полей (`fields[name_1]` и подобные) зашиты в
`amoForm.ts`. Свериться после правок формы в amoCRM можно так: отправить её
вручную и посмотреть тело запроса на `queue/add` в devtools.

**Google Search Console** подтверждён мета-тегом: токены перечислены массивом в
`metadata.verification.google` (`app/layout.tsx`). У каждого ресурса свой токен,
поэтому на странице рендерятся оба — каждый ресурс находит нужный.

## Деплой

Автоматически по пушу в `main`:

- `.github/workflows/ci.yml` — lint, типы, тесты, сборка, бюджет бандла;
- `.github/workflows/deploy-selectel.yml` — сборка, rsync standalone-бандла на VPS,
  `systemctl restart sandwor`.
