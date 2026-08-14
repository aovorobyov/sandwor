import { ImageResponse } from 'next/og';
import { SITE_HOST } from '@/shared/config/site';
import { INTER_400, INTER_600 } from './interFonts';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;
const TITLE_MAX = 140;
const TAG_MAX = 40;
const DEFAULT_TITLE = 'sandwor';
const FONT_FAMILY = 'Inter';

/** base64 → ArrayBuffer: декодируем заинлайненный шрифт без сети и обращения к ФС. */
const decodeFont = (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
};

/**
 * Фирменный Inter для обложек: единый шрифт на вес с полным покрытием (кириллица, ₽) — веса 400 и 600.
 * Декодируем один раз на инстанс — результат кешируется на уровне модуля.
 */
const buildFonts = () => {
  return [
    {
      name: FONT_FAMILY,
      data: decodeFont(INTER_400),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: FONT_FAMILY,
      data: decodeFont(INTER_600),
      weight: 600 as const,
      style: 'normal' as const,
    },
  ];
};

let cachedFonts: ReturnType<typeof buildFonts> | null = null;

const getFonts = () => {
  if (!cachedFonts) {
    cachedFonts = buildFonts();
  }

  return cachedFonts;
};

/** Светлая тема — обложка статьи блога. */
const BG = '#ffffff';
const TEXT = '#1c1b1b';
const ACCENT = '#fe752b';
const MUTED = '#737373';

/** Тёмная тема — продающая карточка (главная и /websites). */
const OFFER_BG = '#171717';
const OFFER_TEXT = '#fafafa';
const OFFER_ACCENT = '#fb923c';
const OFFER_MUTED = '#a1a1aa';
const OFFER_ACCENT_BG = 'rgba(251, 146, 60, 0.16)';

/**
 * Маркетинговый текст обложки — отдельный от контента страниц.
 * Держим короткие продающие формулировки прямо здесь: edge-роут не тянет весь бандл переводов.
 */
const OFFER_COPY = {
  ru: {
    title: 'Сайты для бизнеса под ключ',
    subtitle: 'Лендинги, магазины на Tilda и кастом. Инструмент — под задачу и бюджет.',
    price: 'от 50 000 ₽',
    benefits: 'запуск под ключ · поддержка после старта',
  },
  en: {
    title: 'Websites for business, end to end',
    subtitle:
      'Landing pages, Tilda stores and custom builds. The right tool for your goal and budget.',
    price: 'from RUB 50,000',
    benefits: 'launched end to end · post-launch support',
  },
};

/** Обложка статьи блога — заголовок + необязательный тег. */
const renderArticleCard = (title: string, tag: string) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        padding: 80,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 600, color: TEXT, letterSpacing: -0.5 }}>
          sandwor
        </div>
        {tag ? (
          <div
            style={{
              fontSize: 22,
              color: ACCENT,
              border: `2px solid ${ACCENT}`,
              padding: '6px 18px',
              borderRadius: 4,
            }}
          >
            {`#${tag}`}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 600,
          lineHeight: 1.15,
          color: TEXT,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ height: 6, width: 64, background: ACCENT, marginRight: 16 }} />
        <div style={{ fontSize: 22, color: MUTED }}>{SITE_HOST}</div>
      </div>
    </div>
  );
};

/** Продающая карточка — оффер, ценовой якорь и выгоды. */
const renderOfferCard = (locale: string) => {
  const { title, subtitle, price, benefits } =
    OFFER_COPY[locale as keyof typeof OFFER_COPY] || OFFER_COPY.ru;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: OFFER_BG,
        padding: 80,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            height: 20,
            width: 20,
            background: OFFER_ACCENT,
            borderRadius: 5,
            marginRight: 16,
          }}
        />
        <div style={{ fontSize: 32, fontWeight: 600, color: OFFER_TEXT, letterSpacing: -0.5 }}>
          sandwor
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            maxWidth: 980,
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.05,
            color: OFFER_TEXT,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            maxWidth: 900,
            fontSize: 30,
            lineHeight: 1.3,
            color: OFFER_MUTED,
            marginTop: 28,
          }}
        >
          {subtitle}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 600,
              color: OFFER_ACCENT,
              background: OFFER_ACCENT_BG,
              padding: '10px 22px',
              borderRadius: 8,
            }}
          >
            {price}
          </div>
          <div style={{ fontSize: 26, color: OFFER_MUTED, marginLeft: 24 }}>{benefits}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ height: 6, width: 64, background: OFFER_ACCENT, marginRight: 16 }} />
        <div style={{ fontSize: 22, color: OFFER_MUTED }}>{SITE_HOST}</div>
      </div>
    </div>
  );
};

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get('variant') || '';
  const fonts = getFonts();

  if (variant === 'offer') {
    const locale = searchParams.get('locale') || 'ru';

    return new ImageResponse(renderOfferCard(locale), { width: WIDTH, height: HEIGHT, fonts });
  }

  const title = (searchParams.get('title') || DEFAULT_TITLE).slice(0, TITLE_MAX);
  const tag = (searchParams.get('tag') || '').slice(0, TAG_MAX);

  return new ImageResponse(renderArticleCard(title, tag), { width: WIDTH, height: HEIGHT, fonts });
};
