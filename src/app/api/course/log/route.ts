import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendTelegramMessage } from '@/shared/api/telegram';

/** Ограничения длины полей — отсекаем мусор и слишком большие запросы. */
const MAX_NAME = 100;
const MAX_COURSE_ID = 50;

type CourseLogEvent = 'start' | 'complete';

interface CourseLogPayload {
  event: CourseLogEvent;
  /** Имя, введённое пользователем на лендинге курса. */
  name: string;
  courseId: string;
}

const isCourseLogPayload = (value: unknown): value is CourseLogPayload => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const { event, name, courseId } = value as Record<string, unknown>;

  return (
    (event === 'start' || event === 'complete') &&
    typeof name === 'string' &&
    !!name.trim() &&
    name.length <= MAX_NAME &&
    typeof courseId === 'string' &&
    !!courseId.trim() &&
    courseId.length <= MAX_COURSE_ID
  );
};

const buildText = (payload: CourseLogPayload): string => {
  const { event, name, courseId } = payload;

  const details = ['', `<b>Имя:</b> ${escapeHtml(name)}`, `<b>Курс:</b> ${escapeHtml(courseId)}`];

  switch (event) {
    case 'start':
      return ['🎓 <b>Регистрация на курс</b>', ...details].join('\n');
    case 'complete':
      return ['🏁 <b>Курс пройден</b>', ...details].join('\n');
    default:
      throw new Error('Unknown course log event');
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!isCourseLogPayload(payload)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  // Телеметрия не должна влиять на UX — сбой доставки тоже отвечает ok.
  await sendTelegramMessage(buildText(payload));

  return NextResponse.json({ ok: true });
};
