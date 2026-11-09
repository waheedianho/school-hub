import { convertToParamMap } from '@angular/router';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { LEARNER_ASSESSMENTS } from '../assessments/assessments.data';
import { LEARNER_WORKSHEETS } from '../worksheets/worksheets.data';
import { LEARNER_PORTFOLIO_TASKS } from '../portfolio/portfolio.data';
import { ProgressScope } from '../progress/progress.model';
import {
  contextFromQuery,
  contextRef,
  resolveTutorContext,
  tutorDraftKey,
} from './tutor-context';
import { SUBJECT_TUTORS, TUTOR_SAMPLES } from './tutor.data';
import {
  initialTutorState,
  readTutorState,
  tutorBytes,
  tutorDate,
  tutorUploadError,
  validTutorFile,
  TUTOR_MAX_FILE,
  TUTOR_MAX_STORAGE,
} from './tutor-engine';
import { TutorFile } from './tutor.model';
const source: ProgressScope = {
  lessons: LEARNER_LESSONS,
  assessments: LEARNER_ASSESSMENTS,
  results: [],
  feedback: [],
  worksheets: LEARNER_WORKSHEETS.map((item) => ({
    ...item,
    answers: item.initialAnswers,
    marked: [],
    currentIndex: 0,
    elapsedSeconds: item.initialSeconds,
    scratch: '',
    answered: 0,
    progress: 0,
  })),
  portfolios: LEARNER_PORTFOLIO_TASKS.map((item) => ({
    ...item,
    ...item.initialWork,
    files: [],
    note: '',
    progress: 0,
  })),
};
const at = Date.parse('2026-11-05T12:00:00+01:00');
function localQuestion(index = 1) {
  return {
    id: 'local-' + index,
    subjectId: 'mathematics',
    title: 'Please explain place value.',
    createdAt: at,
    messages: [{ id: 'message-' + index, text: 'I need help.', at, files: [] }],
  };
}
function attachment(): TutorFile {
  const blob = new Blob(['My working'], { type: 'text/plain' });
  return {
    id: 'file-1',
    name: 'work.txt',
    type: 'text/plain',
    size: blob.size,
    blob,
  };
}

