import { LearnerSubjectId } from '../data/subject-catalog.data';

export type AssessmentKind =
  | 'quiz'
  | 'assessment'
  | 'diagnostic'
  | 'topic-test';
export interface QuizQuestion {
  id: string;
  prompt: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
}
export interface LearnerAssessment {
  id: string;
  title: string;
  subjectId: LearnerSubjectId;
  subject: string;
  kind: AssessmentKind;
  term: string;
  week: number;
  topic: string;
  topicId: string;
  lessonId?: string;
  durationMinutes: number;
  questionCount: number;
  totalMarks: number;
  maxAttempts: number;
  passingPercentage: number;
  available: boolean;
  scheduled: boolean;
  dueAt: string;
  lockedReason: string;
  questions: readonly QuizQuestion[];
  objectives: readonly string[];
}
export interface AssessmentResult {
  id: string;
  assessmentId: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  date: string;
  answers?: readonly (number | null)[];
  correctCount?: number;
  source: 'sample' | 'practice';
  expired?: boolean;
}
export interface PracticeAttempt {
  id: string;
  assessmentId: string;
  status: 'active' | 'paused' | 'submitted';
  answers: (number | null)[];
  marked: number[];
  currentIndex: number;
  remainingSeconds: number;
  deadline: number | null;
  startedAt: number;
  submittedAt?: number;
  expired?: boolean;
}
