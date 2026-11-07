import { ParamMap, Params } from '@angular/router';
import { LiveClass, LiveClassDraft, LiveClassStatus } from './live-class.model';

export function classStatus(session: LiveClass, now: number): LiveClassStatus {
  return now < Date.parse(session.startsAt)
    ? 'upcoming'
    : now < Date.parse(session.endsAt)
      ? 'live'
      : 'ended';
}
export function classJoinIssue(
  session: LiveClass,
  now: number,
): string | undefined {
  return !session.accessible
    ? 'This class is not included in your current enrolment.'
    : classStatus(session, now) === 'ended'
      ? 'This class has ended. You can review its recap and materials.'
      : session.enrolled >= session.capacity
        ? 'This class is full. Choose another available class.'
        : undefined;
}
export function classDay(value: string | number): string {
  return new Date(
    (typeof value === 'number' ? value : Date.parse(value)) + 3600000,
  )
    .toISOString()
    .slice(0, 10);
}
export function classDate(value: string): string {
  return new Date(value).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  });
}
export function classTime(session: LiveClass): string {
  const format = (value: string) =>
    new Date(value)
      .toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Africa/Lagos',
      })
      .toUpperCase();
  return `${format(session.startsAt)} – ${format(session.endsAt)} WAT`;
}
export function formatClassTimer(seconds: number): string {
  return [
    Math.floor(seconds / 3600),
    Math.floor(seconds / 60) % 60,
    Math.floor(seconds) % 60,
  ]
    .map((part) => String(Math.max(0, part)).padStart(2, '0'))
    .join(' : ');
}
export function classCode(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, '');
}
export function initialClassDraft(session: LiveClass): LiveClassDraft {
  return {
    classId: session.id,
    sessionOpen: false,
    elapsedSeconds: 0,
    notes: '',
    chatDraft: '',
    messages: [],
    reactions: [],
    answers: session.practice.map(() => ''),
    checked: false,
    slide:
      session.slides.findIndex((slide) => slide.id === 'subject') >= 0
        ? session.slides.findIndex((slide) => slide.id === 'subject')
        : 0,
    handRaised: false,
    saved: false,
  };
}
export function classBackQuery(params: ParamMap): Params {
  const query: Params = {};
  for (const key of ['tab', 'subjectId', 'q', 'page', 'expanded']) {
    const value = params.get(key);
    if (value) query[key] = value;
  }
  return query;
}
export { shiftCalendarMonth } from '@school-hub/ui-elements';
export function practiceCorrect(expected: string, answer: string): boolean {
  const numeric = /^[+-]?\d+(?:\.\d+)?$/;
  if (numeric.test(expected)) {
    const value = answer.trim().replace(/,/g, '');
    return numeric.test(value) && Number(expected) === Number(value);
  }
  const normalize = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[,.!?]/g, '')
      .replace(/^a\s+/, '')
      .replace(/\s+/g, ' ');
  return normalize(expected) === normalize(answer);
}
export function classNotes(session: LiveClass): string {
  return [
    session.title,
    session.description,
    `Tutor: ${session.tutor}`,
    `${classDate(session.startsAt)} · ${classTime(session)}`,
    '',
    'OBJECTIVES',
    ...session.objectives.map((item) => `- ${item}`),
    ...session.slides.flatMap((slide) => [
      '',
      slide.title.toUpperCase(),
      slide.definition,
      ...slide.bullets.map((item) => `- ${item}`),
      ...slide.examples.map(
        (item) => `${item.lead} ${item.rest}\n${item.note}`,
      ),
    ]),
    '',
    'VOCABULARY',
    ...session.vocabulary.map((item) => `${item.word}: ${item.meaning}`),
  ].join('\n');
}
export function classCalendar(
  sessions: readonly LiveClass[],
  now: number,
): string {
  const stamp = (value: string | number) =>
    new Date(value)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');
  const escape = (value: string) =>
    value
      .replace(/\\/g, '\\\\')
      .replace(/\r?\n/g, '\\n')
      .replace(/[,;]/g, '\\$&');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SchoolHub//Learner Classes//EN',
    'CALSCALE:GREGORIAN',
    ...sessions.flatMap((session) => [
      'BEGIN:VEVENT',
      `UID:${session.id}@schoolhub.local`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART:${stamp(session.startsAt)}`,
      `DTEND:${stamp(session.endsAt)}`,
      `SUMMARY:${escape(session.title)}`,
      `DESCRIPTION:${escape(session.description + '\nTutor: ' + session.tutor + '\nOpen Live Classes in SchoolHub to join.')}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ];
  return (
    lines
      .map((line) => {
        let result = '',
          bytes = 0;
        for (const char of line) {
          const size = new TextEncoder().encode(char).length;
          if (bytes + size > 75) {
            result += '\r\n ';
            bytes = 1;
          }
          result += char;
          bytes += size;
        }
        return result;
      })
      .join('\r\n') + '\r\n'
  );
}
export function readClassDrafts(
  raw: string | null,
  sessions: readonly LiveClass[],
): LiveClassDraft[] {
  try {
    const data = JSON.parse(raw ?? 'null');
    if (
      data?.version !== 1 ||
      !Array.isArray(data.drafts) ||
      data.drafts.length > 100
    )
      return [];
    const seen = new Set<string>();
    return data.drafts.flatMap((item: unknown): LiveClassDraft[] => {
      if (!item || typeof item !== 'object') return [];
      const value = item as Record<string, unknown>;
      const session = sessions.find(
        (session) => session.id === value['classId'],
      );
      if (!session || seen.has(session.id)) return [];
      const initial = initialClassDraft(session);
      const text = (key: string, max: number) =>
        typeof value[key] === 'string' ? value[key].slice(0, max) : '';
      const seconds = value['elapsedSeconds'];
      const slide = value['slide'];
      const joined = value['joinedAt'];
      const messages = Array.isArray(value['messages'])
        ? value['messages'].slice(-100).flatMap((message: unknown) => {
            if (!message || typeof message !== 'object') return [];
            const row = message as Record<string, unknown>;
            return typeof row['id'] === 'string' &&
              /^[\w-]{1,100}$/.test(row['id']) &&
              typeof row['text'] === 'string' &&
              row['text'].trim() &&
              row['text'].length <= 1000 &&
              typeof row['at'] === 'number' &&
              Number.isFinite(row['at'])
              ? [{ id: row['id'], text: row['text'], at: row['at'] }]
              : [];
          })
        : [];
      seen.add(session.id);
      return [
        {
          ...initial,
          notes: text('notes', 10000),
          chatDraft: text('chatDraft', 1000),
          messages,
          sessionOpen:
            value['sessionOpen'] === true &&
            typeof joined === 'number' &&
            Number.isFinite(joined),
          joinedAt:
            typeof joined === 'number' && Number.isFinite(joined)
              ? joined
              : undefined,
          elapsedSeconds:
            typeof seconds === 'number' && Number.isFinite(seconds)
              ? Math.min(86400, Math.max(0, Math.floor(seconds)))
              : 0,
          slide:
            typeof slide === 'number' &&
            Number.isInteger(slide) &&
            slide >= 0 &&
            slide < session.slides.length
              ? slide
              : initial.slide,
          answers:
            Array.isArray(value['answers']) &&
            value['answers'].length === session.practice.length
              ? value['answers'].map((answer) =>
                  typeof answer === 'string' ? answer.slice(0, 500) : '',
                )
              : initial.answers,
          reactions: Array.isArray(value['reactions'])
            ? [
                ...new Set(
                  value['reactions'].filter(
                    (reaction): reaction is string =>
                      typeof reaction === 'string' &&
                      /^[\w-]{1,150}:[\w-]{1,20}$/.test(reaction),
                  ),
                ),
              ].slice(0, 500)
            : [],
          checked: value['checked'] === true,
          saved: value['saved'] === true,
          handRaised: value['handRaised'] === true,
        },
      ];
    });
  } catch {
    return [];
  }
}
