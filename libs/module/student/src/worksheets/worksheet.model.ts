import { UiTone } from '@school-hub/ui-elements';

export type WorksheetStatus = 'completed' | 'in-progress' | 'not-started';
export interface WrittenQuestion {
  id: string;
  section: string;
  prompt: string;
  answer: string;
  alternatives?: readonly string[];
  kind: 'number' | 'text' | 'long';
  explanation: string;
}
export interface LearnerWorksheet {
  id: string;
  title: string;
  topic: string;
  topicId: string;
  subjectId: string;
  subject: string;
  lessonId: string;
  week: number;
  term: string;
  description: string;
  tone: UiTone;
  questions: readonly WrittenQuestion[];
  questionCount: number;
  totalMarks: number;
  durationMinutes: number;
  assigned: boolean;
  available: boolean;
  dueAt: string;
  status: WorksheetStatus;
  initialAnswers: readonly string[];
  initialSeconds: number;
  samplePercentage?: number;
  submittedAt?: string;
}
export interface WorksheetDraft {
  worksheetId: string;
  answers: string[];
  marked: number[];
  currentIndex: number;
  elapsedSeconds: number;
  scratch: string;
  submittedAt?: string;
}
export interface WorksheetRecord extends LearnerWorksheet {
  answers: readonly string[];
  marked: readonly number[];
  currentIndex: number;
  elapsedSeconds: number;
  scratch: string;
  answered: number;
  progress: number;
  percentage?: number;
  marks?: number;
  correct?: number;
}
