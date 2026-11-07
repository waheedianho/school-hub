import { PerformancePoint, ScoreItem, UiTone } from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { PORTFOLIO_RUBRIC } from '../portfolio/portfolio.data';
import { portfolioScore } from '../portfolio/portfolio-engine';
import {
  ProgressActivity,
  ProgressScope,
  ProgressSubject,
  ProgressTopic,
} from './progress.model';

export function meanScore(
  values: readonly (number | undefined)[],
): number | undefined {
  const scores = values.filter(
    (value): value is number =>
      value !== undefined &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= 100,
  );
  return scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : undefined;
}
export function completionRate(completed: number, total: number): number {
  return total ? Math.round((completed / total) * 100) : 0;
}
export function masteryBand(score: number | undefined): {
  label: string;
  tone: UiTone;
} {
  return score === undefined
    ? { label: 'No Score Yet', tone: 'neutral' }
    : score >= 85
      ? { label: 'Strong', tone: 'green' }
      : score >= 70
        ? { label: 'Good', tone: 'blue' }
        : score >= 60
          ? { label: 'Developing', tone: 'orange' }
          : { label: 'Needs Support', tone: 'red' };
}
export function scopeProgress(
  source: ProgressScope,
  term = '',
  subjectId = '',
): ProgressScope {
  const matches = (record: { term: string; subjectId: string }) =>
    (!term || term === 'all' || record.term === term) &&
    (!subjectId || record.subjectId === subjectId);
  const assessments = source.assessments.filter(matches);
  const ids = new Set(assessments.map((record) => record.id));
  return {
    lessons: source.lessons.filter(matches),
    assessments,
    results: source.results.filter((result) => ids.has(result.assessmentId)),
    worksheets: source.worksheets.filter(matches),
    portfolios: source.portfolios.filter(matches),
    feedback: source.feedback.filter(matches),
  };
}
export function quizResults(scope: ProgressScope) {
  const ids = new Set(
    scope.assessments
      .filter((record) => record.kind === 'quiz')
      .map((record) => record.id),
  );
  return scope.results.filter((result) => ids.has(result.assessmentId));
}
export function progressSummary(scope: ProgressScope) {
  const completedLessons = scope.lessons.filter(
    (lesson) => lesson.status === 'completed',
  ).length;
  const quizzes = quizResults(scope);
  const completedWorksheets = scope.worksheets.filter(
    (record) => record.status === 'completed',
  ).length;
  const handedIn = scope.portfolios.filter((record) =>
    ['submitted', 'completed'].includes(record.status),
  ).length;
  const quizCount = scope.assessments.filter(
    (record) => record.kind === 'quiz',
  ).length;
  const started =
    scope.lessons.filter((record) => record.progress > 0).length +
    new Set(quizzes.map((result) => result.assessmentId)).size +
    scope.worksheets.filter((record) => record.status !== 'not-started')
      .length +
    scope.portfolios.filter((record) => record.status !== 'not-started').length;
  const total =
    scope.lessons.length +
    quizCount +
    scope.worksheets.length +
    scope.portfolios.length;
  return {
    academic: meanScore(scope.lessons.map((lesson) => lesson.progress)) ?? 0,
    completedLessons,
    lessonCount: scope.lessons.length,
    quizAverage: meanScore(quizzes.map((result) => result.percentage)),
    quizResults: quizzes.length,
    completedWorksheets,
    worksheetCount: scope.worksheets.length,
    worksheetCompletion: completionRate(
      completedWorksheets,
      scope.worksheets.length,
    ),
    handedIn,
    portfolioCount: scope.portfolios.length,
    portfolioCompletion: completionRate(handedIn, scope.portfolios.length),
    assessedPortfolios: scope.portfolios.filter((record) => record.feedback)
      .length,
    skills: meanScore(
      scope.portfolios.map((record) => portfolioScore(record.feedback?.scores)),
    ),
    engagement: completionRate(started, total),
    started,
    total,
    feedbackCount: scope.feedback.length,
    needsReview: scope.feedback.filter((record) => !record.reviewed).length,
  };
}
export function progressSubjects(scope: ProgressScope): ProgressSubject[] {
  return LEARNER_SUBJECTS.flatMap((subject) => {
    const data = scopeProgress(scope, '', subject.id);
    if (!data.lessons.length && !data.portfolios.length) return [];
    const summary = progressSummary(data);
    const topic =
      data.lessons.find((lesson) => lesson.status === 'in-progress') ??
      data.lessons.find(
        (lesson) => lesson.available && lesson.status === 'upcoming',
      ) ??
      [...data.lessons]
        .filter((lesson) => lesson.completedAt)
        .sort((a, b) =>
          (b.completedAt ?? '').localeCompare(a.completedAt ?? ''),
        )[0] ??
      data.lessons[0];
    return [
      {
        subject,
        topic,
        lessonProgress: summary.academic,
        lessonsCompleted: summary.completedLessons,
        lessonCount: summary.lessonCount,
        quizScore: summary.quizAverage,
        worksheetsCompleted: summary.completedWorksheets,
        worksheetCount: summary.worksheetCount,
        mastery: masteryBand(summary.quizAverage),
      },
    ];
  });
}
export function progressTopics(scope: ProgressScope): ProgressTopic[] {
  return scope.lessons
    .map((lesson) => {
      const ids = new Set(
        scope.assessments
          .filter(
            (record) => record.lessonId === lesson.id && record.kind === 'quiz',
          )
          .map((record) => record.id),
      );
      const latest = new Map<string, number>();
      for (const result of [...scope.results].sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date),
      ))
        if (ids.has(result.assessmentId) && !latest.has(result.assessmentId))
          latest.set(result.assessmentId, result.percentage);
      const scores = [
        ...latest.values(),
        ...scope.worksheets
          .filter(
            (record) =>
              record.lessonId === lesson.id && record.status === 'completed',
          )
          .map((record) => record.percentage),
        ...scope.portfolios
          .filter((record) => record.lessonId === lesson.id && record.feedback)
          .map((record) => portfolioScore(record.feedback?.scores)),
      ].filter((score): score is number => score !== undefined);
      const value = meanScore(scores);
      const band = masteryBand(value);
      return {
        id: lesson.id,
        label: lesson.title,
        subjectId: lesson.subjectId,
        value,
        evidenceCount: scores.length,
        description: scores.length
          ? `${scores.length} scored ${scores.length === 1 ? 'activity' : 'activities'}`
          : 'No scored activity yet',
        tone: band.tone,
        badge: band.label,
        route: '/student/lessons',
        queryParams: {
          lessonId: lesson.id,
          subject: lesson.subjectId,
          term: lesson.term,
        },
      };
    })
    .sort(
      (a, b) =>
        (a.value ?? 101) - (b.value ?? 101) || a.label.localeCompare(b.label),
    );
}
export function progressSkills(scope: ProgressScope): ScoreItem[] {
  const assessed = scope.portfolios.flatMap((record) =>
    record.feedback && portfolioScore(record.feedback.scores) !== undefined
      ? [record.feedback]
      : [],
  );
  return PORTFOLIO_RUBRIC.map((criterion, index) => {
    const value = meanScore(
      assessed.map((record) => (record.scores[index] / criterion.max) * 100),
    );
    return {
      id: criterion.id,
      label: criterion.title,
      value,
      tone: masteryBand(value).tone,
    };
  });
}
export function progressDate(value: string): string {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  });
}
export function progressActivities(scope: ProgressScope): ProgressActivity[] {
  const activities: ProgressActivity[] = [];
  const quizzes = new Map(
    scope.assessments
      .filter((record) => record.kind === 'quiz')
      .map((record) => [record.id, record]),
  );
  for (const result of quizResults(scope)) {
    const quiz = quizzes.get(result.assessmentId);
    if (quiz)
      activities.push({
        id: `quiz-${result.id}`,
        area: 'quizzes',
        date: result.date,
        title: 'Quiz Completed',
        description: `${quiz.title} · ${result.percentage}%`,
        icon: 'ri-graduation-cap-line',
        tone: 'purple',
        route: ['/student/assessments', quiz.id, 'results', result.id],
      });
  }
  for (const record of scope.worksheets)
    if (record.status === 'completed' && record.submittedAt)
      activities.push({
        id: `worksheet-${record.id}`,
        area: 'worksheets',
        date: record.submittedAt,
        title: 'Worksheet Completed',
        description: `${record.title}${record.percentage === undefined ? '' : ` · ${record.percentage}%`}`,
        icon: 'ri-file-check-line',
        tone: 'blue',
        route: ['/student/worksheets', record.id],
      });
  for (const record of scope.portfolios)
    if (record.status === 'completed' && record.feedback)
      activities.push({
        id: `portfolio-${record.id}`,
        area: 'portfolio',
        date: record.feedback.date,
        title: 'Portfolio Reviewed',
        description: `${record.title} · ${portfolioScore(record.feedback.scores)}%`,
        icon: 'ri-thumb-up-line',
        tone: 'green',
        route: ['/student/portfolio-tasks', record.id],
        queryParams: { tab: 'feedback' },
      });
  for (const record of scope.portfolios)
    if (record.status !== 'completed' && record.submission)
      activities.push({
        id: `portfolio-submission-${record.id}`,
        area: 'portfolio',
        date: record.submission.submittedAt,
        title: 'Portfolio Submitted',
        description: `${record.title} · Version ${record.submission.version}`,
        icon: 'ri-upload-2-line',
        tone: 'purple',
        route: ['/student/portfolio-tasks', record.id],
        queryParams: { tab: 'submission' },
      });
  for (const lesson of scope.lessons)
    if (lesson.status === 'completed' && lesson.completedAt)
      activities.push({
        id: `lesson-${lesson.id}`,
        area: 'lessons',
        date: lesson.completedAt,
        title: 'Lesson Completed',
        description: lesson.title,
        icon: 'ri-book-open-line',
        tone: 'orange',
        route: '/student/lessons',
        queryParams: {
          lessonId: lesson.id,
          subject: lesson.subjectId,
          term: lesson.term,
        },
      });
  return activities
    .sort(
      (a, b) =>
        Date.parse(b.date) - Date.parse(a.date) || a.id.localeCompare(b.id),
    )
    .map((item) => ({ ...item, meta: progressDate(item.date) }));
}

