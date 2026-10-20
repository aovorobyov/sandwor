"""
Урезает шрифты ДС для сайта: латиница + кириллица + типографские знаки и только те
начертания, что есть в CSS (Unbounded 600–700, Golos 400–700, Fira Code 400–600).
Минус ~20% веса шрифтов на первой загрузке. Запускать на исходных файлах из архива ДС:

  pip install fonttools brotli
  python3 scripts/fonts/subset.py <папка с исходными woff2> src/shared/sandwor/fonts

После — сверить диапазоны font-weight в tokens.css и scripts/*/*.html.
"""
import sys, os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset
src, out = sys.argv[1], sys.argv[2]
ranges = {'Unbounded': (600, 700), 'GolosText': (400, 700), 'FiraCode': (400, 600)}
UNI = ('U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0400-045F,U+0490-0491,'
       'U+04B0-04B1,U+2000-206F,U+20AC,U+20BD,U+2116,U+2122,U+2190-2199,U+2212,U+2215,U+2248,U+2260,U+2264-2265,U+2713,U+2715,U+FEFF,U+FFFD')
for name, (lo, hi) in ranges.items():
    f = TTFont(os.path.join(src, f'{name}-Variable.woff2'))
    before = os.path.getsize(os.path.join(src, f'{name}-Variable.woff2'))
    opts = subset.Options(); opts.layout_features = ['*']; opts.flavor = 'woff2'; opts.name_IDs = ['*']; opts.notdef_outline = True
    s = subset.Subsetter(opts); s.populate(unicodes=subset.parse_unicodes(UNI)); s.subset(f)
    f = instancer.instantiateVariableFont(f, {'wght': (lo, hi)})
    p = os.path.join(out, f'{name}-Variable.woff2'); subset.save_font(f, p, opts)
    print(name, before, '->', os.path.getsize(p))
