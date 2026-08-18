import { ImageResponse } from 'next/og';
import { SITE_HOST } from '@/shared/config/site';
import { FIRA_400, GOLOS_400, UNBOUNDED_600, UNBOUNDED_700 } from './brandFonts';
import { OFFER_COPY } from './offerCopy';
import type { CardFact, CardParams, OgVariant } from './route.types';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 72;

/** Лимиты входных строк: обложка — не место для полотна, а параметры приходят извне. */
const TITLE_MAX = 120;
const LEAD_MAX = 150;
const TAG_MAX = 32;
const META_MAX = 80;

/** Палитра — те же токены, что в `globals.css` (единственная тёмная тема). */
const BG = '#0e0c0b';
const TEXT = '#f4efe8';
const MUTED = '#9a9086';
const DIM = '#6b635b';
const AC = '#ff7a2b';
const LINE = 'rgba(244, 239, 232, 0.13)';
const LINE_SOFT = 'rgba(244, 239, 232, 0.07)';
const GLOW = 'radial-gradient(circle at 84% 6%, rgba(255, 122, 43, 0.22), rgba(14, 12, 11, 0) 62%)';

/** Семейства шрифтов сайта: дисплейный, текстовый, моно. */
const DISP = 'Unbounded';
const UI = 'Golos Text';
const MONO = 'Fira Code';

/** base64 → ArrayBuffer: декодируем заинлайненный шрифт без сети и обращения к ФС. */
const decodeFont = (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
};

/** Шрифты обложки: Unbounded 600/700 для заголовков, Golos Text для текста, Fira Code для подписей. */
const buildFonts = () => {
  return [
    { name: DISP, data: decodeFont(UNBOUNDED_600), weight: 600 as const, style: 'normal' as const },
    { name: DISP, data: decodeFont(UNBOUNDED_700), weight: 700 as const, style: 'normal' as const },
    { name: UI, data: decodeFont(GOLOS_400), weight: 400 as const, style: 'normal' as const },
    { name: MONO, data: decodeFont(FIRA_400), weight: 400 as const, style: 'normal' as const },
  ];
};

let cachedFonts: ReturnType<typeof buildFonts> | null = null;

const getFonts = () => {
  if (!cachedFonts) {
    cachedFonts = buildFonts();
  }

  return cachedFonts;
};

/**
 * Кегль заголовка по длине строки: чем длиннее, тем мельче — иначе длинные
 * заголовки статей выпадают за пределы карточки.
 */
const getTitleSize = (title: string) => {
  switch (true) {
    case title.length <= 16:
      return 82;
    case title.length <= 30:
      return 68;
    case title.length <= 52:
      return 58;
    case title.length <= 78:
      return 48;
    default:
      return 40;
  }
};

/** Моно-подпись: капс с разрядкой — как `Eyebrow`/`Mono` в UI-кит. */
const monoStyle = (color: string, size = 13) => {
  return {
    fontFamily: MONO,
    fontSize: size,
    letterSpacing: size * 0.18,
    textTransform: 'uppercase' as const,
    color,
  };
};

/** Логотип: «sandwor» дисплейным шрифтом + акцентная точка. */
const renderLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <div
        style={{
          fontFamily: DISP,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -0.9,
          color: TEXT,
        }}
      >
        sandwor
      </div>

      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: 4,
          background: AC,
          marginLeft: 6,
          marginBottom: 6,
        }}
      />
    </div>
  );
};

