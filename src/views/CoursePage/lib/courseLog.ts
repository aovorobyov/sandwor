/** Событие курса для статистики. */
export type CourseLogEvent = 'start' | 'complete';

/**
 * Фоновая телеметрия курса: регистрация и завершение уходят в Telegram-бота
 * через /api/course/log. Ошибки глотаем — статистика не должна влиять на UX.
 */
export const logCourseEvent = (event: CourseLogEvent, name: string, courseId: string): void => {
  const body = JSON.stringify({ event, name, courseId });

  // sendBeacon переживает уход со страницы; fallback — fetch с keepalive
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/course/log', new Blob([body], { type: 'application/json' }));

    return;
  }

  fetch('/api/course/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // намеренно молча: телеметрия best-effort
  });
};
