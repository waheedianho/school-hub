import { FilterTab, UiTone } from '@school-hub/ui-elements';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import {
  AssessmentKind,
  AssessmentResult,
  LearnerAssessment,
  QuizQuestion,
} from './assessment.model';
import {
  LIVING_THINGS_QUESTIONS,
  PARTS_OF_SPEECH_QUESTIONS,
  WHOLE_NUMBER_QUESTIONS,
} from './questions.data';

export const ASSESSMENT_KINDS: Record<
  AssessmentKind,
  { label: string; tone: UiTone; icon: string }
> = {
  quiz: { label: 'Quiz', tone: 'purple', icon: 'ri-question-line' },
  assessment: {
    label: 'Assessment',
    tone: 'green',
    icon: 'ri-file-list-3-line',
  },
  diagnostic: {
    label: 'Diagnostic Test',
    tone: 'teal',
    icon: 'ri-stethoscope-line',
  },
  'topic-test': {
    label: 'Topic Test',
    tone: 'red',
    icon: 'ri-file-check-line',
  },
};
export const ASSESSMENT_TABS: FilterTab[] = [
  { id: 'all', label: 'All' },
  { id: 'quiz', label: 'Quizzes' },
  { id: 'assessment', label: 'Assessments' },
  { id: 'diagnostic', label: 'Diagnostic Tests' },
  { id: 'topic-test', label: 'Topic Tests' },
];

const BANKS: Record<string, readonly QuizQuestion[]> = {
  'whole-numbers': WHOLE_NUMBER_QUESTIONS,
  'parts-of-speech': PARTS_OF_SPEECH_QUESTIONS,
  'living-things': LIVING_THINGS_QUESTIONS,
};

export const LEARNER_ASSESSMENTS: readonly LearnerAssessment[] = [
  ...LEARNER_LESSONS.map(
    (lesson): LearnerAssessment => ({
      id: `${lesson.id}-quiz`,
      title:
        lesson.id === 'whole-numbers'
          ? 'Whole Numbers: Place Value'
          : `${lesson.title} – Quiz`,
      subjectId: lesson.subjectId,
      subject: lesson.subject,
      kind: 'quiz',
      term: lesson.term,
      week: lesson.week,
      topic: lesson.title,
      topicId: lesson.id,
      lessonId: lesson.id,
      durationMinutes: 20,
      questionCount: 10,
      totalMarks: 20,
      maxAttempts: 2,
      passingPercentage: 70,
      available: lesson.available && !!BANKS[lesson.id],
      scheduled: lesson.id === 'whole-numbers',
      dueAt: '2026-11-05T16:00:00+01:00',
      lockedReason: !lesson.available
        ? 'This quiz unlocks when its lesson becomes available.'
        : 'New practice questions for this lesson are coming soon.',
      questions: BANKS[lesson.id] ?? [],
      objectives: [
        lesson.objective,
        'Use guided practice to strengthen your understanding.',
      ],
    }),
  ),
  {
    id: 'fractions-diagnostic',
    title: 'Fractions – Diagnostic Assessment',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    kind: 'assessment',
    term: 'first',
    week: 4,
    topic: 'Fractions',
    topicId: 'fractions',
    durationMinutes: 25,
    questionCount: 15,
    totalMarks: 30,
    maxAttempts: 2,
    passingPercentage: 70,
    available: false,
    scheduled: true,
    dueAt: '2026-11-06T16:00:00+01:00',
    lockedReason:
      'This assessment is scheduled for a future lesson. Your tutor will make it available.',
    questions: [],
    objectives: ['Recognise fractions and compare simple fractional amounts.'],
  },
  {
    id: 'whole-numbers-diagnostic',
    title: 'Diagnostic Test: Whole Numbers',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    kind: 'diagnostic',
    term: 'first',
    week: 1,
    topic: 'Whole Numbers',
    topicId: 'whole-numbers',
    lessonId: 'whole-numbers',
    durationMinutes: 25,
    questionCount: 15,
    totalMarks: 30,
    maxAttempts: 2,
    passingPercentage: 70,
    available: false,
    scheduled: false,
    dueAt: '2026-10-25T16:00:00+01:00',
    lockedReason: 'Your tutor will make the next diagnostic test available.',
    questions: [],
    objectives: ['Identify strengths and areas to revise in whole numbers.'],
  },
  {
    id: 'place-value-topic',
    title: 'Place Value – Topic Test',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    kind: 'topic-test',
    term: 'first',
    week: 4,
    topic: 'Place Value',
    topicId: 'place-value',
    lessonId: 'whole-numbers',
    durationMinutes: 20,
    questionCount: 10,
    totalMarks: 25,
    maxAttempts: 2,
    passingPercentage: 70,
    available: false,
    scheduled: true,
    dueAt: '2026-11-09T16:00:00+01:00',
    lockedReason:
      'This topic test is upcoming. Your tutor will make it available.',
    questions: WHOLE_NUMBER_QUESTIONS,
    objectives: ['Identify digit values and use expanded notation.'],
  },
];

function sampleAnswers(
  questions: readonly QuizQuestion[],
  correctCount: number,
): number[] {
  return questions.map((question, index) =>
    index < correctCount
      ? question.correctIndex
      : (question.correctIndex + 1) % question.options.length,
  );
}

export const SAMPLE_ASSESSMENT_RESULTS: readonly AssessmentResult[] = [
  ...LEARNER_LESSONS.filter((lesson) => lesson.status !== 'upcoming').map(
    (lesson): AssessmentResult => {
      const correct =
        (
          {
            'parts-of-speech': 9,
            'living-things': 8,
            'addition-facts': 6,
            'number-patterns': 5,
          } as Record<string, number>
        )[lesson.id] ?? 7;
      const questions = BANKS[lesson.id];
      return {
        id: `sample-${lesson.id}-quiz`,
        assessmentId: `${lesson.id}-quiz`,
        marks: correct * 2,
        totalMarks: 20,
        percentage: correct * 10,
        correctCount: correct,
        date: `${lesson.id === 'whole-numbers' ? '2026-11-04' : (lesson.completedAt ?? '2026-10-30')}T12:00:00+01:00`,
        answers: questions ? sampleAnswers(questions, correct) : undefined,
        source: 'sample',
      };
    },
  ),
  {
    id: 'sample-diagnostic',
    assessmentId: 'whole-numbers-diagnostic',
    marks: 21,
    totalMarks: 30,
    percentage: 70,
    date: '2026-10-25T12:00:00+01:00',
    source: 'sample',
  },
  {
    id: 'sample-place-value',
    assessmentId: 'place-value-topic',
    marks: 23,
    totalMarks: 25,
    percentage: 92,
    date: '2026-10-23T12:00:00+01:00',
    source: 'sample',
  },
];

export function resultPerformance(percentage: number): {
  label: string;
  tone: UiTone;
} {
  return percentage >= 85
    ? { label: 'Excellent', tone: 'green' }
    : percentage >= 70
      ? { label: 'Good', tone: 'green' }
      : percentage >= 50
        ? { label: 'Fair', tone: 'orange' }
        : { label: 'Needs Practice', tone: 'red' };
}

export function assessmentDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  }).format(new Date(date));
}
