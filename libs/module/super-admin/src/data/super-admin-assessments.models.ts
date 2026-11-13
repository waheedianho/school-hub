export type AssessmentStatus =
  | 'Approved'
  | 'Pending Review'
  | 'Needs Update'
  | 'Draft';

export type AssessmentType =
  | 'Quiz'
  | 'Topic Test'
  | 'Assessment'
  | 'Term Assessment'
  | 'Practical Test'
  | 'Mock Exam';

export type AssessmentTab = 'packs' | 'questions' | 'review' | 'templates';

export type QuestionType =
  | 'Multiple Choice (MCQ)'
  | 'Short Answer'
  | 'Essay / Theory'
  | 'Word Problems';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export interface AssessmentPack {
  id: string;
  name: string;
  classLevel: string;
  subject: string;
  type: AssessmentType;
  questionsCount: number;
  totalMarks?: number;
  completionPercentage: number;
  status: AssessmentStatus;
  version: string;
  lastUpdated: string;
  author: string;
  term?: string;
  academicSession?: string;
  code?: string;
  durationMins?: number;
  deliveryMode?: string;
  description?: string;
}

export interface AssessmentMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'primary' | 'success' | 'warning' | 'purple' | 'danger' | 'info';
  icon: string;
  description?: string;
}

export interface AssessmentHealthSegment {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AssessmentHealthOverview {
  approved: AssessmentHealthSegment;
  pendingReview: AssessmentHealthSegment;
  draft: AssessmentHealthSegment;
  needsUpdate: AssessmentHealthSegment;
  totalPacks: number;
}

export interface AssessmentReviewQueueSummary {
  pendingReview: number;
  revisionsRequested: number;
  qualityCheck: number;
  awaitingApproval: number;
  total: number;
}

export interface AssessmentActivity {
  id: string;
  packName: string;
  action: string;
  timeAgo: string;
  type: 'approved' | 'draft' | 'flagged' | 'updated';
  icon: string;
}

export interface AssessmentFilterState {
  search: string;
  subject: string;
  classLevel: string;
  term: string;
  assessmentType: string;
  status: string;
}

export interface QuestionCompositionItem {
  type: QuestionType;
  count: number;
  marksPerItem: number;
  totalMarks: number;
  source: 'Question Bank' | 'Mixed' | 'Manual';
  icon: string;
}

export interface QuestionBankItem {
  id: string;
  code: string;
  questionText: string;
  subject: string;
  classLevel: string;
  topic: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  marks: number;
  autoMarkable: boolean;
  status: 'Approved' | 'In Review' | 'Flagged' | 'Draft';
  usageCount: number;
  lastModified: string;
  misconceptionTag?: string;
}

export interface AssessmentReviewQueueItem {
  id: string;
  packName: string;
  classLevel: string;
  subject: string;
  submittedBy: string;
  submittedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Quality Check' | 'Revisions' | 'Approval' | 'Moderation';
  status:
    | 'Pending Review'
    | 'Revisions Requested'
    | 'Under Review'
    | 'Awaiting Approval';
  slaDaysLeft: number;
  version: string;
}

export interface AssessmentTemplate {
  id: string;
  title: string;
  standard: string;
  level: string;
  assessmentType: AssessmentType;
  durationMins: number;
  totalMarks: number;
  complianceScore: number;
  lastUpdated: string;
  description: string;
}

export interface CreateAssessmentData {
  assessmentName: string;
  assessmentType: AssessmentType;
  classLevel: string;
  subject: string;
  term: string;
  academicSession: string;
  version: string;
  assessmentCode: string;
  description: string;
  targetInstitutions: string;
  durationMins: number;
  totalMarks: number;
  numberOfQuestions: number;
  deliveryMode: string;
  attemptLimit: string;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  availabilityDate: string;
  dueDate: string;
  compositions: QuestionCompositionItem[];
  passingThreshold: number;
  gradeScaleTemplate: string;
  reviewSla: string;
  moderationRequired: boolean;
  feedbackRelease: string;
  publishStatus: 'Draft' | 'Submit for Review' | 'Publish';
}
