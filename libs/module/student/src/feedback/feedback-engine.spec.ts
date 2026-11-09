import { convertToParamMap } from '@angular/router';
import {
  LEARNER_ASSESSMENTS,
  SAMPLE_ASSESSMENT_RESULTS,
} from '../assessments/assessments.data';
import { LEARNER_TUTOR_NOTE } from '../data/learning-context.data';
import { feedbackReturn } from '../data/feedback-context';
import { LEARNER_PORTFOLIO_TASKS } from '../portfolio/portfolio.data';
import { PortfolioRecord } from '../portfolio/portfolio.model';
import { LEARNER_WORKSHEETS } from '../worksheets/worksheets.data';
import { WorksheetRecord } from '../worksheets/worksheet.model';
import {
  feedbackAverage,
  feedbackFocusAreas,
  portfolioFeedback,
  quizFeedback,
  reviewedPercentage,
  worksheetFeedback,
} from './feedback-engine';
import { readFeedbackReviews } from './feedback-review-engine';

const quiz = LEARNER_ASSESSMENTS.find(
  (item) => item.id === 'whole-numbers-quiz',
);
const result = SAMPLE_ASSESSMENT_RESULTS.find(
  (item) => item.assessmentId === quiz?.id,
);
const worksheet = LEARNER_WORKSHEETS.find(
  (item) => item.id === 'whole-numbers-worksheet',
);
const portfolio = LEARNER_PORTFOLIO_TASKS.find(
  (item) => item.id === 'rounding-numbers-portfolio',
);
if (!quiz || !result || !worksheet || !portfolio)
  throw new Error('Missing feedback fixture');
const worksheetRecord: WorksheetRecord = {
  ...worksheet,
  answers: worksheet.initialAnswers,
  marked: [],
  currentIndex: 0,
  elapsedSeconds: 0,
  scratch: '',
  answered: 12,
  progress: 60,
};
const portfolioRecord: PortfolioRecord = {
  ...portfolio,
  ...portfolio.initialWork,
  files: [],
  note: '',
  progress: 40,
};
const entry = quizFeedback(result, quiz);

describe('feedback sources', () => {
  it('preserves the existing dashboard feedback link and tutor note', () => {
    expect(entry.id).toBe(LEARNER_TUTOR_NOTE.id);
    expect(entry.comment).toBe(LEARNER_TUTOR_NOTE.message);
    expect(entry.score).toBe(70);
    expect(entry.initialReviewed).toBe(false);
    expect(entry.work.route).toEqual([
      '/student/assessments',
      quiz.id,
      'results',
      result.id,
    ]);
  });
  it('uses the actual practice answers and identifies automatic feedback', () => {
    const answers = quiz.questions.map((question) => question.correctIndex);
    const practice = quizFeedback(
      {
        ...result,
        id: 'practice-1',
        source: 'practice',
        answers,
        percentage: 100,
      },
      quiz,
    );
    expect(practice.author).toBe('Practice Review');
    expect(practice.source).toBe('practice');
    expect(practice.comment).toContain('Every answer was correct.');
    expect(practice.commonError).toBeUndefined();
    expect(practice.initialReviewed).toBe(false);
    expect(practice.work.label).toBe('View Answer Review');
    const incorrect = quizFeedback(
      {
        ...result,
        id: 'practice-2',
        source: 'practice',
        answers: answers.map(() => null),
        percentage: 0,
        expired: true,
      },
      quiz,
    );
    expect(incorrect.improvements[0]).toContain(quiz.questions[0].explanation);
    expect(incorrect.comment).toContain('Time ran out');
  });
  it('does not create worksheet feedback before submission', () => {
    expect(worksheetFeedback(worksheetRecord)).toBeUndefined();
    expect(
      worksheetFeedback({ ...worksheetRecord, status: 'completed' }),
    ).toBeUndefined();
    const completed = worksheetFeedback({
      ...worksheetRecord,
      status: 'completed',
      submittedAt: '2026-11-04T12:00:00Z',
      percentage: 0,
      correct: 0,
    });
    expect(completed?.source).toBe('practice');
    expect(completed?.score).toBe(0);
    expect(completed?.work.label).toBe('View Marked Work');
  });
  it('retains the original portfolio assessment after a revised submission', () => {
    const revised = portfolioFeedback({
      ...portfolioRecord,
      status: 'submitted',
      score: undefined,
      submission: {
        id: 'revised-submission',
        version: 2,
        submittedAt: '2026-11-04T12:00:00Z',
        note: '',
      },
    });
    expect(revised?.score).toBe(55);
    expect(revised?.comment).toBe(portfolio.feedback?.comment);
    expect(revised?.nextSteps).toEqual(portfolio.feedback?.nextSteps);
    expect(revised?.earlierVersion).toBe(1);
    expect(revised?.initialReviewed).toBe(false);
    expect(
      portfolioFeedback({ ...portfolioRecord, feedback: undefined }),
    ).toBeUndefined();
  });
});
describe('feedback summaries and review storage', () => {
  it('averages available scores and groups the lowest scoring topics', () => {
    const entries = [
      entry,
      { ...entry, score: 50 },
      {
        ...entry,
        id: 'another',
        topicId: 'other',
        topic: 'Other Topic',
        score: 90,
      },
      { ...entry, score: undefined },
    ];
    expect(feedbackAverage(entries)).toBe(70);
    expect(
      feedbackFocusAreas(entries).map((area) => [area.title, area.score]),
    ).toEqual([
      [entry.topic, 60],
      ['Other Topic', 90],
    ]);
    expect(feedbackAverage([])).toBeUndefined();
    expect(reviewedPercentage([])).toBe(0);
    expect(
      reviewedPercentage([
        { ...entry, reviewed: true },
        { ...entry, reviewed: false },
      ]),
    ).toBe(50);
  });
  it('preserves explicit unreviewed states and rejects malformed saved records', () => {
    expect(
      readFeedbackReviews(
        JSON.stringify({
          version: 1,
          states: [
            [entry.id, false],
            ['valid', true],
            ['invalid/id', true],
            ['invalid-type', 'yes'],
          ],
        }),
      ),
    ).toEqual(
      new Map([
        [entry.id, false],
        ['valid', true],
      ]),
    );
    for (const raw of [null, '{', '{}', '{"version":2,"states":[]}'])
      expect(readFeedbackReviews(raw).size).toBe(0);
  });
  it('accepts only feedback return links and preserves their selection', () => {
    const destination =
      '/student/feedback?tab=worksheet&feedbackId=worksheet-feedback-place-value-worksheet#feedback-detail';
    expect(
      feedbackReturn(convertToParamMap({ feedbackReturn: destination })),
    ).toBe(destination);
    for (const value of [
      'https://example.com',
      '//example.com',
      '/student/feedback-elsewhere',
      '/student/feedback#other',
      '/student/feedback\n',
      '/student/feedback?' + 'x'.repeat(4096),
    ])
      expect(
        feedbackReturn(convertToParamMap({ feedbackReturn: value })),
      ).toBeUndefined();
  });
});
