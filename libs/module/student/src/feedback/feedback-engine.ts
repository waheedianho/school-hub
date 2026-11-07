import {
  AssessmentResult,
  LearnerAssessment,
} from '../assessments/assessment.model';
import {
  COMMON_LEARNING_MISTAKE,
  LEARNER_TUTOR_NOTE,
} from '../data/learning-context.data';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { PortfolioRecord } from '../portfolio/portfolio.model';
import { PORTFOLIO_RUBRIC } from '../portfolio/portfolio.data';
import { portfolioScore } from '../portfolio/portfolio-engine';
import { WorksheetRecord } from '../worksheets/worksheet.model';
import { isWrittenAnswerCorrect } from '../worksheets/worksheet-engine';
import { FeedbackEntry, FeedbackRecord } from './feedback.model';

const TUTORS: Record<string, string> = {
  mathematics: 'Mr. Adewale',
  'english-language': 'Mrs. Bello',
  'basic-science': 'Mrs. Bolanle A.',
};
function guidance(subjectId: string, score: number) {
  const focus =
    subjectId === 'mathematics'
      ? 'Check each place value, show your working, and review your calculations.'
      : subjectId === 'english-language'
        ? 'Check the meaning of each word and explain your answers in a clear sentence.'
        : 'Use examples from the lesson and check that your scientific terms are accurate.';
  return {
    strengths: [
      score >= 70
        ? 'Your recorded score shows a good understanding of many of the ideas.'
        : 'You have completed the activity and identified useful areas to practise.',
    ],
    improvements: [focus],
    commonError: score < 70 ? focus : undefined,
    comment:
      score >= 85
        ? 'Well done. Keep explaining your thinking clearly and applying what you have learned.'
        : 'Keep building your understanding. Review the explanations and practise the ideas you found challenging.',
    nextSteps: [
      'Review your marked work and the related lesson.',
      'Use the available practice activity to check your understanding.',
    ],
  };
}
export function quizFeedback(
  result: AssessmentResult,
  assessment: LearnerAssessment,
): FeedbackEntry {
  const currentNote = result.id === 'sample-whole-numbers-quiz';
  const practice = result.source === 'practice';
  const correct = assessment.questions.flatMap((question, index) =>
    result.answers?.[index] === question.correctIndex ? [index] : [],
  );
  const firstIncorrect = result.answers
    ? assessment.questions.findIndex(
        (question, index) => result.answers?.[index] !== question.correctIndex,
      )
    : -1;
  const detailed = !!result.answers && !!assessment.questions.length;
  const base = guidance(assessment.subjectId, result.percentage);
  return {
    id: currentNote ? LEARNER_TUTOR_NOTE.id : `feedback-${result.id}`,
    kind: 'quiz',
    activityId: assessment.id,
    title: currentNote ? 'Whole Numbers Quiz' : assessment.title,
    subjectId: assessment.subjectId,
    subject: assessment.subject,
    lessonId: assessment.lessonId,
    topicId: assessment.topicId,
    topic: assessment.topic,
    term: assessment.term,
    date: result.date,
    score: result.percentage,
    author: practice
      ? 'Practice Review'
      : (TUTORS[assessment.subjectId] ?? 'Sample Tutor'),
    authorRole: practice
      ? 'Automatic answer review'
      : `${assessment.subject} Tutor`,
    source: practice ? 'practice' : 'tutor-sample',
    initialReviewed: !practice && !currentNote && result.percentage >= 70,
    ...base,
    strengths: detailed
      ? [
          `You answered ${correct.length} of ${assessment.questions.length} questions correctly.`,
          ...(correct.length
            ? [
                'Use the answer explanations to build on the questions you got right.',
              ]
            : []),
        ]
      : base.strengths,
    improvements:
      detailed && firstIncorrect >= 0
        ? [
            `Question ${firstIncorrect + 1}: ${assessment.questions[firstIncorrect].explanation}`,
            base.improvements[0],
          ]
        : detailed
          ? ['Keep your skills fresh by applying them to a different example.']
          : base.improvements,
    commonError: currentNote
      ? COMMON_LEARNING_MISTAKE
      : detailed && firstIncorrect >= 0
        ? `Review question ${firstIncorrect + 1}: ${assessment.questions[firstIncorrect].prompt}`
        : base.commonError,
    errorTitle: practice ? 'Answer to Review' : undefined,
    comment: currentNote
      ? LEARNER_TUTOR_NOTE.message
      : practice
        ? `Your practice attempt scored ${result.percentage}%. ${result.expired ? 'Time ran out and your saved answers were submitted automatically. ' : ''}${detailed && firstIncorrect < 0 ? 'Every answer was correct.' : 'Review the explanations for incorrect or unanswered questions.'}`
        : base.comment,
    work: {
      route: ['/student/assessments', assessment.id, 'results', result.id],
      label: detailed ? 'View Answer Review' : 'View Score Summary',
      description: detailed
        ? 'See your choices and the answer explanations.'
        : 'Question-level review is not available for this sample record.',
    },
  };
}
export function worksheetFeedback(
  record: WorksheetRecord,
): FeedbackEntry | undefined {
  if (record.status !== 'completed' || !record.submittedAt) return undefined;
  const practice = record.samplePercentage === undefined;
  const score = record.percentage ?? 0;
  const base = guidance(record.subjectId, score);
  const wrong = record.questions.findIndex(
    (question, index) =>
      !isWrittenAnswerCorrect(question, record.answers[index] ?? ''),
  );
  return {
    id: `worksheet-feedback-${record.id}`,
    kind: 'worksheet',
    activityId: record.id,
    title: record.title,
    subjectId: record.subjectId,
    subject: record.subject,
    lessonId: record.lessonId,
    topicId: record.topicId,
    topic: record.topic,
    term: record.term,
    date: record.submittedAt,
    score,
    author: practice
      ? 'Practice Review'
      : (TUTORS[record.subjectId] ?? 'Sample Tutor'),
    authorRole: practice
      ? 'Automatic answer review'
      : `${record.subject} Tutor`,
    source: practice ? 'practice' : 'tutor-sample',
    initialReviewed: !practice && score >= 70,
    ...base,
    strengths:
      record.correct === undefined
        ? base.strengths
        : [
            `You answered ${record.correct} of ${record.questionCount} questions correctly.`,
            'Review your completed answers to see where your understanding is strongest.',
          ],
    improvements: record.questions.length
      ? wrong >= 0
        ? [
            `Question ${wrong + 1}: ${record.questions[wrong].explanation}`,
            base.improvements[0],
          ]
        : [
            'Apply what you learned to another example and keep explaining your working.',
          ]
      : base.improvements,
    commonError: record.questions.length
      ? wrong >= 0
        ? `Check question ${wrong + 1}: ${record.questions[wrong].prompt}`
        : undefined
      : base.commonError,
    errorTitle: record.questions.length ? 'Answer to Review' : undefined,
    comment: practice
      ? `Your submitted practice worksheet scored ${score}%. ${wrong < 0 ? 'All recorded answers were correct.' : 'Use the answer explanations to work through the questions you missed.'}`
      : base.comment,
    work: {
      route: ['/student/worksheets', record.id],
      label: record.questions.length
        ? 'View Marked Work'
        : 'View Score Summary',
      description: record.questions.length
        ? 'Review the submitted answers and explanations.'
        : 'Detailed questions are not available for this sample worksheet.',
    },
  };
}
export function portfolioFeedback(
  record: PortfolioRecord,
): FeedbackEntry | undefined {
  const feedback = record.feedback;
  if (!feedback) return undefined;
  const strengths = PORTFOLIO_RUBRIC.filter(
    (criterion, index) => feedback.scores[index] / criterion.max >= 0.7,
  ).map((criterion) => {
    const index = PORTFOLIO_RUBRIC.findIndex(
      (item) => item.id === criterion.id,
    );
    return `${criterion.title}: ${feedback.scores[index]} / ${criterion.max} marks.`;
  });
  const improvements = PORTFOLIO_RUBRIC.filter(
    (criterion, index) => feedback.scores[index] / criterion.max < 0.7,
  ).map((criterion) => criterion.description);
  const lowest = PORTFOLIO_RUBRIC.map((criterion, index) => ({
    ...criterion,
    score: feedback.scores[index],
  })).sort((a, b) => a.score / a.max - b.score / b.max)[0];
  return {
    id: `portfolio-feedback-${record.id}`,
    kind: 'portfolio',
    activityId: record.id,
    title: record.title,
    subjectId: record.subjectId,
    subject: record.subject,
    lessonId: record.lessonId,
    topicId: record.topicId,
    topic:
      LEARNER_LESSONS.find((lesson) => lesson.id === record.lessonId)?.title ??
      record.title,
    term: record.term,
    date: feedback.date,
    score: portfolioScore(feedback.scores),
    author: feedback.tutor,
    authorRole: `${record.subject} Tutor`,
    source: 'tutor-sample',
    initialReviewed: record.status === 'completed',
    strengths: strengths.length
      ? strengths
      : [
          'You completed an initial submission and received guidance for your next draft.',
        ],
    improvements: improvements.length
      ? improvements
      : ['Use your tutor’s next steps to extend your work.'],
    commonError:
      (portfolioScore(feedback.scores) ?? 100) < 70 && lowest
        ? `The lowest rubric score is ${lowest.title}: ${lowest.score} / ${lowest.max}. Use the tutor comments to guide your revision.`
        : undefined,
    errorTitle: 'Priority to Review',
    comment: feedback.comment,
    nextSteps: feedback.nextSteps,
    earlierVersion:
      record.status === 'submitted'
        ? Math.max(1, (record.submission?.version ?? 2) - 1)
        : undefined,
    work: {
      route: ['/student/portfolio-tasks', record.id],
      query: { tab: 'feedback' },
      label: 'View Reviewed Submission',
      description: 'Open the tutor comments, rubric, and submitted work.',
    },
  };
}
export function feedbackAverage(
  entries: readonly FeedbackEntry[],
): number | undefined {
  const scores = entries.flatMap((entry) =>
    entry.score === undefined ? [] : [entry.score],
  );
  return scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : undefined;
}
export function feedbackFocusAreas(entries: readonly FeedbackEntry[]) {
  const groups = new Map<
    string,
    {
      id: string;
      title: string;
      subjectId: string;
      topicId: string;
      scores: number[];
    }
  >();
  for (const entry of entries) {
    if (entry.score === undefined) continue;
    const id = `${entry.subjectId}:${entry.topicId}`;
    const group = groups.get(id) ?? {
      id,
      title: entry.topic,
      subjectId: entry.subjectId,
      topicId: entry.topicId,
      scores: [],
    };
    group.scores.push(entry.score);
    groups.set(id, group);
  }
  return [...groups.values()]
    .map((group) => ({
      ...group,
      score: Math.round(
        group.scores.reduce((sum, score) => sum + score, 0) /
          group.scores.length,
      ),
    }))
    .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title))
    .slice(0, 4);
}
export function reviewedPercentage(entries: readonly FeedbackRecord[]): number {
  return entries.length
    ? Math.round(
        (entries.filter((entry) => entry.reviewed).length / entries.length) *
          100,
      )
    : 0;
}
