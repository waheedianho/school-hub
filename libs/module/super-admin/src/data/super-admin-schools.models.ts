export type SchoolType = 'International' | 'Public' | 'Private';

export type SchoolSubscriptionPlan = 'Enterprise' | 'Pro' | 'Basic' | 'Trial';

export type SchoolStatus =
  | 'Active'
  | 'Trial'
  | 'Expiring Soon'
  | 'Setup Incomplete'
  | 'Suspended';

export type OnboardingStatus =
  | 'Completed'
  | 'In Progress'
  | 'Pending Verification'
  | 'Incomplete';

export interface SchoolInstitution {
  id: string;
  name: string;
  code: string;
  domain: string;
  initials: string;
  type: SchoolType;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  location: string;
  country: string;
  stateRegion: string;
  learnersCount: number;
  teachersCount: number;
  plan: SchoolSubscriptionPlan;
  status: SchoolStatus;
  onboardingStatus: OnboardingStatus;
  lastActivity: string;
  createdAt: string;
  brandColor: string;
  academicSession: string;
  currentTerm: string;
  curriculumType: string;
  parentConsentRequired: boolean;
  tutorVerificationRequired: boolean;
  enabledModules: string[];
}

export interface SchoolsMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  changeText: string;
  trend: 'up' | 'down';
  icon: string;
  tone: 'primary' | 'success' | 'purple' | 'warning' | 'danger' | 'info';
}

export interface OnboardingBreakdown {
  completedCount: number;
  completedPercent: number;
  inProgressCount: number;
  inProgressPercent: number;
  pendingVerificationCount: number;
  pendingVerificationPercent: number;
  incompleteCount: number;
  incompletePercent: number;
  totalInstitutions: number;
}

export interface InstitutionActivity {
  id: string;
  schoolName: string;
  action: string;
  timeAgo: string;
  icon: string;
}

export interface SchoolNeedingAttention {
  id: string;
  count: number;
  label: string;
  tone: 'warning' | 'info' | 'danger' | 'primary';
}

export interface OnboardSchoolFormData {
  // 1. Institution Details
  schoolName: string;
  schoolType: SchoolType;
  schoolCode: string;
  country: string;
  stateRegion: string;
  schoolEmail: string;
  schoolPhone: string;
  website: string;
  address: string;
  primaryBrandColor: string;

  // 2. School Admin Account
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPhone: string;
  temporaryPassword?: string;
  sendInvite: boolean;

  // 3. Academic Setup
  namingConvention: string;
  academicSession: string;
  currentTerm: string;
  classLevelsOffered: string[];
  curriculumType: string;
  defaultReportCardTemplate: string;

  // 4. Subscription & Access
  plan: SchoolSubscriptionPlan;
  startDate: string;
  renewalDate: string;
  learnerLimit: number;
  teacherLimit: number;
  enabledModules: string[];

  // 5. Safeguarding & Compliance
  parentConsentRequired: boolean;
  tutorVerificationRequired: boolean;
  mediaUploadPermissions: string;
  communicationVisibility: string;
  dataRetentionPolicy: string;
}
