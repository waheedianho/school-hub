import {
  gradeWorksheet,
  isWrittenAnswerCorrect,
  readWorksheetDrafts,
  worksheetSections,
} from './worksheet-engine';
import { LEARNER_WORKSHEETS } from './worksheets.data';
import { WorksheetDraft } from './worksheet.model';

const worksheet = LEARNER_WORKSHEETS.find(
  (item) => item.id === 'whole-numbers-worksheet',
);
if (!worksheet) throw new Error('Missing worksheet fixture');
const draft: WorksheetDraft = {
  worksheetId: worksheet.id,
  answers: worksheet.questions.map(() => ''),
  marked: [0],
  currentIndex: 4,
  elapsedSeconds: 200,
  scratch: 'My working',
};

describe('written worksheet grading', () => {
  it('accepts equivalent numeric answers with commas and surrounding whitespace', () => {
    expect(isWrittenAnswerCorrect(worksheet.questions[1], ' 9,134 ')).toBe(
      true,
    );
    expect(isWrittenAnswerCorrect(worksheet.questions[1], '9134.0')).toBe(true);
  });
  it('does not accept blanks, partial numbers, expressions, or executable text', () => {
    for (const value of [
      '',
      ' ',
      '9134 books',
      '9000+134',
      'Infinity',
      'alert(9134)',
    ])
      expect(isWrittenAnswerCorrect(worksheet.questions[1], value)).toBe(false);
  });
  it('normalises short text answers without accepting unrelated answers', () => {
    const question = {
      ...worksheet.questions[0],
      kind: 'text' as const,
      answer: 'A living thing',
      alternatives: ['Living organism'],
    };
    expect(isWrittenAnswerCorrect(question, '  A   LIVING thing. ')).toBe(true);
    expect(isWrittenAnswerCorrect(question, 'living organism')).toBe(true);
    expect(isWrittenAnswerCorrect(question, 'thing')).toBe(false);
  });
  it('grades actual answers and gives unanswered questions zero marks', () => {
    expect(
      gradeWorksheet(
        worksheet,
        worksheet.questions.map((question) => question.answer),
      ),
    ).toEqual({ answered: 20, correct: 20, percentage: 100, marks: 20 });
    expect(gradeWorksheet(worksheet, ['623', 'wrong', ''])).toEqual({
      answered: 2,
      correct: 1,
      percentage: 5,
      marks: 1,
    });
    expect(gradeWorksheet({ ...worksheet, questions: [] }, [])).toEqual({
      answered: 0,
      correct: 0,
      percentage: 0,
      marks: 0,
    });
  });
  it('builds section progress from answers', () => {
    const answers = worksheet.questions.map((question, index) =>
      index < 12 ? question.answer : '',
    );
    const sections = worksheetSections({
      ...worksheet,
      answers,
      marked: [],
      currentIndex: 12,
      elapsedSeconds: 0,
      scratch: '',
      answered: 12,
      progress: 60,
    });
    expect(sections.map((section) => section.answered)).toEqual([5, 5, 2, 0]);
  });
});

describe('worksheet draft restoration', () => {
  it('restores valid answers, review marks, scratch notes, and elapsed time', () => {
    expect(
      readWorksheetDrafts(
        JSON.stringify({ version: 1, drafts: [draft] }),
        LEARNER_WORKSHEETS,
      ),
    ).toEqual([{ ...draft, submittedAt: undefined }]);
  });
  it('rejects corrupt storage and unknown or locked worksheets', () => {
    expect(readWorksheetDrafts('{invalid', LEARNER_WORKSHEETS)).toEqual([]);
    for (const worksheetId of [
      'missing',
      'lcm-worksheet',
      'parts-of-speech-worksheet',
    ])
      expect(
        readWorksheetDrafts(
          JSON.stringify({ version: 1, drafts: [{ ...draft, worksheetId }] }),
          LEARNER_WORKSHEETS,
        ),
      ).toEqual([]);
  });
  it('rejects malformed answers, timestamps, review marks, and elapsed time', () => {
    for (const change of [
      { answers: [42] },
      { currentIndex: 20 },
      { marked: [-1] },
      { scratch: 'x'.repeat(10001) },
      { elapsedSeconds: -1 },
      { submittedAt: 'not a date' },
    ])
      expect(
        readWorksheetDrafts(
          JSON.stringify({ version: 1, drafts: [{ ...draft, ...change }] }),
          LEARNER_WORKSHEETS,
        ),
      ).toEqual([]);
  });
  it('restores completed practice drafts while dropping duplicate records', () => {
    const completed = { ...draft, submittedAt: '2026-11-04T12:00:00Z' };
    expect(
      readWorksheetDrafts(
        JSON.stringify({ version: 1, drafts: [completed, completed] }),
        LEARNER_WORKSHEETS,
      ),
    ).toEqual([completed]);
  });
});
