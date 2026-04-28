# sandwor.space

Personal website scaffold built with Next.js 14, Feature-Sliced Design, and next-intl.

---

## Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14 | Framework (App Router) |
| React | 18 | UI library |
| TypeScript | 5 | Type safety (strict mode) |
| CSS Modules | built-in | Styling |
| next-intl | 3 | i18n (ru / en) |
| next-themes | 0.3 | Dark / Light theme |
| Jest | 29 | Test runner |
| React Testing Library | 16 | Component testing |
| ESLint | 8 | Linting |
| Prettier | 3 | Formatting |

---

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
```

> **Node.js ≥ 18** required.

---

## Project Structure

```
src/
├── app/               # Next.js App Router — routing only, no business logic
│   └── [locale]/      # Locale-based routing (/ru, /en)
│
├── shared/            # Reusable code with no business context
│   ├── ui/            # Base UI components (Button, Input, Badge, Card)
│   ├── config/        # Constants (breakpoints, fonts)
│   ├── lib/           # Utilities (cn helper)
│   └── types/         # Common TypeScript types
│
├── entities/          # Business entities
│   ├── post/          # Post type + PostCard component
│   ├── project/       # Project type + ProjectCard component
│   └── note/          # Note type + NoteItem component
│
├── features/          # User interactions
│   ├── theme-toggle/  # Dark/light mode switcher
│   ├── locale-switch/ # Language switcher (RU / EN)
│   └── contact-form/  # Contact form with submit handler
│
├── widgets/           # Large page blocks composed from entities + features
│   ├── Header/        # Site header with nav, theme toggle, locale switch
│   ├── Footer/        # Site footer
│   ├── PostList/      # Grid of PostCard components
│   ├── ProjectList/   # Grid of ProjectCard components
│   └── NoteList/      # List of NoteItem components
│
└── views/              # Page-level components (testable, separate from app/)
    ├── HomePage/
    ├── BlogPage/
    ├── ArticlePage/
    ├── ProjectsPage/
    ├── NotesPage/
    └── ContactPage/
```

**Layer import rules (FSD):**
`app → pages → widgets → features → entities → shared`

Imports must only go **downward**. `shared` must never import from `features`.

---

## Как добавить новую страницу

1. **Создать page-компонент** в `src/views/NewPage/`:
   ```
   src/views/NewPage/
   ├── NewPage.tsx
   ├── NewPage.module.css
   └── index.ts
   ```

2. **Добавить роут** в `src/app/[locale]/new-page/page.tsx`:
   ```tsx
   import { NewPage } from '@/views/NewPage';
   export default function Page() {
     return <NewPage />;
   }
   ```

3. **Добавить ключи переводов** в `messages/ru.json` и `messages/en.json`:
   ```json
   { "newpage.title": "Новая страница" }
   ```

4. **Добавить ссылку в навигацию** (если нужно) в `src/widgets/Header/config.ts`:
   ```ts
   { href: '/new-page', labelKey: 'nav.newpage' }
   ```

---

## Как добавить новый язык (i18n)

1. Создать `messages/[locale].json` с теми же ключами, что в `ru.json`
2. Добавить локаль в `src/i18n.ts`:
   ```ts
   export const locales = ['ru', 'en', 'de'] as const;
   ```
3. Добавить локаль в `src/middleware.ts` в массив `locales`

---

## Как добавить новый компонент

**FSD-правило:** определи слой по роли компонента:
- Переиспользуемый без бизнес-контекста → `shared/ui/`
- Бизнес-сущность → `entities/[entity]/ui/`
- Пользовательское действие → `features/[feature]/ui/`
- Крупный блок страницы → `widgets/[Widget]/`

**Структура каждого слайса:**
```
ComponentName/
├── ComponentName.tsx        # Компонент
├── ComponentName.module.css # Стили
└── index.ts                 # Public API (export only what's needed)
```

**index.ts:**
```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

**Правило:** другие слои импортируют только из `index.ts`, не напрямую.

---

## Как писать тесты

Тестируем **поведение**, не детали реализации.

**Пример теста компонента:**
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/shared/ui/Button';

it('calls onClick when clicked', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**Пример теста с моком next-intl:**
```tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/ru.json';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale="ru" messages={messages}>
    {children}
  </NextIntlClientProvider>
);

it('renders translated text', () => {
  render(<MyComponent />, { wrapper });
  expect(screen.getByText('Главная')).toBeInTheDocument();
});
```

**Команды:**
```bash
npm test                    # run all tests
npm test -- --watch         # watch mode
npm test -- --coverage      # with coverage report
```

---

## Темизация

Тема переключается через `next-themes`. Провайдер обёрнут в корневом `layout.tsx`.

Атрибут `data-theme="dark"` / `data-theme="light"` устанавливается на `<html>`.

**Добавить новую CSS-переменную:**
1. В `src/app/globals.css` добавь переменную в `:root` (светлая тема)
2. Добавь переопределение в `[data-theme='dark']`

```css
:root {
  --my-color: #123456;
}
[data-theme='dark'] {
  --my-color: #abcdef;
}
```

---

## Адаптивность

Mobile-first. Базовые значения — для мобайла, переопределение — в media-queries.

| Breakpoint | px | Назначение |
|---|---|---|
| `sm` | 640 | Планшет |
| `md` | 1024 | Десктоп |
| `lg` | 1280 | Широкий десктоп |

```css
/* Mobile (default) */
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

В TypeScript: `import { breakpoints } from '@/shared/config/breakpoints'`

---

## Deployment

### Vercel (рекомендуется)

```bash
npx vercel
```

Или подключить GitHub-репозиторий через [vercel.com](https://vercel.com).

### Self-hosted (Node.js)

```bash
npm run build
npm start        # запускает Next.js на порту 3000
```

### Self-hosted (Docker)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
CMD ["node", "server.js"]
```

Добавь в `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: 'standalone',
};
```
