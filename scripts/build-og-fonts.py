#!/usr/bin/env python3
"""
Сборка брендовых шрифтов для OG-обложек (`src/app/api/og/brandFonts.ts`).

Зачем скрипт: satori (движок `next/og`) не умеет woff2 и variable-шрифты, а в
`public/fonts` лежат именно они. Поэтому берём полные variable-TTF из репозитория
google/fonts, инстанцируем нужный вес, вырезаем только нужные символы
(latin + cyrillic + типографика + ₽) и сохраняем в woff, заинлайненный base64:
edge-роут не имеет доступа к ФС и не должен ходить в сеть за шрифтом.

Запуск (нужен fonttools + brotli):
    python3 scripts/build-og-fonts.py
"""

import base64
import io
import urllib.parse
import urllib.request
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.subset import Subsetter, Options

ROOT = Path(__file__).resolve().parent.parent
OUT_TS = ROOT / 'src' / 'app' / 'api' / 'og' / 'brandFonts.ts'
CACHE = ROOT / 'node_modules' / '.cache' / 'og-fonts'
BASE_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl'

# Наборы символов: латиница, кириллица, типографика и знаки валют, которые
# реально встречаются в заголовках и подписях обложек.
UNICODES = [
    *range(0x0020, 0x007F),
    0x00A0, 0x00A9, 0x00AB, 0x00B7, 0x00BB, 0x00D7,
    *range(0x2010, 0x2016),
    *range(0x2018, 0x2020),
    0x2022, 0x2026, 0x2030, 0x2039, 0x203A, 0x2044,
    0x20AC, 0x20BD, 0x2116, 0x2192, 0x2713,
    0x0301, *range(0x0400, 0x0460), 0x0490, 0x0491, 0x04B0, 0x04B1,
]

# Что собираем: (константа в TS, семейство, файл в google/fonts, вес, нужны ли
# OpenType-фичи). Мелким моно-подписям лигатуры и кернинг не нужны — выкидываем
# GSUB/GPOS и экономим ~40% веса файла.
FONTS = [
    ('UNBOUNDED_600', 'Unbounded', 'unbounded/Unbounded[wght].ttf', 600, True),
    ('UNBOUNDED_700', 'Unbounded', 'unbounded/Unbounded[wght].ttf', 700, True),
    ('GOLOS_400', 'Golos Text', 'golostext/GolosText[wght].ttf', 400, True),
    ('FIRA_400', 'Fira Code', 'firacode/FiraCode[wght].ttf', 400, False),
]


def download(relative_path: str) -> Path:
    """Кладём исходники в node_modules/.cache — не мусорим в репозитории."""
    CACHE.mkdir(parents=True, exist_ok=True)
    target = CACHE / relative_path.split('/')[-1]

    if not target.exists():
        url = f'{BASE_URL}/{urllib.parse.quote(relative_path)}'
        print(f'  ↓ {url}')
        with urllib.request.urlopen(url, timeout=60) as response:
            target.write_bytes(response.read())

    return target


def build(source: Path, weight: int, with_features: bool) -> bytes:
    font = TTFont(source)
    instantiateVariableFont(font, {'wght': weight}, inplace=True, updateFontNames=False)

    options = Options()
    options.flavor = 'woff'
    options.hinting = False
    options.desubroutinize = True
    options.name_IDs = ['*']
    options.name_legacy = True
    options.notdef_outline = True

    if not with_features:
        options.layout_features = []

    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)

    buffer = io.BytesIO()
    font.flavor = 'woff'
    font.save(buffer)

    return buffer.getvalue()


def main() -> None:
    chunks = []
    total = 0

    for const, family, path, weight, with_features in FONTS:
        print(f'{family} {weight}')
        data = build(download(path), weight, with_features)
        total += len(data)
        print(f'  → {len(data) / 1024:.1f} KB woff')
        encoded = base64.b64encode(data).decode('ascii')
        # Одна длинная строка на константу: prettier не переносит строковые
        # литералы, поэтому такой вид стабилен между пересборками.
        chunks.append(
            f'/** {family} {weight} — woff, сабсет latin + cyrillic. */\n'
            f"export const {const} =\n  '{encoded}';"
        )

    header = (
        '/**\n'
        ' * Брендовые шрифты OG-обложек, заинлайненные base64 (woff, сабсет latin + cyrillic + ₽).\n'
        ' * Сгенерировано `python3 scripts/build-og-fonts.py` — руками не править.\n'
        ' */\n\n'
    )

    OUT_TS.write_text(header + '\n\n'.join(chunks) + '\n', encoding='utf-8')
    print(f'\n{OUT_TS.relative_to(ROOT)}: {total / 1024:.1f} KB woff → {OUT_TS.stat().st_size / 1024:.1f} KB ts')


if __name__ == '__main__':
    main()
