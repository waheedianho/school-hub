import { calculateExpression } from '@school-hub/ui-elements';
import {
  gradeAssessment,
  readSavedAttempts,
  remainingAttemptSeconds,
} from './assessment-engine';
import { LEARNER_ASSESSMENTS } from './assessments.data';
import { PracticeAttempt } from './assessment.model';

const assessment = LEARNER_ASSESSMENTS[0];
const correct = assessment.questions.map((question) => question.correctIndex);
const draft: PracticeAttempt = {
  id: 'practice-test',
  assessmentId: assessment.id,
  status: 'active',
  answers: Array.from({ length: 10 }, () => null),
  marked: [0],
  currentIndex: 0,
  remainingSeconds: 1200,
  deadline: 1201000,
  startedAt: 1000,
};

describe('assessment grading', () => {
  it('awards full marks only when every question is correct', () => {
    expect(gradeAssessment(assessment, correct)).toEqual({
      marks: 20,
      percentage: 100,
      correct: 10,
      answered: 10,
    });
  });
  it('scores wrong, unanswered, and invalid answers as zero', () => {
    expect(gradeAssessment(assessment, [correct[0], null, -1, 99])).toEqual({
      marks: 2,
      percentage: 10,
      correct: 1,
      answered: 1,
    });
  });
  it('does not turn an empty question bank into a passing result', () => {
    expect(gradeAssessment({ ...assessment, questions: [] }, [])).toEqual({
      marks: 0,
      percentage: 0,
      correct: 0,
      answered: 0,
    });
  });
});

describe('attempt timing and persistence', () => {
  it('uses the deadline so elapsed time survives refresh and delayed ticks', () => {
    expect(remainingAttemptSeconds(draft, 601000)).toBe(600);
    expect(remainingAttemptSeconds(draft, 1201001)).toBe(0);
  });
  it('does not consume paused time', () => {
    expect(
      remainingAttemptSeconds(
        { ...draft, status: 'paused', deadline: null, remainingSeconds: 413 },
        99999999,
      ),
    ).toBe(413);
  });
  it('round-trips valid answers, question position, and review marks', () => {
    const saved = {
      ...draft,
      answers: [...correct],
      currentIndex: 4,
      marked: [0, 4],
    };
    expect(
      readSavedAttempts(
        JSON.stringify({ version: 1, attempts: [saved] }),
        LEARNER_ASSESSMENTS,
      ),
    ).toEqual([{ ...saved, submittedAt: undefined, expired: false }]);
  });
  it('rejects corrupt storage, unknown assessments, and out-of-range answers', () => {
    expect(readSavedAttempts('{bad json', LEARNER_ASSESSMENTS)).toEqual([]);
    expect(
      readSavedAttempts(
        JSON.stringify({
          version: 1,
          attempts: [{ ...draft, assessmentId: 'missing' }],
        }),
        LEARNER_ASSESSMENTS,
      ),
    ).toEqual([]);
    expect(
      readSavedAttempts(
        JSON.stringify({
          version: 1,
          attempts: [{ ...draft, answers: Array(10).fill(99) }],
        }),
        LEARNER_ASSESSMENTS,
      ),
    ).toEqual([]);
  });
  it('rejects invalid timers and duplicate attempt identifiers', () => {
    expect(
      readSavedAttempts(
        JSON.stringify({
          version: 1,
          attempts: [{ ...draft, remainingSeconds: -1 }],
        }),
        LEARNER_ASSESSMENTS,
      ),
    ).toEqual([]);
    expect(
      readSavedAttempts(
        JSON.stringify({ version: 1, attempts: [draft, draft] }),
        LEARNER_ASSESSMENTS,
      ),
    ).toHaveLength(1);
  });
});

describe('practice calculator', () => {
  it('respects arithmetic precedence, parentheses, decimals, and unary signs', () => {
    expect(calculateExpression('345 + 278')).toBe(623);
    expect(calculateExpression('2 + 3 * 4')).toBe(14);
    expect(calculateExpression('(2 + 3) * 4')).toBe(20);
    expect(calculateExpression('-.5 + 1.25')).toBe(0.75);
  });
  it('rejects division by zero, invalid expressions, and executable text', () => {
    expect(() => calculateExpression('1/0')).toThrow('Cannot divide by zero');
    expect(() => calculateExpression('2(3)')).toThrow();
    expect(() => calculateExpression('alert(1)')).toThrow();
    expect(() =>
      calculateExpression('('.repeat(30) + '1' + ')'.repeat(30)),
    ).toThrow();
  });
});