/** Полоска фактов внизу карточки — те же цифры, что в герое главной. */
const renderFacts = (facts: CardFact[]) => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {facts.map((fact, index) => {
        return (
          <div
            key={fact.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              paddingLeft: index === 0 ? 0 : 32,
              borderLeft: index === 0 ? 'none' : `1px solid ${LINE}`,
            }}
          >
            <div
              style={{
                fontFamily: DISP,
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: -0.9,
                color: TEXT,
              }}
            >
              {fact.value}
            </div>

            <div style={{ ...monoStyle(DIM, 12), marginTop: 10 }}>{fact.label}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Подвал контентных карточек: акцентная черта и мета (или строка позиционирования). */
const renderFooterLine = (text: string) => {
  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
      <div style={{ width: 56, height: 6, background: AC, marginRight: 20 }} />

      <div style={monoStyle(MUTED)}>{text}</div>
    </div>
  );
};

/**
 * Единая карточка: шапка с логотипом, надзаголовок, заголовок, подводка и подвал —
 * фактами (продающая) или строкой с доменом (контентная).
 */
const renderCard = (params: CardParams) => {
  const { eyebrow, title, lead, meta, facts, tagline } = params;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        background: BG,
        fontFamily: UI,
      }}
    >
      {/* Тёплое свечение из героя главной. Размеры заданы явно: satori не понимает `inset`. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WIDTH,
          height: HEIGHT,
          backgroundImage: GLOW,
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: PAD,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 26,
            borderBottom: `1px solid ${LINE_SOFT}`,
          }}
        >
          {renderLogo()}

          <div style={monoStyle(DIM)}>{SITE_HOST}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 26 }}>
              <div
                style={{ width: 7, height: 7, borderRadius: 4, background: AC, marginRight: 12 }}
              />

              <div style={monoStyle(AC)}>{eyebrow}</div>
            </div>
          ) : null}

          <div
            style={{
              display: 'flex',
              maxWidth: 960,
              fontFamily: DISP,
              fontSize: getTitleSize(title),
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: getTitleSize(title) * -0.035,
              color: TEXT,
            }}
          >
            {title}
          </div>

          {lead ? (
            <div
              style={{
                display: 'flex',
                maxWidth: 820,
                fontSize: 25,
                lineHeight: 1.45,
                color: MUTED,
                marginTop: 24,
              }}
            >
              {lead}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', paddingTop: 30, borderTop: `1px solid ${LINE_SOFT}` }}>
          {facts.length > 0 ? renderFacts(facts) : renderFooterLine(meta || tagline)}
        </div>
      </div>
    </div>
  );
};

/** Разбор query-параметров в набор полей карточки — по варианту обложки. */
const buildParams = (variant: OgVariant, searchParams: URLSearchParams): CardParams => {
  const locale = searchParams.get('locale') === 'en' ? 'en' : 'ru';
  const copy = OFFER_COPY[locale];
  const title = (searchParams.get('title') || '').slice(0, TITLE_MAX);
  const tag = (searchParams.get('tag') || '').slice(0, TAG_MAX);
  const lead = (searchParams.get('lead') || '').slice(0, LEAD_MAX);
  const meta = (searchParams.get('meta') || '').slice(0, META_MAX);

  switch (variant) {
    case 'content':
      return {
        eyebrow: tag,
        title: title || copy.title,
        lead: '',
        meta,
        facts: [],
        tagline: copy.tagline,
      };
    case 'page':
      return {
        eyebrow: tag,
        title: title || copy.title,
        lead,
        meta: '',
        facts: [],
        tagline: copy.tagline,
      };
    default:
      return {
        eyebrow: copy.eyebrow,
        title: copy.title,
        lead: copy.lead,
        meta: '',
        facts: copy.facts,
        tagline: copy.tagline,
      };
  }
};

/**
 * Определяем вариант обложки. Явный `variant` в приоритете; без него — обратная
 * совместимость со ссылками, уже закешированными соцсетями: `?title=` без варианта
 * приходил только от статей блога.
 */
const getVariant = (searchParams: URLSearchParams): OgVariant => {
  const variant = searchParams.get('variant') || '';

  switch (variant) {
    case 'content':
    case 'page':
    case 'offer':
      return variant;
    default:
      return searchParams.get('title') ? 'content' : 'offer';
  }
};

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const variant = getVariant(searchParams);

  return new ImageResponse(renderCard(buildParams(variant, searchParams)), {
    width: WIDTH,
    height: HEIGHT,
    fonts: getFonts(),
    headers: {
      // Параметры полностью определяют картинку — можно кешировать надолго.
      'cache-control': 'public, max-age=31536000, immutable, no-transform',
    },
  });
};