/** Group actual quiz scores by school-calendar week; missing weeks have no invented score. */
export function performanceHistory(
  scope: ProgressScope,
  range: '4' | '8' | 'all',
  now: number,
): PerformancePoint[] {
  const schoolDay = (timestamp: number) =>
    Math.floor((timestamp + 3600000) / 86400000);
  const monday = (day: number) =>
    day - ((new Date(day * 86400000).getUTCDay() + 6) % 7);
  const today = schoolDay(now);
  const first =
    range === 'all' ? -Infinity : monday(today) - (Number(range) - 1) * 7;
  const groups = new Map<number, number[]>();
  for (const result of quizResults(scope)) {
    const timestamp = Date.parse(result.date);
    if (!Number.isFinite(timestamp)) continue;
    const day = schoolDay(timestamp),
      week = monday(day);
    if (week < first || day > today) continue;
    groups.set(week, [...(groups.get(week) ?? []), result.percentage]);
  }
  if (!groups.size) return [];
  const start = range === 'all' ? Math.min(...groups.keys()) : first;
  return Array.from(
    { length: Math.round((monday(today) - start) / 7) + 1 },
    (_, index) => start + index * 7,
  ).map((week) => ({
    label: weekLabel(week),
    value: meanScore(groups.get(week) ?? []),
  }));
}

function weekLabel(week: number): string {
  const start = new Date(week * 86400000),
    end = new Date((week + 6) * 86400000);
  const month = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  return `${month(start)} ${start.getUTCDate()}–${start.getUTCMonth() === end.getUTCMonth() ? '' : month(end) + ' '}${end.getUTCDate()}`;
}
