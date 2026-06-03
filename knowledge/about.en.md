# About sandwor.com

sandwor.com is a personal portfolio site of a frontend developer. It features a
blog, a projects section, news (a changelog), an interactive course, and a
contact page. The interface is bilingual — Russian and English — and the
language switches on the fly without a page reload.

## Sections

- **Home** — a short introduction of the author and the three latest blog posts.
- **Blog** — articles pulled automatically from a Telegram channel. Posts can be
  filtered by tags; each article has a reading progress bar and a "similar
  posts" block.
- **Projects** — the author's work with descriptions, technologies, and links to
  the repository and live demo.
- **News** — the site changelog with semver versions: what changed and when.
- **Course** — interactive learning material with per-lesson progress tracking.
- **Contact** — a feedback form.

## Features

- Command palette via ⌘K — quick post search and navigation, plus theme,
  language and accent-color switching.
- Dark and light themes.
- Smooth page transitions (View Transitions API).
- RSS/Atom feed, sitemap with hreflang, JSON-LD markup, dynamic OG images.

## Tech stack

The site is built with Next.js 14 (App Router) and TypeScript, organized with
the Feature-Sliced Design methodology. Localization uses next-intl, theming uses
next-themes. The blog runs on a Telegram integration: posts are parsed from the
channel's public page and cached, and a webhook purges the cache on every new
post. The site is deployed on Vercel.

## About the assistant

This chat is the sandwor.com site assistant. It answers questions about the
site, its author, blog posts and projects, and can also hold a general
conversation. The assistant runs on a self-hosted language model served locally
and understands both Russian and English.
