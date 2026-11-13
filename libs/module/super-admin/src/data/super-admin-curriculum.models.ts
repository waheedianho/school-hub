export type CurriculumStatus =
  | 'Approved'
  | 'Pending Review'
  | 'Needs Update'
  | 'Draft';

export type CurriculumTab = 'packs' | 'review' | 'library' | 'templates';

export interface CurriculumPack {
  id: string;
  name: string;
  classLevel: string;
  subject: string;
  term: string;
  topicsCount: number;
  completionPercentage: number;
  status: CurriculumStatus;
  version: string;
  lastUpdated: string;
  author: string;
  curriculumType: string;
  academicSession?: string;
  description?: string;
  includedAssetsCount?: number;
  componentsCount?: string;
  standardsCoverage?: number;
}

export interface CurriculumMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  tone: 'primary' | 'success' | 'warning' | 'purple' | 'danger' | 'info';
  icon: string;
  description?: string;
}

export interface ContentHealthSegment {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ContentHealthOverview {
  approved: ContentHealthSegment;
  pendingReview: ContentHealthSegment;
  draft: ContentHealthSegment;
  missingAssets: ContentHealthSegment;
  totalPacks: number;
}

export interface ReviewQueueCategory {
  label: string;
  count: number;
  icon: string;
  tone: 'danger' | 'warning' | 'primary' | 'purple';
}

export interface ReviewQueueSummary {
  highPriority: number;
  awaitingAcademicReview: number;
  awaitingMediaUpload: number;
  requiresFixes: number;
  total: number;
}

export interface ContentActivity {
  id: string;
  packName: string;
  action: string;
  timeAgo: string;
  type: 'approved' | 'uploaded' | 'revision' | 'updated';
  icon: string;
}

export interface StandardsCoverageSummary {
  coveragePercentage: number;
  change: string;
  trend: 'up' | 'down';
}

export interface CurriculumFilterState {
  search: string;
  curriculumType: string;
  classLevel: string;
  term: string;
  status: string;
}

export interface WeeklyTopicPlan {
  id: string;
  week: number;
  weekLabel: string;
  topic: string;
  learningObjective: string;
  status: 'Draft' | 'Approved' | 'Review';
}

export interface ContentComponentItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  checked: boolean;
}

export interface CreateCurriculumPackData {
  packName: string;
  curriculumType: string;
  classLevel: string;
  subject: string;
  term: string;
  academicSession: string;
  version: string;
  curriculumSource: string;
  description: string;
  weeklyTopics: WeeklyTopicPlan[];
  contentComponents: string[];
  approvalWorkflow: string;
  assignedTemplate: string;
  schoolsAccess: string;
  subscriptionTier: string;
  publishStatus: string;
}

export interface ReviewQueueItem {
  id: string;
  packName: string;
  classLevel: string;
  subject: string;
  term: string;
  submittedBy: string;
  submittedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category:
    | 'Academic Review'
    | 'Media Assets'
    | 'Revision Required'
    | 'Compliance';
  status: 'Awaiting Review' | 'Under Review' | 'Revision Requested';
  slaHoursLeft: number;
  version: string;
}

export interface ContentLibraryAsset {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  term: string;
  type:
    | 'Lesson Notes'
    | 'Tutor Guide'
    | 'Video Lesson'
    | 'Worksheet'
    | 'Question Bank'
    | 'Assessment';
  format: string;
  size: string;
  usageCount: number;
  status: 'Approved' | 'Needs Update' | 'In Review';
  lastModified: string;
}

export interface CurriculumTemplate {
  id: string;
  title: string;
  framework: string;
  level: string;
  subjectsCount: number;
  version: string;
  complianceScore: number;
  lastUpdated: string;
  description: string;
}
