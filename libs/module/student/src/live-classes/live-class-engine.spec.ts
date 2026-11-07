import { convertToParamMap } from '@angular/router';
import { LIVE_CLASSES } from './live-classes.data';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { LEARNER_WORKSHEETS } from '../worksheets/worksheets.data';
import { LEARNER_PORTFOLIO_TASKS } from '../portfolio/portfolio.data';
import {
  classBackQuery,
  classCalendar,
  classCode,
  classDay,
  classJoinIssue,
  classNotes,
  classStatus,
  initialClassDraft,
  practiceCorrect,
  readClassDrafts,
  shiftCalendarMonth,
} from './live-class-engine';

const session = LIVE_CLASSES[0];
const before = Date.parse('2026-11-05T14:15:00+01:00');

describe('live class availability and navigation', () => {
  it('links every fixture to existing lessons, worksheets, and portfolio records', () => {
    for (const item of LIVE_CLASSES) {
      expect(
        LEARNER_LESSONS.some((lesson) => lesson.id === item.lessonId),
      ).toBe(true);
      if (item.worksheetId)
        expect(
          LEARNER_WORKSHEETS.some((sheet) => sheet.id === item.worksheetId),
        ).toBe(true);
      if (item.portfolioId)
        expect(
          LEARNER_PORTFOLIO_TASKS.some((task) => task.id === item.portfolioId),
        ).toBe(true);
    }
    expect(
      LIVE_CLASSES.find((item) => item.id === 'parts-of-speech-live')
        ?.practice[0].answer,
    ).toBe('noun');
    expect(
      LIVE_CLASSES.find((item) => item.id === 'plant-parts-live')?.slides[0]
        .title,
    ).toBe('Parts of a Plant');
  });
  it('uses start-inclusive and end-exclusive schedule boundaries', () => {
    expect(classStatus(session, before)).toBe('upcoming');
    expect(classStatus(session, Date.parse(session.startsAt))).toBe('live');
    expect(classStatus(session, Date.parse(session.endsAt))).toBe('ended');
    expect(classJoinIssue(session, before)).toBeUndefined();
    expect(classJoinIssue(session, Date.parse(session.endsAt))).toContain(
      'ended',
    );
    expect(
      classJoinIssue({ ...session, enrolled: session.capacity }, before),
    ).toContain('full');
    expect(classJoinIssue({ ...session, accessible: false }, before)).toContain(
      'enrolment',
    );
  });
  it('normalizes entered codes and preserves only list context on return', () => {
    expect(classCode(' sh-english-0511  ')).toBe(session.code);
    expect(
      classBackQuery(
        convertToParamMap({
          tab: 'past',
          subjectId: 'mathematics',
          page: '2',
          q: 'numbers',
          expanded: '1',
          panel: 'notes',
          classId: session.id,
          view: 'code',
        }),
      ),
    ).toEqual({
      tab: 'past',
      subjectId: 'mathematics',
      page: '2',
      q: 'numbers',
      expanded: '1',
    });
  });
  it('keeps Lagos calendar days and shifts across year and leap-month boundaries', () => {
    expect(classDay('2026-11-04T23:30:00Z')).toBe('2026-11-05');
    expect(shiftCalendarMonth('2026-12', 1)).toBe('2027-01');
    expect(shiftCalendarMonth('2024-03', -1)).toBe('2024-02');
  });
  it('downloads real UTC calendar events with escaped text and valid folded lines', () => {
    const calendar = classCalendar(
      [
        {
          ...session,
          title: 'English, subject; predicate',
          description: 'Line one\n' + 'é'.repeat(100),
        },
      ],
      before,
    );
    expect(calendar).toContain('DTSTART:20261105T140000Z\r\n');
    expect(calendar).toContain('DTEND:20261105T150000Z\r\n');
    expect(calendar).toContain('SUMMARY:English\\, subject\\; predicate');
    expect(calendar.replace(/\r\n /g, '')).toContain(
      'Line one\\n' + 'é'.repeat(100),
    );
    expect(
      calendar
        .split('\r\n')
        .every((line) => new TextEncoder().encode(line).length <= 75),
    ).toBe(true);
    expect(calendar).toContain(`UID:${session.id}@schoolhub.local`);
  });
});
describe('local classroom work', () => {
  it('exports the selected lesson and grades short answers without altering quiz records', () => {
    expect(classNotes(session)).toContain('SUBJECT AND PREDICATE');
    expect(classNotes(session)).toContain('VOCABULARY');
    expect(practiceCorrect('The cat', ' THE  CAT. ')).toBe(true);
    expect(practiceCorrect('3713', '3,713')).toBe(true);
    expect(practiceCorrect('3713', '3.713')).toBe(false);
    expect(practiceCorrect('0', '')).toBe(false);
    expect(practiceCorrect('0', '0')).toBe(true);
    expect(practiceCorrect('a tree', 'tree')).toBe(true);
    expect(practiceCorrect('roots', '')).toBe(false);
    expect(practiceCorrect('explains clearly', 'our teacher')).toBe(false);
  });
  it('starts with devices off, no attendance claim, and the subject/predicate board', () => {
    const draft = initialClassDraft(session);
    expect(draft).toMatchObject({
      sessionOpen: false,
      elapsedSeconds: 0,
      notes: '',
      messages: [],
      handRaised: false,
    });
    expect(session.slides[draft.slide].id).toBe('subject');
    expect(draft.answers).toEqual(['', '', '']);
  });
  it('restores bounded work while rejecting unknown, duplicated, and malformed records', () => {
    const draft = {
      ...initialClassDraft(session),
      notes: 'n'.repeat(10001),
      elapsedSeconds: -10,
      slide: 999,
      sessionOpen: true,
      joinedAt: before,
      answers: ['a'.repeat(501), 4, 'They'],
      reactions: ['sample-maryam:heart', 'sample-maryam:heart', '<invalid>'],
      messages: [
        { id: 'local-1', text: 'My question', at: before },
        { id: '<script>', text: 'bad', at: before },
        { id: 'local-2', text: '', at: before },
      ],
    };
    const restored = readClassDrafts(
      JSON.stringify({
        version: 1,
        drafts: [draft, draft, { classId: 'missing' }, null],
      }),
      LIVE_CLASSES,
    );
    expect(restored).toHaveLength(1);
    expect(restored[0].notes).toHaveLength(10000);
    expect(restored[0].answers).toEqual(['a'.repeat(500), '', 'They']);
    expect(restored[0].messages).toEqual([
      { id: 'local-1', text: 'My question', at: before },
    ]);
    expect(restored[0].reactions).toEqual(['sample-maryam:heart']);
    expect(restored[0].elapsedSeconds).toBe(0);
    expect(restored[0].slide).toBe(initialClassDraft(session).slide);
    expect(restored[0].sessionOpen).toBe(true);
  });
  it('recovers from corrupt storage and cannot restore an open session without a valid join time', () => {
    for (const raw of [null, '{', '{}', '{"version":2,"drafts":[]}'])
      expect(readClassDrafts(raw, LIVE_CLASSES)).toEqual([]);
    const restored = readClassDrafts(
      JSON.stringify({
        version: 1,
        drafts: [
          {
            ...initialClassDraft(session),
            sessionOpen: true,
            elapsedSeconds: 999999,
          },
        ],
      }),
      LIVE_CLASSES,
    );
    expect(restored[0].sessionOpen).toBe(false);
    expect(restored[0].elapsedSeconds).toBe(86400);
  });
});
