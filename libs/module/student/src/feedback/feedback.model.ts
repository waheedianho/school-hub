import { Params } from '@angular/router';

export type FeedbackKind = 'quiz' | 'worksheet' | 'portfolio';
export interface FeedbackLink {
  route: string | readonly string[];
  query?: Params;
  label: string;
  description: string;
}
export interface FeedbackEntry {
  id: string;
  kind: FeedbackKind;
  activityId: string;
  title: string;
  subjectId: string;
  subject: string;
  lessonId?: string;
  topicId: string;
  topic: string;
  term: string;
  date: string;
  score?: number;
  author: string;
  authorRole: string;
  source: 'tutor-sample' | 'practice';
  initialReviewed: boolean;
  strengths: readonly string[];
  improvements: readonly string[];
  commonError?: string;
  errorTitle?: string;
  comment: string;
  nextSteps: readonly string[];
  earlierVersion?: number;
  work: FeedbackLink;
}
export interface FeedbackRecord extends FeedbackEntry {
  reviewed: boolean;
}
