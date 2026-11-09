import { convertToParamMap } from '@angular/router';
import {
  LEARNER_ASSESSMENTS,
  SAMPLE_ASSESSMENT_RESULTS,
} from '../assessments/assessments.data';
import { assessmentBackQuery } from '../assessments/assessment-navigation';
import { progressReturn } from '../data/progress-context';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { LEARNER_PORTFOLIO_TASKS } from '../portfolio/portfolio.data';
import { portfolioScore } from '../portfolio/portfolio-engine';
import { PortfolioRecord } from '../portfolio/portfolio.model';
import { LEARNER_WORKSHEETS } from '../worksheets/worksheets.data';
import { gradeWorksheet } from '../worksheets/worksheet-engine';
import { WorksheetRecord } from '../worksheets/worksheet.model';
import {
  portfolioFeedback,
  quizFeedback,
  worksheetFeedback,
} from '../feedback/feedback-engine';
import { ProgressScope } from './progress.model';
import {
  meanScore,
  masteryBand,
  performanceHistory,
  progressActivities,
  progressSkills,
  progressSubjects,
  progressSummary,
  progressTopics,
  scopeProgress,
} from './progress-engine';
import { progressRecommendations } from './progress-recommendations';

const worksheets: WorksheetRecord[] = LEARNER_WORKSHEETS.map((record) => {
  const score = gradeWorksheet(record, record.initialAnswers);
  return {
    ...record,
    answers: record.initialAnswers,
    marked: [],
    currentIndex: 0,
    elapsedSeconds: record.initialSeconds,
    scratch: '',
    answered: score.answered,
    progress: 0,
    percentage:
      record.status === 'completed'
        ? record.questions.length
          ? score.percentage
          : record.samplePercentage
        : undefined,
  };
});
const portfolios: PortfolioRecord[] = LEARNER_PORTFOLIO_TASKS.map((record) => ({
  ...record,
  ...record.initialWork,
  files: [],
  note: '',
  progress: 40,
  score: portfolioScore(record.feedback?.scores),
}));
const entries = [
  ...SAMPLE_ASSESSMENT_RESULTS.flatMap((result) => {
    const quiz = LEARNER_ASSESSMENTS.find(
      (record) => record.id === result.assessmentId,
    );
    return quiz ? [quizFeedback(result, quiz)] : [];
  }),
  ...worksheets.flatMap((record) => {
    const entry = worksheetFeedback(record);
    return entry ? [entry] : [];
  }),
  ...portfolios.flatMap((record) => {
    const entry = portfolioFeedback(record);
    return entry ? [entry] : [];
  }),
];
const source: ProgressScope = {
  lessons: LEARNER_LESSONS,
  assessments: LEARNER_ASSESSMENTS,
  results: SAMPLE_ASSESSMENT_RESULTS,
  worksheets,
  portfolios,
  feedback: entries.map((entry) => ({
    ...entry,
    reviewed: entry.initialReviewed,
  })),
};
const empty: ProgressScope = {
  lessons: [],
  assessments: [],
  results: [],
  worksheets: [],
  portfolios: [],
  feedback: [],
};

