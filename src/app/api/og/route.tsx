import { ImageResponse } from 'next/og';
import { SITE_HOST } from '@/shared/config/site';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;
const TITLE_MAX = 140;
const TAG_MAX = 40;
const DEFAULT_TITLE = 'sandwor';

const BG = '#ffffff';
const TEXT = '#1c1b1b';
const ACCENT = '#fe752b';
const MUTED = '#737373';

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') || DEFAULT_TITLE).slice(0, TITLE_MAX);
  const tag = (searchParams.get('tag') || '').slice(0, TAG_MAX);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
              #{tag}
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
    ),
    { width: WIDTH, height: HEIGHT },
  );
};
