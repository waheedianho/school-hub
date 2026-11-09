import { FilterTab, LearningStep, UiTone } from '@school-hub/ui-elements';
import { CURRENT_LESSON } from '../data/learning-context.data';
import { Params } from '@angular/router';
import {
  LEARNER_SUBJECTS,
  LearnerSubjectId,
} from '../data/subject-catalog.data';

export type LessonStatus = 'in-progress' | 'completed' | 'upcoming';
export type LessonActivityKind = 'quiz' | 'worksheet' | 'portfolio';
export type LessonActivityState =
  | 'pending'
  | 'done'
  | 'locked'
  | 'not-applicable';
export type LessonSubject = LearnerSubjectId;

export const LESSON_ACTIVITY_ROUTES = {
  quiz: '/student/assessments',
  worksheet: '/student/worksheets',
  portfolio: '/student/portfolio-tasks',
};
export const LESSON_ACTIVITY_LABELS = {
  quiz: 'Quiz',
  worksheet: 'Worksheet',
  portfolio: 'Portfolio',
};

export function lessonActivityQuery(
  lesson: LearnerLesson,
  kind: LessonActivityKind,
): Params {
  const key = {
    quiz: 'assessmentId',
    worksheet: 'worksheetId',
    portfolio: 'taskId',
  }[kind];
  const id =
    kind === 'portfolio' && lesson.id === 'whole-numbers'
      ? 'market-price-comparison'
      : `${lesson.id}-${kind}`;
  return { [key]: id, lessonId: lesson.id };
}

export interface LearnerLesson {
  id: string;
  title: string;
  subjectId: LessonSubject;
  subject: string;
  term: string;
  week: number;
  duration: number;
  status: LessonStatus;
  available: boolean;
  progress: number;
  symbol: string;
  tone: UiTone;
  objective: string;
  completedAt?: string;
  activities: Record<LessonActivityKind, LessonActivityState>;
}

export const LESSON_SUBJECTS = LEARNER_SUBJECTS.map((subject) => ({
  id: subject.id,
  label: subject.name,
  symbol: subject.symbol,
  tone: subject.lessonTone,
}));

export const LESSON_TERMS = [
  { id: 'first', label: 'First Term' },
  { id: 'second', label: 'Second Term' },
  { id: 'third', label: 'Third Term' },
];

export const LESSON_TABS: FilterTab[] = [
  { id: 'all', label: 'All Lessons', icon: 'ri-list-check-2' },
  { id: 'in-progress', label: 'In Progress', icon: 'ri-timer-line' },
  { id: 'completed', label: 'Completed', icon: 'ri-checkbox-circle-line' },
  { id: 'upcoming', label: 'Upcoming', icon: 'ri-calendar-line' },
];

export const LESSON_STATUS: Record<
  LessonStatus,
  { label: string; tone: UiTone }
> = {
  'in-progress': { label: 'In Progress', tone: 'blue' },
  completed: { label: 'Completed', tone: 'green' },
  upcoming: { label: 'Upcoming', tone: 'purple' },
};

export const LESSON_FLOW: LearningStep[] = [
  { id: 'learn', label: 'Learn', icon: 'ri-book-open-line' },
  { id: 'practice', label: 'Guided Practice', icon: 'ri-pencil-line' },
  { id: 'quiz', label: 'Quiz', icon: 'ri-question-line' },
  { id: 'worksheet', label: 'Worksheet', icon: 'ri-file-text-line' },
  { id: 'portfolio', label: 'Apply It', icon: 'ri-lightbulb-line' },
  { id: 'feedback', label: 'Feedback', icon: 'ri-chat-1-line' },
];

