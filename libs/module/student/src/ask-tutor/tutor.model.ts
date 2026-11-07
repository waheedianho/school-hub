import { LearnerSubjectId } from '../data/subject-catalog.data';

export interface TutorContextRef {
  type: string;
  id?: string;
  questionId?: string;
}
export interface TutorContext extends TutorContextRef {
  title: string;
  subjectId: LearnerSubjectId;
  description?: string;
  route: string;
  query?: Record<string, string>;
}
export interface TutorFile {
  id: string;
  name: string;
  size: number;
  type: string;
  blob: Blob;
}
export interface TutorMessage {
  id: string;
  text: string;
  at: number;
  files: readonly TutorFile[];
}
export interface TutorDraft {
  key: string;
  text: string;
  files: readonly TutorFile[];
}
export interface TutorQuestion {
  id: string;
  subjectId: LearnerSubjectId;
  title: string;
  createdAt: number;
  sampleId?: string;
  context?: TutorContextRef;
  messages: readonly TutorMessage[];
}
export interface TutorState {
  questions: readonly TutorQuestion[];
  drafts: readonly TutorDraft[];
  ratings: Readonly<Record<string, 'helpful' | 'unhelpful'>>;
}
export interface TutorSample {
  id: string;
  subjectId: LearnerSubjectId;
  title: string;
  context: TutorContextRef;
  messages: readonly {
    id: string;
    role: 'tutor' | 'you';
    text: string;
    at: number;
  }[];
}
