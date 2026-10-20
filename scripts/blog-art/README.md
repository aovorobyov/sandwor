# Картинки для статей блога

Обложки и схемы статей рисуются HTML-шаблонами на токенах, шрифтах и иконках
дизайн-системы (`src/shared/sandwor`) и снимаются в PNG через headless Chrome.
Готовые файлы — `public/blog/*.webp`.

| Шаблон          | Что внутри                                                                           |
| --------------- | ------------------------------------------------------------------------------------ |
| `figures.html`  | обложки `*-cover` и схемы статей про цены, Tilda/кастом и выбор разработчика         |
| `cta-vibe.html` | обложки и схемы статей про CTA и вайбкодинг                                          |
| `shot.mjs`      | снимок страницы через Chrome DevTools Protocol (`node shot.mjs url w h out.png ...`) |

Параметры шаблона: `?kind=<имя>&lang=ru|en`, для телефона — `&m=1`.
Схема для десктопа — 1200×800, для телефона — 800 по ширине (высота по содержимому);
в статье обе подключаются через `<picture>` с `media="(max-width: 600px)"`.

```bash
# из корня репозитория
python3 -m http.server 8811 --bind 127.0.0.1
node scripts/blog-art/shot.mjs "http://127.0.0.1:8811/scripts/blog-art/figures.html?kind=dev-call&lang=ru" 1200 800 dev-call-ru.png --dpr=1 --wait=1500
node scripts/blog-art/shot.mjs "http://127.0.0.1:8811/scripts/blog-art/figures.html?kind=dev-call&lang=ru&m=1" 800 200 dev-call-ru-m.png --dpr=1 --wait=1500 --full=4000
python3 -c "from PIL import Image; Image.open('dev-call-ru.png').convert('RGB').save('public/blog/dev-call-ru.webp', 'WEBP', quality=86, method=6)"
```

Правила те же, что для сайта: только цвета и шрифты ДС, тёмная тема, никаких
стоковых фото и выдуманных цифр — числа на схемах берутся из текста статьи.
