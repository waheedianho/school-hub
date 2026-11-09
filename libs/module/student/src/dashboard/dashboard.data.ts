import { SubjectCardData, UiTone } from '@school-hub/ui-elements';
import { LEARNER_SUBJECT_OVERVIEWS } from '../data/subject-progress.data';
import { LEARNER_WORKSHEETS } from '../worksheets/worksheets.data';
import { LEARNER_PORTFOLIO_TASKS } from '../portfolio/portfolio.data';
import {
  COMMON_LEARNING_MISTAKE,
  CURRENT_LESSON,
  LEARNER_TUTOR_NOTE,
  LEARNER_PROFILE,
  PENDING_LESSON_TASKS,
} from '../data/learning-context.data';

/** Design fixtures. Replace with the learner API when it is available. */
export const LEARNER_DASHBOARD = {
  learner: LEARNER_PROFILE,
  lesson: CURRENT_LESSON,
  weakAreas: [
    { id: 'place-value', label: 'Place Value' },
    { id: 'number-ordering', label: 'Number Ordering' },
    { id: 'comparing-numbers', label: 'Greater Than / Less Than' },
  ],
  portfolio: {
    id: 'market-price-comparison',
    title: 'Market Price Comparison',
    status: 'Pending',
    dueDate: '9 November 2026',
  },
  liveClass: {
    id: 'whole-numbers-live',
    title: 'Mathematics Live Class',
    date: 'Thursday, 5 November 2026',
    time: '4:00 PM',
  },
  quiz: {
    id: 'whole-numbers-quiz',
    score: 7,
    total: 10,
    mastery: 'Developing',
  },
  feedback: LEARNER_TUTOR_NOTE,
  commonMistake: COMMON_LEARNING_MISTAKE,
  recommendation:
    'Practise reading and writing large numbers before taking the quiz again.',
};

export const DASHBOARD_TASKS = PENDING_LESSON_TASKS;

interface ProgressMetric {
  id: string;
  title: string;
  value: string;
  percentage: number;
  detail: string;
  icon: string;
  tone: UiTone;
}

const completedWorksheets = LEARNER_WORKSHEETS.filter(
  (worksheet) => worksheet.status === 'completed',
).length;
const worksheetCompletion = Math.round(
  (completedWorksheets / LEARNER_WORKSHEETS.length) * 100,
);
const handedInPortfolio = LEARNER_PORTFOLIO_TASKS.filter((task) =>
  ['submitted', 'completed'].includes(task.status),
).length;
const portfolioCompletion = Math.round(
  (handedInPortfolio / LEARNER_PORTFOLIO_TASKS.length) * 100,
);

export const DASHBOARD_PROGRESS: ProgressMetric[] = [
  {
    id: 'lessons',
    title: 'Lessons Completed',
    value: '16 / 20',
    percentage: 80,
    detail: '80% completed',
    icon: 'ri-book-open-line',
    tone: 'blue',
  },
  {
    id: 'quizzes',
    title: 'Quiz Average',
    value: '70%',
    percentage: 70,
    detail: 'Developing',
    icon: 'ri-trophy-line',
    tone: 'purple',
  },
  {
    id: 'worksheets',
    title: 'Worksheet Completion',
    value: `${worksheetCompletion}%`,
    percentage: worksheetCompletion,
    detail: `${completedWorksheets} / ${LEARNER_WORKSHEETS.length} completed`,
    icon: 'ri-file-text-line',
    tone: 'green',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Completion',
    value: `${portfolioCompletion}%`,
    percentage: portfolioCompletion,
    detail: `${handedInPortfolio} / ${LEARNER_PORTFOLIO_TASKS.length} handed in`,
    icon: 'ri-folder-open-line',
    tone: 'orange',
  },
];

export const RECENT_SUBJECTS: SubjectCardData[] = LEARNER_SUBJECT_OVERVIEWS.map(
  (overview) => overview.card,
);
