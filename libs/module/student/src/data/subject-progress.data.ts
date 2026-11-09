import { SubjectCardData } from '@school-hub/ui-elements';
import { LEARNER_LESSONS, LearnerLesson } from '../lessons/lessons.data';
import { LEARNER_SUBJECTS, LearnerSubject } from './subject-catalog.data';

export type SubjectLearningStatus = 'in-progress' | 'completed' | 'not-started';

export interface SubjectOverview {
  subject: LearnerSubject;
  lessons: readonly LearnerLesson[];
  completed: number;
  progress: number;
  status: SubjectLearningStatus;
  nextLesson?: LearnerLesson;
  latestLesson?: LearnerLesson;
  duration: number;
  card: SubjectCardData;
}

export function subjectOverview(
  subject: LearnerSubject,
  term = '',
): SubjectOverview {
  const lessons = LEARNER_LESSONS.filter(
    (lesson) =>
      lesson.subjectId === subject.id && (!term || lesson.term === term),
  );
  const completed = lessons.filter(
    (lesson) => lesson.status === 'completed',
  ).length;
  const progress = lessons.length
    ? Math.round(
        lessons.reduce((sum, lesson) => sum + lesson.progress, 0) /
          lessons.length,
      )
    : 0;
  const status: SubjectLearningStatus =
    lessons.length && completed === lessons.length
      ? 'completed'
      : lessons.some((lesson) => lesson.progress > 0)
        ? 'in-progress'
        : 'not-started';
  const nextLesson =
    lessons.find((lesson) => lesson.status === 'in-progress') ??
    lessons.find(
      (lesson) => lesson.status === 'upcoming' && lesson.available,
    ) ??
    lessons.find((lesson) => lesson.status === 'upcoming');
  const latestLesson =
    lessons.find((lesson) => lesson.status === 'in-progress') ??
    [...lessons]
      .filter((lesson) => lesson.status === 'completed')
      .sort((a, b) =>
        (b.completedAt ?? '').localeCompare(a.completedAt ?? ''),
      )[0] ??
    lessons[0];
  return {
    subject,
    lessons,
    completed,
    progress,
    status,
    nextLesson,
    latestLesson,
    duration: lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
    card: {
      id: subject.id,
      name: subject.name,
      icon: subject.icon,
      tone: subject.tone,
      lastLesson: latestLesson?.title ?? 'No lessons yet',
      progress,
    },
  };
}

export const LEARNER_SUBJECT_OVERVIEWS = LEARNER_SUBJECTS.map((subject) =>
  subjectOverview(subject),
);