describe('learner progress calculations', () => {
  it('uses the same records as the dashboard and weights learning coverage by lesson', () => {
    expect(progressSummary(source)).toMatchObject({
      academic: 84,
      completedLessons: 16,
      lessonCount: 20,
      quizAverage: 70,
      quizResults: 17,
      worksheetCompletion: 80,
      completedWorksheets: 16,
      worksheetCount: 20,
      handedIn: 9,
      portfolioCount: 14,
      portfolioCompletion: 64,
      feedbackCount: 42,
    });
    expect(progressSubjects(source).map((row) => row.lessonProgress)).toEqual([
      73, 86, 100,
    ]);
    expect(progressSummary(source).academic).not.toBe(
      meanScore(progressSubjects(source).map((row) => row.lessonProgress)),
    );
  });
  it('scopes all evidence to the selected subject and term, including quiz history', () => {
    const data = scopeProgress(source, 'first', 'mathematics');
    expect(data.lessons).toHaveLength(7);
    expect(progressSummary(data).academic).toBe(69);
    expect(progressSubjects(data)).toHaveLength(1);
    expect(
      data.feedback.every(
        (item) => item.term === 'first' && item.subjectId === 'mathematics',
      ),
    ).toBe(true);
    expect(scopeProgress(source, 'third', 'english-language')).toEqual(empty);
  });
  it('updates quiz averages while topic mastery uses the latest attempt', () => {
    const result = {
      id: 'new-practice',
      assessmentId: 'whole-numbers-quiz',
      date: '2026-11-05T12:00:00+01:00',
      marks: 20,
      totalMarks: 20,
      percentage: 100,
      source: 'practice' as const,
    };
    const data = { ...source, results: [...source.results, result] };
    expect(progressSummary(data).quizAverage).toBe(72);
    expect(
      progressTopics(data).find((topic) => topic.id === 'whole-numbers')?.value,
    ).toBe(100);
    expect(progressSummary(data).academic).toBe(84);
    expect(
      progressTopics(source).find((topic) => topic.id === 'lcm')?.value,
    ).toBeUndefined();
  });
  it('counts a submitted worksheet without fabricating a score for unsubmitted work', () => {
    const data = {
      ...source,
      worksheets: source.worksheets.map((record) =>
        record.id === 'whole-numbers-worksheet'
          ? {
              ...record,
              status: 'completed' as const,
              submittedAt: '2026-11-05T12:00:00+01:00',
              percentage: 60,
            }
          : record,
      ),
    };
    expect(progressSummary(data).worksheetCompletion).toBe(85);
    expect(
      progressTopics(data).find((topic) => topic.id === 'whole-numbers')?.value,
    ).toBe(65);
    expect(
      progressTopics(source).find((topic) => topic.id === 'whole-numbers')
        ?.evidenceCount,
    ).toBe(1);
  });
  it('retains original rubric evidence on revision without grading a new unassessed submission', () => {
    const data = {
      ...source,
      portfolios: source.portfolios.map((record) =>
        record.id === 'rounding-numbers-portfolio'
          ? { ...record, status: 'submitted' as const, score: undefined }
          : record,
      ),
    };
    expect(progressSummary(data).portfolioCompletion).toBe(71);
    expect(
      progressTopics(data).find((topic) => topic.id === 'rounding-numbers')
        ?.value,
    ).toBe(62);
    expect(progressSkills(data)).toEqual(progressSkills(source));
    const pending = {
      ...source,
      portfolios: source.portfolios.map((record) => ({
        ...record,
        feedback: undefined,
      })),
    };
    expect(progressSummary(pending).skills).toBeUndefined();
    expect(
      progressSkills(pending).every((item) => item.value === undefined),
    ).toBe(true);
  });
  it('distinguishes unassessed evidence from zero scores and handles empty scopes', () => {
    expect(progressSummary(empty)).toMatchObject({
      academic: 0,
      worksheetCompletion: 0,
      portfolioCompletion: 0,
      engagement: 0,
      quizAverage: undefined,
      skills: undefined,
    });
    expect(meanScore([0, 100, undefined, NaN, 101])).toBe(50);
    expect(masteryBand(undefined).label).toBe('No Score Yet');
    expect(masteryBand(0).label).toBe('Needs Support');
    expect(masteryBand(60).label).toBe('Developing');
    expect(masteryBand(70).label).toBe('Good');
    expect(masteryBand(85).label).toBe('Strong');
  });
});
describe('recorded history and next steps', () => {
  it('keeps the full Lagos week axis and leaves missing results unassessed', () => {
    const seed = source.results.find(
      (result) => result.assessmentId === 'whole-numbers-quiz',
    );
    if (!seed) throw new Error('Missing quiz fixture');
    const data = {
      ...source,
      results: [
        { ...seed, date: '2026-11-01T22:30:00Z', percentage: 50 },
        { ...seed, date: '2026-11-01T23:30:00Z', percentage: 100 },
        { ...seed, date: '2026-10-01T12:00:00Z', percentage: 25 },
        { ...seed, date: '2026-11-10T12:00:00Z', percentage: 0 },
      ],
    };
    const fourWeeks = performanceHistory(
      data,
      '4',
      Date.parse('2026-11-05T12:00:00Z'),
    );
    expect(fourWeeks).toHaveLength(4);
    expect(fourWeeks.map((point) => point.value)).toEqual([
      undefined,
      undefined,
      50,
      100,
    ]);
    expect(fourWeeks.slice(2)).toEqual([
      { label: 'Oct 26–Nov 1', value: 50 },
      { label: 'Nov 2–8', value: 100 },
    ]);
    const allWeeks = performanceHistory(
      data,
      'all',
      Date.parse('2026-11-05T12:00:00Z'),
    );
    expect(allWeeks).toHaveLength(6);
    expect(allWeeks.filter((point) => point.value !== undefined)).toHaveLength(
      3,
    );
    expect(performanceHistory(empty, '8', Date.now())).toEqual([]);
  });
  it('recommends only available outstanding work and respects the quiz attempt gate', () => {
    const steps = progressRecommendations(source, (quiz) => quiz.available);
    expect(steps.slice(0, 4).map((step) => step.area)).toEqual([
      'lessons',
      'quizzes',
      'worksheets',
      'portfolio',
    ]);
    expect(steps.some((step) => step.id === 'lesson-lcm')).toBe(false);
    expect(
      steps.some(
        (step) => step.id === 'worksheet-reading-whole-numbers-worksheet',
      ),
    ).toBe(false);
    expect(
      progressRecommendations(source, () => false).some((step) =>
        step.id.startsWith('quiz-'),
      ),
    ).toBe(false);
    expect(progressRecommendations(empty, () => true)).toEqual([]);
  });
  it('records real completions and portfolio receipts with valid activity destinations', () => {
    const activities = progressActivities(source);
    expect(activities[0]).toMatchObject({
      title: 'Quiz Completed',
      date: '2026-11-04T12:00:00+01:00',
    });
    expect(
      activities.every(
        (item, index) =>
          index === 0 ||
          Date.parse(activities[index - 1].date) >= Date.parse(item.date),
      ),
    ).toBe(true);
    expect(
      activities.find(
        (item) => item.id === 'worksheet-reading-whole-numbers-worksheet',
      )?.route,
    ).toEqual(['/student/worksheets', 'reading-whole-numbers-worksheet']);
    expect(activities.some((item) => item.title.includes('Streak'))).toBe(
      false,
    );
    expect(progressActivities(empty)).toEqual([]);
  });
  it('preserves only valid internal Progress return links through quiz navigation', () => {
    const destination =
      '/student/progress?subjectId=mathematics&term=first&area=quizzes';
    const params = convertToParamMap({
      progressReturn: destination,
      term: 'first',
      assessmentId: 'whole-numbers-quiz',
    });
    expect(progressReturn(params)).toBe(destination);
    expect(assessmentBackQuery(params)).toEqual({
      term: 'first',
      progressReturn: destination,
    });
    for (const value of [
      'https://example.com',
      '//example.com',
      '/student/progress-elsewhere',
      '/student/progress#other',
      '/student/progress\n',
      '/student/progress?' + 'x'.repeat(4096),
    ])
      expect(
        progressReturn(convertToParamMap({ progressReturn: value })),
      ).toBeUndefined();
  });
});
