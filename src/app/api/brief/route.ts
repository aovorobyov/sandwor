import { NextRequest, NextResponse } from 'next/server';
import { sendAmoOrderLead } from '@/shared/api/amoForm';
import { SITE_URL } from '@/shared/config/site';
import { buildBriefLead, isBriefPayload, isSpamBrief, isValidBrief } from './briefLead';
import { getClientIp, isRateLimited } from './rateLimit';

/** Фолбэк для метки происхождения в amoCRM, если браузер не прислал Referer. */
const BRIEF_PAGE_URL = `${SITE_URL}/contact`;

/** Бриф — несколько килобайт текста; всё, что больше, не от формы. */
const MAX_BODY_BYTES = 16 * 1024;

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  if (isRateLimited(getClientIp(req.headers))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let payload: unknown;

  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!isBriefPayload(payload)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (isSpamBrief(payload)) {
    // Тихий «успех» — бот не должен понять, что его отфильтровали.
    return NextResponse.json({ ok: true });
  }

  if (!isValidBrief(payload)) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
  }

  const referer = req.headers.get('referer') || BRIEF_PAGE_URL;
  const isLeadCreated = await sendAmoOrderLead({ ...buildBriefLead(payload), referer });

  // amoCRM — единственный приёмник заявок, поэтому её отказ отдаём форме как ошибку:
  // посетитель увидит подсказку и напишет напрямую, а не решит, что заявка ушла.
  if (!isLeadCreated) {
    return NextResponse.json({ error: 'Failed to deliver message' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
};
