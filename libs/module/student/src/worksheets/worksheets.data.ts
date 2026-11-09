import { LEARNER_LESSONS } from '../lessons/lessons.data';
import {
  LearnerWorksheet,
  WorksheetStatus,
  WrittenQuestion,
} from './worksheet.model';
import {
  ENGLISH_WORKSHEET_QUESTIONS,
  OPERATIONS_QUESTIONS,
  PATTERN_QUESTIONS,
  PLACE_VALUE_QUESTIONS,
  SCIENCE_WORKSHEET_QUESTIONS,
  SENTENCE_QUESTIONS,
} from './worksheet-questions.data';

export const WORKSHEET_STATUS = {
  completed: { label: 'Completed', tone: 'green' },
  'in-progress': { label: 'In Progress', tone: 'purple' },
  'not-started': { label: 'Not Started', tone: 'orange' },
} as const;
const BANKS: Record<string, readonly WrittenQuestion[]> = {
  'whole-numbers': OPERATIONS_QUESTIONS,
  'reading-whole-numbers': PLACE_VALUE_QUESTIONS,
  'number-patterns': PATTERN_QUESTIONS,
  'parts-of-speech': ENGLISH_WORKSHEET_QUESTIONS,
  'living-things': SCIENCE_WORKSHEET_QUESTIONS,
  'sentence-types': SENTENCE_QUESTIONS,
};
const ORDER = [
  'reading-whole-numbers',
  'number-patterns',
  'whole-numbers',
  'sentence-types',
  'rounding-numbers',
];

export const LEARNER_WORKSHEETS: readonly LearnerWorksheet[] =
  LEARNER_LESSONS.map((lesson): LearnerWorksheet => {
    const questions = BANKS[lesson.id] ?? [];
    const status: WorksheetStatus =
      lesson.status === 'completed'
        ? 'completed'
        : lesson.status === 'in-progress'
          ? 'in-progress'
          : 'not-started';
    const score =
      lesson.id === 'reading-whole-numbers'
        ? 90
        : lesson.id === 'parts-of-speech'
          ? 80
          : lesson.id === 'living-things'
            ? 80
            : lesson.id === 'number-patterns'
              ? 80
              : lesson.id === 'rounding-numbers'
                ? 60
                : 70;
    const initialAnswers = questions.map((question, index) =>
      status === 'completed'
        ? index < Math.round((questions.length * score) / 100)
          ? question.answer
          : question.kind === 'number' || question.kind === 'long'
            ? '0'
            : 'unsure'
        : lesson.id === 'whole-numbers' && index < 12
          ? question.answer
          : '',
    );
    return {
      id: `${lesson.id}-worksheet`,
      title:
        lesson.id === 'whole-numbers'
          ? 'Operations on Whole Numbers Worksheet'
          : lesson.id === 'reading-whole-numbers'
            ? 'Place Value Worksheet'
            : `${lesson.title} Worksheet`,
      topic:
        lesson.id === 'whole-numbers'
          ? 'Operations on Whole Numbers'
          : lesson.id === 'reading-whole-numbers'
            ? 'Place Value'
            : lesson.title,
      topicId:
        lesson.id === 'reading-whole-numbers' ? 'place-value' : lesson.id,
      subjectId: lesson.subjectId,
      subject: lesson.subject,
      lessonId: lesson.id,
      week: lesson.week,
      term: lesson.term,
      tone: lesson.tone,
      description:
        lesson.id === 'whole-numbers'
          ? 'Practise addition, subtraction, multiplication, and division of whole numbers.'
          : lesson.objective,
      questions,
      questionCount: questions.length || 10,
      totalMarks: questions.length || 10,
      durationMinutes: lesson.id === 'whole-numbers' ? 30 : 20,
      assigned: lesson.status !== 'completed',
      available: lesson.available && !!questions.length,
      dueAt: '2026-11-06T16:00:00+01:00',
      status,
      initialAnswers,
      initialSeconds:
        status === 'completed' ? 900 : status === 'in-progress' ? 872 : 0,
      samplePercentage: status === 'completed' ? score : undefined,
      submittedAt:
        status === 'completed'
          ? `${lesson.completedAt}T12:00:00+01:00`
          : undefined,
    };
  }).sort((a, b) => {
    const rank = (id: string) => {
      const index = ORDER.indexOf(id);
      return index < 0 ? ORDER.length : index;
    };
    return rank(a.lessonId) - rank(b.lessonId);
  });

export function worksheetDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  }).format(new Date(date));
}
export function worksheetTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return minutes >= 60
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : `${minutes}m ${Math.floor(seconds % 60)}s`;
}
