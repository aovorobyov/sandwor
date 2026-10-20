import { NextRequest, NextResponse } from 'next/server';
import { getMaterialFile } from '@/entities/material';
import { sendAmoContactLead } from '@/shared/api/amoForm';
import { SITE_URL } from '@/shared/config/site';
import { getClientIp, isRateLimited } from '../brief/rateLimit';
import { buildMaterialNote, isSpamMaterialRequest, parseMaterialRequest } from './materialRequest';

const MAX_BODY_BYTES = 8 * 1024;
const REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{8,40}$/;

/**
 * Выдача материала в обмен на контакт: контакт уходит в amoCRM, в ответ — ссылка на PDF.
 * Если amoCRM недоступна, материал всё равно отдаём: человек выполнил свою часть.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  if (isRateLimited(`material:${getClientIp(req.headers)}`)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const request = parseMaterialRequest(body);
  if (!request) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
  }

  const locale = (body as { locale?: unknown }).locale === 'en' ? 'en' : 'ru';
  const url = getMaterialFile(request.materialId, locale);

  if (isSpamMaterialRequest(request)) {
    return NextResponse.json({ ok: true, url });
  }

  const requestId =
    typeof request.requestId === 'string' && REQUEST_ID_PATTERN.test(request.requestId)
      ? request.requestId
      : undefined;

  const delivered = await sendAmoContactLead({
    name: request.name,
    email: request.email,
    message: buildMaterialNote(request),
    referer: req.headers.get('referer') || `${SITE_URL}/blog`,
    requestId,
  });

  if (!delivered) {
    console.error('materials: amoCRM did not accept the lead', request.materialId);
  }

  return NextResponse.json({ ok: true, url });
};
