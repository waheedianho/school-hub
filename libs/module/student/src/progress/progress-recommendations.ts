import { LearnerAssessment } from '../assessments/assessment.model';
import { ProgressScope, ProgressStep } from './progress.model';
import { quizResults } from './progress-engine';

export function progressRecommendations(
  scope: ProgressScope,
  canStart: (quiz: LearnerAssessment) => boolean,
): ProgressStep[] {
  const steps: (ProgressStep & { priority: number })[] = [];
  for (const lesson of scope.lessons)
    if (lesson.available && lesson.status !== 'completed')
      steps.push({
        id: `lesson-${lesson.id}`,
        area: 'lessons',
        priority: lesson.status === 'in-progress' ? 0 : 12,
        title: `${lesson.status === 'in-progress' ? 'Review' : 'Explore'} ${lesson.title}`,
        description:
          lesson.status === 'in-progress'
            ? `Continue from ${lesson.progress}% lesson progress.`
            : 'Preview the lesson objectives and available activities.',
        icon: 'ri-book-open-line',
        tone: 'purple',
        route: '/student/lessons',
        queryParams: {
          lessonId: lesson.id,
          subject: lesson.subjectId,
          term: lesson.term,
        },
        actionLabel: 'Review',
      });
  const results = [...quizResults(scope)].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
  const quizzes = scope.assessments
    .filter((quiz) => quiz.kind === 'quiz' && canStart(quiz))
    .map((quiz) => ({
      quiz,
      latest: results.find((result) => result.assessmentId === quiz.id),
    }))
    .filter(({ latest }) => !latest || latest.percentage < 85)
    .sort(
      (a, b) => (a.latest?.percentage ?? -1) - (b.latest?.percentage ?? -1),
    );
  for (const [index, { quiz, latest }] of quizzes.entries())
    steps.push({
      id: `quiz-${quiz.id}`,
      area: 'quizzes',
      priority: 1 + index * 4,
      title: `${latest ? 'Practise' : 'Try'} ${quiz.topic}`,
      description: latest
        ? `Your latest quiz score is ${latest.percentage}%. An attempt is available.`
        : 'Check your understanding with an available quiz.',
      icon: 'ri-question-answer-line',
      tone: 'blue',
      route: '/student/assessments',
      queryParams: {
        assessmentId: quiz.id,
        subjectId: quiz.subjectId,
        term: quiz.term,
      },
      actionLabel: 'Practise',
    });
  for (const record of scope.worksheets)
    if (record.available && record.status !== 'completed')
      steps.push({
        id: `worksheet-${record.id}`,
        area: 'worksheets',
        priority: record.status === 'in-progress' ? 2 : 6,
        title: `${record.status === 'in-progress' ? 'Continue' : 'Start'} ${record.title}`,
        description: `${record.answered} of ${record.questionCount} questions answered.`,
        icon: 'ri-file-text-line',
        tone: 'orange',
        route: ['/student/worksheets', record.id],
        actionLabel: record.status === 'in-progress' ? 'Continue' : 'Start',
      });
  for (const record of scope.portfolios)
    if (
      record.available &&
      ['needs-revision', 'in-progress', 'not-started'].includes(record.status)
    )
      steps.push({
        id: `portfolio-${record.id}`,
        area: 'portfolio',
        priority: record.status === 'needs-revision' ? 3 : 7,
        title: `${record.status === 'needs-revision' ? 'Revise' : 'Continue'} ${record.title}`,
        description:
          record.status === 'needs-revision'
            ? 'Apply your tutor’s comments before resubmitting.'
            : 'Complete your work, evidence, and reflection.',
        icon: 'ri-folder-open-line',
        tone: 'purple',
        route: ['/student/portfolio-tasks', record.id],
        queryParams: {
          tab: record.status === 'needs-revision' ? 'feedback' : 'work',
        },
        actionLabel: record.status === 'needs-revision' ? 'Revise' : 'Continue',
      });
  for (const record of scope.feedback.filter((item) => !item.reviewed))
    steps.push({
      id: `feedback-${record.id}`,
      area:
        record.kind === 'quiz'
          ? 'quizzes'
          : record.kind === 'worksheet'
            ? 'worksheets'
            : 'portfolio',
      priority: 20,
      title: `Review ${record.title} feedback`,
      description: 'Read your feedback and choose the next step to work on.',
      icon: 'ri-chat-1-line',
      tone: 'green',
      route: '/student/feedback',
      queryParams: { feedbackId: record.id },
      actionLabel: 'Review',
    });
  return steps.sort(
    (a, b) => a.priority - b.priority || a.id.localeCompare(b.id),
  );
}
