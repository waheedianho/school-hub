import { UiTone } from '@school-hub/ui-elements';

export type PortfolioStatus =
  | 'not-started'
  | 'in-progress'
  | 'submitted'
  | 'completed'
  | 'needs-revision';
export interface PortfolioFeedback {
  tutor: string;
  date: string;
  comment: string;
  nextSteps: readonly string[];
  scores: readonly number[];
}
export interface PortfolioSubmission {
  id: string;
  submittedAt: string;
  version: number;
  note: string;
  snapshot?: {
    work: string;
    reflection: string;
    planning: string;
    fileNames: readonly string[];
  };
}
export interface PortfolioWork {
  planning: string;
  work: string;
  reflection: string;
  readBrief: boolean;
  reviewed: boolean;
}
export interface PortfolioTask {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subject: string;
  lessonId: string;
  topicId: string;
  week: number;
  term: string;
  tone: UiTone;
  icon: string;
  available: boolean;
  status: PortfolioStatus;
  dueAt: string;
  startedAt: string;
  updatedAt: string;
  secondsSpent: number;
  brief: string;
  connection: string;
  steps: readonly string[];
  tips: readonly string[];
  successCriteria: readonly string[];
  skills: readonly string[];
  initialWork: PortfolioWork;
  submission?: PortfolioSubmission;
  feedback?: PortfolioFeedback;
}
export interface PortfolioFile {
  id: string;
  name: string;
  size: number;
  type: string;
  addedAt: string;
  blob: Blob;
}
export interface PortfolioDraft extends PortfolioWork {
  taskId: string;
  files: PortfolioFile[];
  note: string;
  updatedAt: string;
  startedAt: string;
  secondsSpent: number;
  submission?: PortfolioSubmission;
}
export interface PortfolioRecord extends PortfolioTask, PortfolioWork {
  files: readonly PortfolioFile[];
  note: string;
  progress: number;
  score?: number;
  submission?: PortfolioSubmission;
}
