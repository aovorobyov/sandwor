import { NextRequest, NextResponse } from 'next/server';
import { sendAmoOrderLead } from '@/shared/api/amoForm';
import { SITE_URL } from '@/shared/config/site';
import { buildBriefLead, isBriefPayload, isSpamBrief, isValidBrief } from './briefLead';

/** Фолбэк для метки происхождения в amoCRM, если браузер не прислал Referer. */
const BRIEF_PAGE_URL = `${SITE_URL}/contact`;

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  let payload: unknown;

  try {
    payload = await req.json();
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
