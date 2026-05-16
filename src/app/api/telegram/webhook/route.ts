import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { TELEGRAM_CACHE_TAG } from '@/entities/post/api/telegram';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get('x-telegram-bot-api-secret-token');

  if (!process.env.TELEGRAM_WEBHOOK_SECRET || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag(TELEGRAM_CACHE_TAG);

  return NextResponse.json({ ok: true });
}
