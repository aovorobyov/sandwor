# sandwor.ru

Сайт студии sandwor: CRM, сайты, SMM и ИИ-автоматизации. Next.js 14 (App Router),
TypeScript, CSS Modules, next-intl (ru / en), архитектура FSD. Весь интерфейс собран
на дизайн-системе sandwor — правила в [CLAUDE.md](CLAUDE.md).

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

| Переменная                  | Зачем                                                |
| --------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_YM_ID`         | счётчик Яндекс.Метрики; без него счётчик не грузится |
| `NEXT_PUBLIC_SITE_URL`      | канонический адрес; дефолт — `https://sandwor.ru`    |
| `TELEGRAM_CHANNEL_USERNAME` | канал для отключённого телеграм-движка блога         |
| `TELEGRAM_WEBHOOK_SECRET`   | подпись вебхука того же движка                       |

Заявки идут в amoCRM (см. ниже), Telegram в них не участвует. Две `TELEGRAM_*`
переменные нужны только отключённому движку блога — пока он выключен, сайт
работает и без них.

`NEXT_PUBLIC_*` инлайнятся в бандл на сборке, а собирает GitHub Actions — значит,
значения нужны в секретах репозитория, а не только локально.

## Структура

```
src/
├── app/         # роутинг, API-хендлеры, sitemap/robots/feed — без бизнес-логики
├── views/       # страницы целиком (HomePage, ServicePage, CasePage, …)
├── widgets/     # секции и каркас: SiteHeader, SiteFooter, ServicesGrid, PriceCalculator, …
├── features/    # действия пользователя: бриф, переключатель языка, cookie-баннер
├── entities/    # сущности: service (направления), case, post, testimonial
└── shared/      # sandwor (дизайн-система), ui-примитивы, config, lib
```

Импорты идут только вниз: `app → views → widgets → features → entities → shared`.
Каждый слайс экспортируется через свой `index.ts`.

## Где что лежит

- **Дизайн-система** — `shared/sandwor/`: копия архива ДС (токены, шрифты, компоненты,
  типы). Компоненты импортируются поштучно: `import { Button } from '@sw/components/Button'`.
  Локальные правки ДС — в `shared/sandwor/CHANGES.md`.
- **Направления и цены** — `entities/service/model/services.ts` (статусы `active`/`soon`,
  цены «от», калькулятор, тарифы сайтов); тексты — `services.items.<id>` в переводах.
  Сейчас работают только сайты, остальное — «Скоро»; как вернуть — в [CLAUDE.md](CLAUDE.md).
- **Позиционирование** — `shared/config/positioning.ts`: `sites` или `studio`.
- **Отзывы и логотипы клиентов** — `entities/testimonial`. Пока массивы пустые, секции
  на сайте не выводятся.

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

**Cookie-уведомление** (`features/cookie-consent`) — короткое «Продолжая пользоваться
сайтом, вы соглашаетесь на использование cookie и Яндекс Метрики. Подробнее» с кнопкой
«Хорошо», как на skynia.space. Показывается один раз (отметка `cookie-notice` в localStorage
на 365 дней), скрывается само через 30 секунд показа, по «Хорошо» или Esc.

**Яндекс.Метрика** (`shared/lib/analytics`) рендерится из `CookieConsent` при продолжении
пользования сайтом: через 5 секунд на первой странице или раньше — при прокрутке, нажатии,
клавише или переходе; в повторные визиты — сразу. Номер счётчика — в `shared/lib/analytics/config.ts`, работает только на
sandwor.ru. Цели (`order_websites` и цели чек-листов) и что настроить в
Метрике, Вебмастере и Search Console — в локальной инструкции `docs/analytics.md` (папка `docs/`
в репозиторий не входит).

**Виджет amoCRM** (`shared/lib/crm`) — плавающая кнопка со связью и чатом. Рендерится из
`CookieConsent` после того, как уведомление о cookie скрылось (в повторные визиты — сразу),
чтобы не наезжать на него. Пока открыто мобильное меню или модальное окно ДС, кнопка скрыта
(`globals.css`), иначе она перекрывает их кнопки.

**Заявки в amoCRM.** Все заявки идут через бриф «Обсудим ваш проект» (BriefForm
дизайн-системы: в модальном окне из шапки, подвала, калькулятора и тарифов, и
карточкой на `/contact`). Бриф шлёт ответы на `/api/brief`, роут проверяет их
(`app/api/brief/briefLead.ts`), собирает примечание для менеджера и кладёт заявку
в amoCRM (`shared/api/amoForm.ts`) — в ту же ручку `forms.amocrm.ru/queue/add`, что
дёргают её встроенные формы, формой заявки (`ORDER_FORM`). Запрос идёт со стороны
сервера, поэтому CORS не участвует. amoCRM — единственный приёмник заявок, поэтому
её отказ роут отдаёт как 502: посетитель увидит ошибку, а не ложное «отправлено».
Успешная отправка засчитывает цель Метрики `order_websites`.

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
