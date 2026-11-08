/**
 * School Admin Domain Models
 * Aligned with the product designs in .design/SCHOOL ADMIN/
 */

export interface AcademicTerm {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface AcademicSession {
  id: string;
  name: string;
  isActive: boolean;
  terms: AcademicTerm[];
}

export interface SchoolAdminMetric {
  id: string;
  label: string;
  value: number | string;
  subValue?: string;
  changeText: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'purple' | 'green' | 'blue' | 'yellow' | 'pink' | 'teal';
  icon: string;
  sparkline: number[];
}

export interface ClassPerformanceItem {
  form: string;
  average: number;
  schoolAverage: number;
}

export interface AcademicPerformanceOverview {
  term: string;
  schoolAverage: number;
  classAverages: ClassPerformanceItem[];
}

export interface CurriculumCoverage {
  term: string;
  overallPercentage: number;
  onTrackCount: number;
  onTrackPercentage: number;
  behindCount: number;
  behindPercentage: number;
  atRiskCount: number;
  atRiskPercentage: number;
  totalClasses: number;
}

export interface TopPerformingSubject {
  id: string;
  name: string;
  averageScore: number;
  icon: string;
  colorClass: string;
}

export interface SchoolAlert {
  id: string;
  title: string;
  description: string;
  count: number;
  severity: 'critical' | 'warning' | 'info';
  icon: string;
  route: string;
}

export interface TeacherActivityMetric {
  id: string;
  label: string;
  completed: number;
  total: number;
  percentage?: number;
  isCountOnly?: boolean;
  icon: string;
  tone: 'teal' | 'purple' | 'amber' | 'green' | 'blue';
}

export interface UpcomingSchoolEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  dateRange: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  tone: 'green' | 'blue' | 'purple';
}

export interface SafeguardingNotice {
  message: string;
  reportLinkText: string;
  reportLinkUrl: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  level: 'Primary' | 'JSS' | 'SS';
  arm: string;
  classTeacher: string;
  room: string;
  learnersCount: number;
  activeEnrollments: number;
  capacity: number;
  averageScore: number;
  attendanceRate: number;
  currentTopic: string;
  topicProgress: number;
  learnersBelowMastery: number;
  attendanceConcerns?: number;
  interventionsCount?: number;
}

export interface LearnerRecord {
  id: string;
  name: string;
  admissionNo: string;
  classId: string;
  className: string;
  gender: 'Male' | 'Female';
  attendanceRate: number;
  averageScore: number;
  currentStatus: 'Active' | 'At Risk' | 'Inactive' | 'On Leave';
  interventionFlag: boolean;
  initials?: string;
  avatarColor?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
}

export interface ClassesOverviewMetrics {
  totalClasses: number;
  totalClassesChange: string;
  totalLearners: number;
  totalLearnersChange: string;
  activeEnrollments: number;
  activeEnrollmentsPercentage: number;
  averageClassSize: number;
  averageClassSizeChange: string;
}

export interface NewLearnerFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  admissionNumber: string;
  classLevel: string;
  arm: string;
  admissionDate: string;
  enrollmentStatus: 'Active' | 'Pending' | 'Inactive';
  houseGroup?: string;
  previousSchool?: string;
  username: string;
  temporaryPassword?: string;
  loginMethod: string;
  accountActive: boolean;
  parentName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail?: string;
  parentWhatsApp?: string;
  homeAddress: string;
  emergencyContact: string;
  guardianAccountActive: boolean;
  medicalNotes?: string;
  supportNeeds?: string;
  transportMode: string;
  remarks?: string;
  parentConsentConfirmed: boolean;
  mediaConsent: boolean;
  dataPrivacyAcknowledged: boolean;
  communicationPreference: string;
}

export interface StaffMember {
  id: string;
  name: string;
  staffId: string;
  avatarUrl?: string;
  role: string;
  department: string;
  assignedSubjects: string[];
  assignedClasses: string[];
  attendanceRate: number;
  attendanceRating: 'Excellent' | 'Good' | 'Average' | 'Needs Attention';
  feedbackCompletionRate: number;
  status: 'Active' | 'On Leave' | 'Suspended';
  activeLessonsCount: number;
  pendingReviewsCount: number;
}

export interface InterventionCase {
  id: string;
  learnerId: string;
  learnerName: string;
  admissionNo: string;
  className: string;
  concernArea: string;
  interventionType: string;
  assignedStaff: string;
  assignedStaffRole: string;
  status: 'In Progress' | 'Under Review' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  nextReviewDate: string;
  progress: number;
}

export interface SchoolProfile {
  name: string;
  schoolType: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  logoUrl: string;
  primaryColor: string;
  setupCompletionPercentage: number;
  activeSession: string;
  activeTerm: string;
  totalClasses: number;
  totalTeachers: number;
  gradingScale: string;
}

export interface AcademicStructure {
  session: string;
  term: string;
  namingConvention: string;
  classArms: number;
  startDate: string;
  endDate: string;
  primaryCount: number;
  jssCount: number;
  ssCount: number;
}

export interface AssessmentReportingSettings {
  gradingScale: string;
  classworkWeight: number;
  assessmentsWeight: number;
  examsWeight: number;
  reportCardFormat: string;
  parentReportFrequency: string;
  scoreApprovalWorkflow: boolean;
}

export interface RolePermissionRow {
  role: string;
  contentApproval: boolean;
  gradeApproval: boolean;
  communicationVisibility: boolean;
  auditLogs: boolean;
}

export interface CommunicationSafeguardingSettings {
  parentCommunicationPreference: string;
  announcementEmail: boolean;
  announcementSms: boolean;
  announcementApp: boolean;
  learnerCommunicationLogging: boolean;
  safeguardingContact: string;
  parentalConsentRequired: boolean;
  mediaConsentRequired: boolean;
}

export interface SetupChecklistItem {
  id: string;
  label: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export interface SetupQuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionText: string;
  route?: string;
}
