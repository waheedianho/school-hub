import { ActivityListItem, ScoreItem, UiTone } from '@school-hub/ui-elements';
import {
  AssessmentResult,
  LearnerAssessment,
} from '../assessments/assessment.model';
import { LearnerLesson } from '../lessons/lessons.data';
import { WorksheetRecord } from '../worksheets/worksheet.model';
import { PortfolioRecord } from '../portfolio/portfolio.model';
import { FeedbackRecord } from '../feedback/feedback.model';
import { LearnerSubject } from '../data/subject-catalog.data';

export type ProgressArea =
  | 'all'
  | 'lessons'
  | 'quizzes'
  | 'worksheets'
  | 'portfolio';
export interface ProgressScope {
  lessons: readonly LearnerLesson[];
  assessments: readonly LearnerAssessment[];
  results: readonly AssessmentResult[];
  worksheets: readonly WorksheetRecord[];
  portfolios: readonly PortfolioRecord[];
  feedback: readonly FeedbackRecord[];
}
export interface ProgressSubject {
  subject: LearnerSubject;
  topic?: LearnerLesson;
  lessonProgress: number;
  lessonsCompleted: number;
  lessonCount: number;
  quizScore?: number;
  worksheetsCompleted: number;
  worksheetCount: number;
  mastery: { label: string; tone: UiTone };
}
export interface ProgressTopic extends ScoreItem {
  subjectId: string;
  evidenceCount: number;
}
export interface ProgressActivity extends ActivityListItem {
  area: Exclude<ProgressArea, 'all'>;
  date: string;
}
export interface ProgressStep extends ActivityListItem {
  area: Exclude<ProgressArea, 'all'>;
}
