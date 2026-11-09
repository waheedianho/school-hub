import {
  AchievementCardData,
  ActivityDay,
  ProgressListItem,
} from '@school-hub/ui-elements';
import { LearnerGoal } from '../data/learner-profile.model';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { ProgressScope } from '../progress/progress.model';
import {
  meanScore,
  progressSummary,
  quizResults,
  scopeProgress,
} from '../progress/progress-engine';

export function profileDate(value: string): string {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  });
}
export function learningDay(timestamp: number): string {
  return new Date(timestamp + 3600000).toISOString().slice(0, 10);
}
function dayNumber(date: string): number {
  return Math.floor(Date.parse(date + 'T00:00:00Z') / 86400000);
}
function dayString(day: number): string {
  return new Date(day * 86400000).toISOString().slice(0, 10);
}
export interface LearningEvidence {
  id: string;
  date: string;
  title: string;
  route: string;
  queryParams?: Record<string, string>;
}
export function profileEvidence(
  scope: ProgressScope,
  now: number,
): LearningEvidence[] {
  const items: {
    id: string;
    date?: string;
    title: string;
    route: string;
    queryParams?: Record<string, string>;
  }[] = [
    ...scope.lessons
      .filter((item) => item.status === 'completed')
      .map((item) => ({
        id: 'lesson-' + item.id,
        date: item.completedAt,
        title: 'Lesson: ' + item.title,
        route: '/student/lessons',
        queryParams: { lessonId: item.id },
      })),
    ...scope.results.map((item) => ({
      id: 'quiz-' + item.id,
      date: item.date,
      title:
        scope.assessments.find(
          (assessment) => assessment.id === item.assessmentId,
        )?.title ?? 'Assessment completed',
      route: '/student/assessments',
      queryParams: { assessmentId: item.assessmentId, tab: 'results' },
    })),
    ...scope.worksheets
      .filter((item) => item.status === 'completed')
      .map((item) => ({
        id: 'worksheet-' + item.id,
        date: item.submittedAt,
        title: 'Worksheet: ' + item.title,
        route: '/student/worksheets/' + item.id,
      })),
    ...scope.portfolios
      .filter((item) => item.submission)
      .map((item) => ({
        id: 'portfolio-' + item.id,
        date: item.submission?.submittedAt,
        title: 'Portfolio: ' + item.title,
        route: '/student/portfolio-tasks/' + item.id,
        queryParams: { tab: 'submission' },
      })),
  ];
  return items
    .flatMap((item) => {
      if (!item.date) return [];
      const timestamp = Date.parse(
        /^\d{4}-\d{2}-\d{2}$/.test(item.date)
          ? item.date + 'T00:00:00+01:00'
          : item.date,
      );
      return Number.isFinite(timestamp) && timestamp <= now
        ? [{ ...item, date: learningDay(timestamp) }]
        : [];
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
}
export function learningStreak(
  evidence: readonly LearningEvidence[],
  now: number,
) {
  const days = [...new Set(evidence.map((item) => item.date))].sort();
  let run = 0,
    longest = 0,
    previous = -Infinity,
    earnedOn: string | undefined;
  for (const date of days) {
    const day = dayNumber(date);
    run = day === previous + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    if (run >= 7 && !earnedOn) earnedOn = date;
    previous = day;
  }
  const today = dayNumber(learningDay(now));
  const current = previous === today || previous === today - 1 ? run : 0;
  const monday = today - ((new Date(today * 86400000).getUTCDay() + 6) % 7);
  const week: ActivityDay[] = Array.from({ length: 7 }, (_, index) => {
    const day = monday + index,
      date = dayString(day),
      count = evidence.filter((item) => item.date === date).length;
    const label = new Date(day * 86400000).toLocaleDateString('en-GB', {
      weekday: 'short',
      timeZone: 'UTC',
    });
    return {
      date,
      label,
      state: count
        ? 'complete'
        : day === today
          ? 'today'
          : day > today
            ? 'future'
            : 'missing',
      description: `${profileDate(date + 'T12:00:00+01:00')}: ${count ? `${count} recorded learning ${count === 1 ? 'activity' : 'activities'}` : day === today ? 'Today, no recorded completion yet' : day > today ? 'Upcoming day' : 'No recorded completion'}`,
    };
  });
  return { current, longest, earnedOn, week, days };
}
export function recordedPracticeSeconds(scope: ProgressScope): number {
  return [
    ...scope.worksheets.map((item) => item.elapsedSeconds),
    ...scope.portfolios.map((item) => item.secondsSpent),
  ].reduce(
    (total, value) =>
      total + (Number.isFinite(value) && value > 0 ? Math.floor(value) : 0),
    0,
  );
}
export function profileTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return minutes >= 60
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : `${minutes}m`;
}
export function profileAchievements(
  scope: ProgressScope,
  now: number,
): AchievementCardData[] {
  const completed = scope.lessons.filter((item) => item.status === 'completed');
  const completionDates = completed
    .flatMap((item) =>
      item.completedAt && Date.parse(item.completedAt) <= now
        ? [item.completedAt]
        : [],
    )
    .sort();
  const qualifying = quizResults(scope)
    .filter(
      (result) =>
        result.percentage >= 80 &&
        result.percentage <= 100 &&
        Date.parse(result.date) <= now,
    )
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const streak = learningStreak(profileEvidence(scope, now), now);
  return [
    {
      id: 'consistent-learner',
      title: 'Consistent Learner',
      description: 'Complete 10 lessons',
      detail:
        completed.length >= 10
          ? completionDates[9]
            ? profileDate(completionDates[9])
            : 'Earned · date not recorded'
          : `${completed.length} of 10 completed`,
      icon: 'ri-star-fill',
      tone: 'purple',
      earned: completed.length >= 10,
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Score 80% or higher in a quiz',
      detail: qualifying[0]
        ? profileDate(qualifying[0].date)
        : 'Not yet earned',
      icon: 'ri-check-line',
      tone: 'green',
      earned: !!qualifying.length,
    },
    {
      id: 'on-track',
      title: 'On Track',
      description: 'Complete learning on 7 consecutive days',
      detail: streak.earnedOn
        ? profileDate(streak.earnedOn)
        : `${streak.longest} of 7 consecutive days`,
      icon: 'ri-medal-line',
      tone: 'orange',
      earned: !!streak.earnedOn,
    },
  ];
}
export function profileGoals(
  goals: readonly LearnerGoal[],
  scope: ProgressScope,
): ProgressListItem[] {
  return goals.map((goal) => {
    const data = scopeProgress(scope, '', goal.subjectId),
      subject =
        LEARNER_SUBJECTS.find((item) => item.id === goal.subjectId)?.name ?? '';
    const current =
      goal.metric === 'quiz-average'
        ? meanScore(quizResults(data).map((result) => result.percentage))
        : goal.metric === 'lessons'
          ? data.lessons.filter((item) => item.status === 'completed').length
          : goal.metric === 'worksheets'
            ? data.worksheets.filter((item) => item.status === 'completed')
                .length
            : progressSummary(data).handedIn;
    const title =
      goal.metric === 'quiz-average'
        ? `Improve ${subject || 'overall'} quiz score to ${goal.target}%`
        : goal.metric === 'lessons'
          ? `Complete ${goal.target} ${subject ? subject + ' ' : ''}lessons`
          : goal.metric === 'worksheets'
            ? `Complete ${goal.target} ${subject ? subject + ' ' : ''}worksheets`
            : `Hand in ${goal.target} ${subject ? subject + ' ' : ''}portfolio tasks`;
    const value =
      current === undefined
        ? undefined
        : Math.min(100, Math.round((current / goal.target) * 100));
    return {
      id: goal.id,
      title,
      icon: 'ri-focus-3-line',
      tone: 'purple',
      value,
      valueLabel: value === undefined ? 'No score yet' : `${value}%`,
      description:
        current === undefined
          ? 'Complete a quiz to start tracking.'
          : `${current}${goal.metric === 'quiz-average' ? '%' : ''} of ${goal.target}${goal.metric === 'quiz-average' ? '% target' : ''} · ${value === 100 ? 'Goal reached' : 'All-time records'}`,
    };
  });
}
export function profileSubjectRows(scope: ProgressScope): ProgressListItem[] {
  return LEARNER_SUBJECTS.map((subject) => {
    const lessons = scope.lessons.filter(
      (item) => item.subjectId === subject.id,
    );
    const active =
      lessons.find((item) => item.available && item.status === 'in-progress') ??
      lessons.find((item) => item.available && item.status === 'upcoming');
    const review = lessons.find(
      (item) => item.available && item.status === 'completed',
    );
    const next = active ?? review,
      value = lessons.length
        ? Math.round(
            lessons.reduce((total, item) => total + item.progress, 0) /
              lessons.length,
          )
        : 0;
    return {
      id: subject.id,
      title: subject.name,
      icon:
        subject.id === 'mathematics'
          ? 'ri-square-root'
          : subject.id === 'english-language'
            ? 'ri-book-open-line'
            : 'ri-flask-line',
      tone: subject.lessonTone,
      value,
      valueLabel: value + '%',
      detail: next
        ? `${active ? 'Next' : 'Review'}: ${next.title}`
        : 'No available lesson yet',
      route: next ? '/student/lessons' : '/student/subjects',
      queryParams: next ? { lessonId: next.id } : { subjectId: subject.id },
      actionLabel: active ? 'Continue' : next ? 'Review' : 'View Subject',
    };
  });
}