describe('tutor learning context', () => {
  it('resolves real subject, lesson, assessment, and portfolio links with authoritative subjects', () => {
    for (const ref of [
      { type: 'subject', id: 'english-language' },
      { type: 'lesson', id: 'nouns' },
      { type: 'assessment', id: LEARNER_ASSESSMENTS[0].id },
      { type: 'portfolio', id: 'market-price-comparison' },
    ]) {
      const context = resolveTutorContext(ref, 'mathematics', source);
      expect(context?.title).toBeTruthy();
      expect(context?.route).toMatch(/^\/student\//);
      expect(contextRef(context)).toEqual(ref);
    }
    expect(
      resolveTutorContext(
        { type: 'lesson', id: 'nouns' },
        'mathematics',
        source,
      )?.subjectId,
    ).toBe('english-language');
  });
  it('attaches the selected worksheet prompt without exposing its answer and rejects invalid question IDs', () => {
    const worksheet = source.worksheets.find(
      (item) => item.available && item.questions.length,
    );
    if (!worksheet) throw new Error('Missing worksheet fixture');
    const question = worksheet.questions[0],
      ref = { type: 'worksheet', id: worksheet.id, questionId: question.id };
    expect(resolveTutorContext(ref, 'english-language', source)).toMatchObject({
      description: question.prompt,
      questionId: question.id,
      route: '/student/worksheets/' + worksheet.id,
    });
    expect(
      resolveTutorContext(
        { ...ref, questionId: 'missing' },
        'mathematics',
        source,
      )?.questionId,
    ).toBeUndefined();
    const locked = {
      ...source,
      worksheets: [{ ...worksheet, available: false }],
    };
    expect(resolveTutorContext(ref, 'mathematics', locked)).toMatchObject({
      description: undefined,
      route: '/student/worksheets',
      query: { worksheetId: worksheet.id },
    });
  });
  it('validates feedback IDs instead of trusting supplied activity routes or subjects', () => {
    expect(
      resolveTutorContext(
        { type: 'feedback', id: 'missing' },
        'mathematics',
        source,
      ),
    ).toBeUndefined();
    expect(
      resolveTutorContext(
        { type: 'lesson', id: 'missing' },
        'mathematics',
        source,
      ),
    ).toBeUndefined();
    expect(
      resolveTutorContext(
        { type: 'unknown', id: 'nouns' },
        'mathematics',
        source,
      ),
    ).toBeUndefined();
    expect(
      resolveTutorContext({ type: 'resource-request' }, 'mathematics', source),
    ).toMatchObject({ title: 'Resource request', route: '/student/resources' });
    expect(
      resolveTutorContext({ type: 'live-class-support' }, 'mathematics', source)
        ?.route,
    ).toBe('/student/live-classes');
    expect(
      resolveTutorContext({ type: 'portfolio' }, 'mathematics', source),
    ).toMatchObject({
      title: 'Portfolio tasks',
      route: '/student/portfolio-tasks',
      query: { subjectId: 'mathematics' },
    });
    expect(
      resolveTutorContext(
        { type: 'portfolio', id: 'missing' },
        'mathematics',
        source,
      ),
    ).toBeUndefined();
  });
  it('keeps independent drafts for subjects, activity questions, and existing conversations', () => {
    const ref = contextFromQuery(
      convertToParamMap({
        contextType: 'worksheet',
        contextId: 'whole-numbers-worksheet',
        questionId: 'a-1',
        subjectId: 'english-language',
        message: 'help',
      }),
    );
    expect(ref).toEqual({
      type: 'worksheet',
      id: 'whole-numbers-worksheet',
      questionId: 'a-1',
    });
    expect(
      new Set([
        tutorDraftKey('mathematics', undefined),
        tutorDraftKey('english-language', undefined),
        tutorDraftKey('mathematics', undefined, ref),
        tutorDraftKey('mathematics', 'local-1'),
      ]).size,
    ).toBe(4);
  });
  it('keeps sample replies and tutor assignments linked to existing enrolled lessons', () => {
    for (const sample of TUTOR_SAMPLES) {
      expect(
        SUBJECT_TUTORS.some((tutor) => tutor.id === sample.subjectId),
      ).toBe(true);
      expect(
        resolveTutorContext(sample.context, sample.subjectId, source)
          ?.subjectId,
      ).toBe(sample.subjectId);
      expect(
        sample.messages.filter((message) => message.role === 'tutor'),
      ).toHaveLength(1);
    }
  });
});
describe('local tutor attachments and recovery', () => {
  it('accepts supported real file types and rejects empty, mismatched, executable, or oversized files', () => {
    expect(
      validTutorFile(new File(['work'], 'work.txt', { type: 'text/plain' })),
    ).toBe(true);
    for (const file of [
      new File([], 'empty.txt', { type: 'text/plain' }),
      new File(['html'], 'page.html', { type: 'text/html' }),
      new File(['svg'], 'image.svg', { type: 'image/svg+xml' }),
      new File(['html'], 'image.png', { type: 'text/html' }),
      new File([new Uint8Array(TUTOR_MAX_FILE + 1)], 'large.txt', {
        type: 'text/plain',
      }),
    ])
      expect(validTutorFile(file)).toBe(false);
  });
  it('enforces per-message count, duplicate, and combined attachment storage limits', () => {
    const file = attachment(),
      incoming = new File(['My working'], 'work.txt', { type: 'text/plain' });
    expect(tutorUploadError([file], incoming, file.size)).toContain(
      'already attached',
    );
    expect(tutorUploadError([file, file, file], incoming, 0)).toContain(
      'three files',
    );
    expect(tutorUploadError([], incoming, TUTOR_MAX_STORAGE)).toContain(
      '20 MB',
    );
  });
  it('recovers invalid or unsupported data without creating tutor replies', () => {
    for (const raw of [null, 'bad', {}, { version: 2 }])
      expect(readTutorState(raw)).toEqual(initialTutorState());
    const local = localQuestion();
    const restored = readTutorState({
      version: 1,
      questions: [
        {
          ...local,
          sampleId: 'fake-tutor-answer',
          messages: [{ ...local.messages[0], role: 'tutor' }],
        },
        local,
      ],
      ratings: { 'nouns-help': 'helpful', missing: 'helpful' },
    });
    expect(restored.questions).toHaveLength(1);
    expect(restored.questions[0].sampleId).toBeUndefined();
    expect(restored.questions[0].messages[0]).not.toHaveProperty('role');
    expect(restored.ratings).toEqual({ 'nouns-help': 'helpful' });
  });
  it('restores attachment blobs only when metadata and byte counts match', () => {
    const file = attachment(),
      local = localQuestion();
    const restored = readTutorState({
      version: 1,
      questions: [
        {
          ...local,
          messages: [
            {
              ...local.messages[0],
              files: [
                file,
                { ...file, id: 'file-2', size: 100 },
                { ...file, id: 'file-3', type: 'image/png' },
              ],
            },
          ],
        },
      ],
    });
    expect(restored.questions[0].messages[0].files).toHaveLength(1);
    expect(tutorBytes(restored)).toBe(file.size);
  });
  it('bounds histories and draft lengths and preserves recognized sample follow-ups', () => {
    const first = localQuestion();
    const restored = readTutorState({
      version: 1,
      questions: Array.from({ length: 25 }, (_, index) => ({
        ...localQuestion(index),
        messages: Array.from({ length: 45 }, (_, message) => ({
          ...first.messages[0],
          id: 'message-' + message,
        })),
      })),
      drafts: Array.from({ length: 55 }, (_, index) => ({
        key: 'new:mathematics:' + index,
        text: 'x'.repeat(2200),
        files: [],
      })),
    });
    expect(restored.questions).toHaveLength(20);
    expect(restored.questions[0].messages).toHaveLength(40);
    expect(restored.drafts).toHaveLength(50);
    expect(restored.drafts[0].text).toHaveLength(2000);
    const spacedKey = tutorDraftKey('mathematics', undefined, {
      type: 'worksheet',
      id: 'reading-whole-numbers-worksheet',
      questionId: 'digit values-1',
    });
    expect(
      readTutorState({
        version: 1,
        drafts: [{ key: spacedKey, text: 'Help with this digit.', files: [] }],
      }).drafts[0].key,
    ).toBe(spacedKey);
    const followup = readTutorState({
      version: 1,
      questions: [
        { ...first, subjectId: 'english-language', sampleId: 'nouns-help' },
      ],
    });
    expect(followup.questions[0].sampleId).toBe('nouns-help');
  });
  it('formats dated messages in Lagos time across UTC midnight', () => {
    const timestamp = Date.parse('2026-11-04T23:30:00Z');
    expect(tutorDate(timestamp)).toBe('5 Nov 2026');
    expect(tutorDate(timestamp, true)).toBe('00:30');
  });
});
