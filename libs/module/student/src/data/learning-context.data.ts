import { TaskListItem } from '@school-hub/ui-elements';

/** Shared learner fixtures until the learner API is connected. */
export const CURRENT_LESSON = {
  id: 'whole-numbers',
  subject: 'Mathematics',
  topic: 'Whole Numbers',
  progress: 80,
  week: 1,
  objective: 'Read, write, compare, and order whole numbers.',
};

export const LEARNER_TUTOR_NOTE = {
  id: 'whole-numbers-feedback',
  message: 'You are improving well. Revise place value in large numbers.',
  tutor: 'Mr. Adewale',
};

export const COMMON_LEARNING_MISTAKE =
  'Place-value confusion when reading 6-digit numbers.';

export const PENDING_LESSON_TASKS: TaskListItem[] = [
  {
    id: 'whole-numbers-quiz',
    title: 'Quiz: Whole Numbers',
    dueLabel: 'Due: 5 Nov 2026',
    icon: 'ri-file-list-3-line',
    tone: 'orange',
    route: '/student/assessments',
    queryParams: { assessmentId: 'whole-numbers-quiz' },
  },
  {
    id: 'whole-numbers-worksheet',
    title: 'Worksheet Submission',
    dueLabel: 'Due: 6 Nov 2026',
    icon: 'ri-file-text-line',
    tone: 'orange',
    route: '/student/worksheets',
    queryParams: { worksheetId: 'whole-numbers-worksheet' },
  },
  {
    id: 'market-price-comparison',
    title: 'Portfolio Task: Market Price Comparison',
    dueLabel: 'Due: 9 Nov 2026',
    icon: 'ri-file-paper-2-line',
    tone: 'blue',
    route: '/student/portfolio-tasks',
    queryParams: { taskId: 'market-price-comparison' },
  },
];