function lesson(
  id: string,
  title: string,
  subjectId: LessonSubject,
  options: Partial<LearnerLesson> = {},
): LearnerLesson {
  const subject =
    LESSON_SUBJECTS.find((item) => item.id === subjectId) ?? LESSON_SUBJECTS[0];
  const status = options.status ?? 'completed';
  const activityState =
    status === 'completed'
      ? 'done'
      : status === 'in-progress'
        ? 'pending'
        : 'locked';
  return {
    id,
    title,
    subjectId,
    subject: subject.label,
    symbol: subject.symbol,
    tone: subject.tone,
    term: 'first',
    week: 1,
    duration: 15,
    status,
    available: status !== 'upcoming',
    progress: status === 'completed' ? 100 : 0,
    objective: `Explore ${title.toLowerCase()} and apply what you learn through guided practice.`,
    completedAt: status === 'completed' ? '2026-10-30' : undefined,
    activities: {
      quiz: activityState,
      worksheet: activityState,
      portfolio:
        subjectId === 'english-language' ? 'not-applicable' : activityState,
    },
    ...options,
  };
}

/** 20 lessons: 16 completed, one in progress, and three upcoming. */
export const LEARNER_LESSONS: LearnerLesson[] = [
  lesson(CURRENT_LESSON.id, CURRENT_LESSON.topic, 'mathematics', {
    status: 'in-progress',
    duration: 18,
    progress: CURRENT_LESSON.progress,
    objective: CURRENT_LESSON.objective,
  }),
  lesson('lcm', 'LCM', 'mathematics', {
    status: 'upcoming',
    week: 2,
    duration: 20,
    symbol: 'LCM',
    objective: 'Find the lowest common multiple of two or more whole numbers.',
  }),
  lesson('hcf', 'HCF', 'mathematics', {
    status: 'upcoming',
    week: 3,
    duration: 20,
    symbol: 'HCF',
    objective:
      'Identify factors and find the highest common factor of whole numbers.',
  }),
  lesson('parts-of-speech', 'Parts of Speech', 'english-language', {
    duration: 12,
    completedAt: '2026-11-03',
    objective:
      'Identify the main parts of speech and use them in simple sentences.',
  }),
  lesson('living-things', 'Living Things', 'basic-science', {
    completedAt: '2026-11-02',
    objective:
      'Recognise the characteristics of living things and describe familiar examples.',
  }),
  lesson('addition-facts', 'Addition Facts', 'mathematics', {
    week: 0,
    symbol: '+',
    completedAt: '2026-11-01',
  }),
  lesson('reading-whole-numbers', 'Reading Whole Numbers', 'mathematics'),
  lesson('number-patterns', 'Number Patterns', 'mathematics', { week: 2 }),
  lesson('nouns', 'Nouns', 'english-language', { week: 2 }),
  lesson(
    'countable-nouns',
    'Countable and Uncountable Nouns',
    'english-language',
    { week: 3 },
  ),
  lesson('plant-parts', 'Parts of a Plant', 'basic-science', { week: 2 }),
  lesson('animals', 'Animals Around Us', 'basic-science', { week: 3 }),
  lesson('rounding-numbers', 'Rounding Numbers', 'mathematics', { week: 3 }),
  lesson('punctuation', 'Punctuation', 'english-language', { week: 4 }),
  lesson('simple-sentences', 'Simple Sentences', 'english-language', {
    week: 4,
  }),
  lesson('healthy-habits', 'Healthy Habits', 'basic-science', { week: 4 }),
  lesson('expanded-form', 'Expanded Form', 'mathematics', {
    term: 'second',
    week: 1,
  }),
  lesson('comprehension', 'Reading Comprehension', 'english-language', {
    term: 'second',
    week: 1,
  }),
  lesson('our-environment', 'Our Environment', 'basic-science', {
    term: 'third',
    week: 1,
  }),
  lesson('sentence-types', 'Sentence Types', 'english-language', {
    status: 'upcoming',
    available: true,
    week: 2,
    duration: 12,
    activities: {
      quiz: 'pending',
      worksheet: 'pending',
      portfolio: 'not-applicable',
    },
    objective: 'Recognise statements, questions, commands, and exclamations.',
  }),
];
