import { LearnerSubjectId } from './subject-catalog.data';
export interface LearnerIdentity {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}
export type LearnerGoalMetric =
  | 'quiz-average'
  | 'lessons'
  | 'worksheets'
  | 'portfolio';
export interface LearnerGoal {
  id: string;
  metric: LearnerGoalMetric;
  subjectId: LearnerSubjectId | '';
  target: number;
}
export interface LearnerProfileState {
  identity: LearnerIdentity;
  goals: readonly LearnerGoal[];
  preferences: { wifiOnly: boolean };
}
export type IdentityErrors = Partial<Record<keyof LearnerIdentity, string>>;
