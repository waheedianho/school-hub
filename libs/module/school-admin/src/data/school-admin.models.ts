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
  initials?: string;
  avatarColor?: string;
  role: string;
  department: string;
  assignedSubjects: string[];
  assignedClasses: string[];
  attendanceRate: number;
  attendanceRating:
    | 'Excellent'
    | 'Good'
    | 'Average'
    | 'Fair'
    | 'Needs Attention';
  feedbackCompletionRate: number;
  status: 'Active' | 'On Leave' | 'Pending Assignment' | 'Suspended';
  activeLessonsCount: number;
  pendingReviewsCount: number;
  avgLearnerPerformance?: number;
  email?: string;
  phone?: string;
  staffType?: 'Academic' | 'Support' | 'Leadership' | 'Specialist';
  qualification?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Probationary';
  dateJoined?: string;
  yearsOfExperience?: string;
  isClassTeacher?: boolean;
  academicLevel?: string;
  reportingLine?: string;
}

export interface TeachersStaffOverviewMetrics {
  totalTeachers: number;
  totalTeachersChange: string;
  supportStaff: number;
  supportStaffChange: string;
  activeStaff: number;
  activeStaffChange: string;
  unassignedTeachers: number;
  unassignedTeachersChange: string;
  avgFeedbackCompletion: number;
  avgFeedbackCompletionChange: string;
}

export interface StaffOperationalAlert {
  id: string;
  title: string;
  count: number;
  actionLabel: string;
  tone: 'amber' | 'red' | 'blue';
  icon: string;
}

export interface NewStaffFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  staffId: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  avatarUrl?: string;
  staffType: string;
  department: string;
  qualification: string;
  employmentType: string;
  dateJoined: string;
  yearsOfExperience: string;
  role: string;
  isClassTeacher: boolean;
  assignedClasses: string[];
  assignedSubjects: string[];
  academicLevel: string;
  reportingLine: string;
  username: string;
  temporaryPassword?: string;
  loginMethod: string;
  accountActive: boolean;
  contentApproval: boolean;
  gradeApproval: boolean;
  communicationVisibility: boolean;
  auditLogVisibility: boolean;
  parentCommunication: boolean;
  learnerMessageAccess: boolean;
  identityVerified: boolean;
  childSafeguardingTraining: boolean;
  conductPolicyAcknowledged: boolean;
  emergencyContact: string;
  address: string;
  remarks?: string;
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
  status: 'In Progress' | 'Monitoring' | 'Under Review' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  nextReviewDate: string;
  progress: number;
  initials?: string;
  notes?: string;
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

/**
 * Subjects & Curriculum Domain Models
 * Aligned with .design/SCHOOL ADMIN/Subjects & Curriculum (I - VI)
 */

export interface AssignedTeacherSummary {
  name: string;
  avatarUrl?: string;
  initials?: string;
  color?: string;
}

export interface SubjectRecord {
  id: string;
  name: string;
  code: string;
  classLevels: string;
  assignedTeachers: AssignedTeacherSummary[];
  weeklyTopics: number;
  coverage: number;
  status: 'Active' | 'Needs Review' | 'Draft';
  assignedClasses: string[];
  leadTeacher: string;
  termTopicsPlanned: number;
  topicsCompleted: number;
  currentWeek: string;
  currentTopic: string;
  deliveryPackReadiness: number;
  approvalStatus: 'Approved' | 'In Review' | 'Draft';
  icon: string;
  color: string;
}

export interface CurriculumOverviewMetrics {
  totalSubjects: number;
  activeCurriculumMaps: number;
  topicsThisTerm: number;
  coverageRate: number;
  coverageRateChange: string;
  subjectsAwaitingReview: number;
}

export interface CurriculumMapEntry {
  id: string;
  classLevel: string;
  subject: string;
  term: string;
  week: string;
  topic: string;
  curriculumObjective: string;
  assignedTeacher: AssignedTeacherSummary;
  deliveryPack: 'Ready' | 'In Review' | 'Draft' | 'Missing Pack';
  assessment: string;
  portfolioTask: string;
  status: 'Active' | 'Needs Review' | 'Draft' | 'Missing Pack';
}

export interface SchemeOfWorkEntry {
  id: string;
  week: number;
  weekLabel: string;
  topic: string;
  learningObjective: string;
  assignedTeacher: AssignedTeacherSummary;
  resourcesReady: 'Yes' | 'Partial' | 'No';
  assessment: string;
  portfolioTask: string;
  status: 'Approved' | 'Needs Review' | 'In Progress' | 'Draft';
}

export interface SchemeLessonItem {
  id: string;
  lessonNumber: number;
  title: string;
  learningObjective: string;
  teachingMethod: string;
  worksheetName: string;
  readinessStatus: 'Ready' | 'Needs Review' | 'In Progress';
}

export interface WeekSchemeDetail {
  weekNumber: number;
  subject: string;
  classLevel: string;
  status: 'In Progress' | 'Approved' | 'Draft' | 'Needs Review';
  approvalStatus: 'Approved' | 'In Review' | 'Draft';
  topic: string;
  learningObjective: string;
  leadTeacher: string;
  leadTeacherAvatar?: string;
  lessonPeriods: string;
  deliveryPackStatus: 'Ready' | 'In Progress' | 'Draft';
  resourcesStatus: 'Ready' | 'Needs Review' | 'In Progress';
  assessmentPlan: string;
  portfolioTask: string;
  commonMisconceptions: string;
  tutorNotes: string;
  deliveryReadiness: number;
  lessonsCompleted: string;
  assessmentsReady: boolean;
  portfolioTaskReady: boolean;
  lessons: SchemeLessonItem[];
}

export interface WeekResourceItem {
  id: string;
  name: string;
  type:
    | 'Slides'
    | 'Worksheet'
    | 'Tutor Guide'
    | 'Teaching Aid'
    | 'Answer Key'
    | 'Assessment Sheet'
    | 'Portfolio Task'
    | 'Parent Handout'
    | 'Video';
  linkedLesson: string;
  audience: 'Teacher' | 'Learner' | 'Teacher/Learner' | 'Parent';
  format: string;
  status: 'Ready' | 'Needs Review' | 'Draft' | 'Missing';
  lastUpdated: string;
  action: string;
}

export interface TopicDeliveryMaterial {
  material: string;
  description: string;
  status: 'Ready' | 'In Review' | 'Draft' | 'Missing';
}

export interface TopicDeliverySequenceItem {
  lessonNumber: number;
  title: string;
  teachingMethod: string;
  worksheet: string;
  readiness: 'Ready' | 'In Progress' | 'Needs Review';
}

export interface TopicDeliveryPack {
  id: string;
  topic: string;
  classLevel: string;
  subject: string;
  week: string;
  deliveryStatus: string;
  approvalStatus: 'Approved' | 'In Review' | 'Draft';
  curriculumObjective: string;
  learningObjective: string;
  estimatedDuration: string;
  leadTeacher: string;
  readiness: number;
  assessmentReady: boolean;
  portfolioTaskReady: boolean;
  parentSupportSheet: 'Pending' | 'In Review' | 'Ready';
  includedMaterials: TopicDeliveryMaterial[];
  lessonSequence: TopicDeliverySequenceItem[];
}

export interface LessonOversightMetrics {
  activeLessonsThisWeek: number;
  lessonsCompleted: number;
  classesOnTrack: number;
  deliveryPacksReady: number;
  lessonsNeedingReview: number;
}

export interface LessonMonitoringRecord {
  id: string;
  className: string;
  subject: string;
  week: string;
  currentTopic: string;
  assignedTeacher: {
    name: string;
    avatarUrl?: string;
    initials?: string;
  };
  deliveryPackStatus: 'Ready' | 'Needs Review' | 'Missing Pack' | 'Draft';
  lessonReadiness: 'Ready' | 'Needs Review' | 'Missing Pack' | 'Draft';
  deliveryProgress: 'In Progress' | 'Completed' | 'Delayed' | 'Pending';
  lessonStatus: 'In Progress' | 'Completed' | 'Delayed' | 'Pending';
  attendance: number;
  lastUpdated: string;
  notes?: string;
}

export interface LessonReviewRecord {
  id: string;
  className: string;
  subject: string;
  topic: string;
  teacherName: string;
  teacherInitials: string;
  week: string;
  submittedDate: string;
  lessonPeriods: string;
  materialsCount: number;
  reviewStatus:
    | 'Pending Review'
    | 'Under Review'
    | 'Approved'
    | 'Revision Requested';
  teachingMethod: string;
  learningObjectives: string;
}

export interface LessonReadinessAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  affectedClass: string;
  affectedSubject: string;
  teacherName: string;
  dateLogged: string;
  actionLabel: string;
}

export interface OversightSidebarSummary {
  selectedScope: string;
  totalActiveTeachers: number;
  lessonsPublished: number;
  lessonsAwaitingReview: number;
  coverageRate: number;
  attendanceAvg: number;
  totalClassesMonitored: number;
  lessonsOnSchedule: number;
  lessonsDelayed: number;
  averageReadinessScore: number;
  attentionItems: Array<{
    count: number;
    text: string;
    tone: 'red' | 'orange' | 'amber';
  }>;
}

/**
 * ============================================================================
 * Live Classes Oversight Domain Models
 * ============================================================================
 */
export type LiveClassTab = 'upcoming' | 'ongoing' | 'completed' | 'recordings';

export type LiveClassStatus = 'Upcoming' | 'Live Now' | 'Completed' | 'Missed';

export type AttendanceRating = 'Good' | 'Fair' | 'Poor' | 'Pending';

export interface LiveClassAttendanceInfo {
  rate: number;
  rating: AttendanceRating;
  presentCount: number;
  totalEnrolled: number;
}

export type RecordingStatus = 'Not Available' | 'Available' | 'Processing';

export interface LiveClassRecordingInfo {
  status: RecordingStatus;
  duration?: string;
  fileSize?: string;
  url?: string;
}

export interface LiveClassRecord {
  id: string;
  className: string;
  subject: string;
  topic: string;
  teacherName: string;
  teacherAvatarUrl?: string;
  startTime: string;
  endTime?: string;
  startDate?: string;
  duration: string;
  attendance: LiveClassAttendanceInfo;
  liveStatus: LiveClassStatus;
  recording: LiveClassRecordingInfo;
  meetingLink?: string;
  classroomRoomId?: string;
  roomCapacity?: number;
  activeParticipants?: number;
}

export interface LiveClassesSummaryMetrics {
  scheduledToday: number;
  ongoingClasses: number;
  completedThisWeek: number;
  averageAttendanceRate: number;
  missedClassesCount: number;
}

export interface LiveClassSidebarSummary {
  scheduledToday: number;
  ongoingClasses: number;
  completedThisWeek: number;
  averageAttendance: number;
  missedClasses: number;
}

export interface LiveClassAttentionItem {
  id: string;
  count: number;
  label: string;
  tone: 'red' | 'orange' | 'amber';
  filterKey:
    | 'low-attendance'
    | 'missing-recordings'
    | 'starting-soon'
    | 'no-teacher';
}

/**
 * ============================================================================
 * Assessments & Gradebooks Domain Models
 * ============================================================================
 */
export type AssessmentScheduleTab =
  | 'schedule'
  | 'submissions'
  | 'gradebooks'
  | 'moderation'
  | 'exam-records';

export type AssessmentReviewSubTab =
  | 'overview'
  | 'submission-review'
  | 'gradebook-entries'
  | 'moderation-notes';

export type AssessmentType =
  | 'Quiz'
  | 'Test'
  | 'Assignment'
  | 'Exam'
  | 'Project';

export type GradingStatus =
  | 'Grading'
  | 'Needs Review'
  | 'Finalized'
  | 'Missing Scores'
  | 'Pending';

export type GradebookStatus =
  | 'In Progress'
  | 'Finalized'
  | 'Pending Approval'
  | 'Not Started';

export interface AssessmentRecord {
  id: string;
  className: string;
  subject: string;
  assessmentName: string;
  week: string;
  teacherName: string;
  assessmentType: AssessmentType;
  submissionsCount: number;
  totalLearners: number;
  submissionRate: number;
  gradingStatus: GradingStatus;
  averageScore?: number;
  maxScore: number;
  gradebookStatus: GradebookStatus;
  lastUpdated: string;
  pendingReviewCount?: number;
  missingScoresCount?: number;
  autoGradedItemsCount?: number;
  manualReviewRequired?: boolean;
  moderationNotes?: string;
}

export interface LearnerSubmissionReview {
  id: string;
  learnerName: string;
  initials: string;
  submissionStatus: 'Submitted' | 'Not Submitted' | 'Late';
  teacherScore?: number;
  maxScore: number;
  moderatedScore?: number;
  reviewStatus: 'Reviewed' | 'Needs Review' | 'Missing Score';
  flag?: string;
  flagTone?: 'red' | 'orange' | 'amber';
  lastUpdated: string;
  rubricComment?: string;
  teacherFeedback?: string;
}

export interface AssessmentsSummaryMetrics {
  totalAssessments: number;
  assessmentsCompleted: number;
  completionRate: number;
  pendingGrading: number;
  pendingGradingRate: number;
  gradebooksFinalized: number;
  gradebooksFinalizedRate: number;
  averageScoreAcrossAll: number;
}

export interface AssessmentSidebarSummary {
  totalScheduled: number;
  autoGraded: number;
  autoGradedRate: number;
  manuallyGraded: number;
  manuallyGradedRate: number;
  awaitingModeration: number;
  awaitingModerationRate: number;
  averageCompletionRate: number;
}

export interface AssessmentAttentionItem {
  id: string;
  count: number;
  label: string;
  tone: 'red' | 'orange' | 'amber' | 'yellow';
  filterKey:
    | 'awaiting-finalization'
    | 'missing-scores'
    | 'overdue-grading'
    | 'low-performance';
}

export interface AssessmentReviewSummary {
  submittedCount: number;
  reviewedCount: number;
  needsReviewCount: number;
  missingScoresCount: number;
  averageScoreText: string;
}

export interface GradeDistributionBucket {
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  range: string;
  learnersCount: number;
  percentage: number;
  tone: 'green' | 'orange' | 'red';
}

/**
 * ============================================================================
 * Reports & Report Cards Domain Models
 * ============================================================================
 */
export type ReportTab =
  | 'overview'
  | 'academic-performance'
  | 'attendance-engagement'
  | 'subject-analysis'
  | 'teacher-performance'
  | 'interventions'
  | 'export';

export interface ReportsSummaryMetrics {
  schoolAverage: number;
  schoolAverageChange: number;
  totalLearnersReported: number;
  classesAnalysed: number;
  subjectsAnalysed: number;
  attendanceAverage: number;
  attendanceAverageChange: number;
  reportCompletionRate: number;
  reportCompletionRateChange: number;
}

export interface TermPerformanceTrendPoint {
  termName: string;
  averageScore: number;
}

export interface ClassSubjectPerformance {
  subject: string;
  jss1Avg: number;
  jss2Avg: number;
  jss3Avg: number;
}

export interface SubjectPerformanceRow {
  id: string;
  subject: string;
  schoolAverage: number;
  highestClass: string;
  highestScore: number;
  lowestClass: string;
  lowestScore: number;
  improvementTrend: number;
  completionRate: number;
  status: 'Good' | 'Needs Attention' | 'Monitor';
}

export interface ReportsHighlightInsights {
  topPerformingClass: {
    className: string;
    averageScore: number;
    change: number;
  };
  mostImprovedSubject: {
    subject: string;
    improvement: number;
  };
  lowestAttendanceClass: {
    className: string;
    attendanceAverage: number;
    change: number;
  };
  interventionSuccess: {
    successRate: number;
    studentsShowingImprovement: number;
    change: number;
  };
}

export interface ReportsSidebarSummary {
  totalLearners: number;
  totalTeachers: number;
  subjectsTracked: number;
  parentReportsShared: number;
  approvalStatus: 'In Progress' | 'Approved' | 'Finalized' | 'Pending Review';
}

export interface PriorityAttentionArea {
  id: string;
  rank: number;
  title: string;
  category: 'academic' | 'completion' | 'attendance' | 'intervention';
}

export interface StudentSubjectScore {
  subject: string;
  caScore: number;
  examScore: number;
  totalScore: number;
  grade: string;
  teacherRemark: string;
}

export interface StudentReportCard {
  id: string;
  learnerName: string;
  rollNo: string;
  className: string;
  term: string;
  session: string;
  overallScore: number;
  overallGrade: string;
  rankInClass: number;
  totalInClass: number;
  attendancePercentage: number;
  conductRemark: string;
  principalRemark: string;
  subjectScores: StudentSubjectScore[];
}

export interface ClassReportCardSummary {
  id: string;
  className: string;
  classLevel: string;
  classTeacher: string;
  totalLearners: number;
  averageScore: number;
  reportsGenerated: number;
  reportsApproved: number;
  parentDeliveryRate: number;
  status: 'Approved' | 'In Progress' | 'Pending Approval' | 'Not Started';
}

/**
 * ============================================================================
 * Interventions Domain Models
 * ============================================================================
 */
export type InterventionsTab =
  | 'active'
  | 'schedule'
  | 'support-plans'
  | 'resolved';

export interface InterventionsSummaryMetrics {
  learnersFlagged: number;
  learnersFlaggedChange: number;
  activeInterventions: number;
  activeInterventionsChange: number;
  overdueFollowUps: number;
  overdueFollowUpsChange: number;
  resolvedCases: number;
  resolvedCasesChange: number;
  interventionSuccessRate: number;
  interventionSuccessRateChange: number;
}

export interface InterventionsSidebarSummary {
  highPriorityCases: number;
  remediationPlans: number;
  parentMeetingsScheduled: number;
  completedFollowUps: number;
}

export interface InterventionAttentionItem {
  id: string;
  rank: number;
  title: string;
  countText: string;
  count: number;
  tone: 'red' | 'amber';
  filterType:
    | 'overdue'
    | 'declining-attendance'
    | 'pending-followup'
    | 'unresolved';
}

export interface InterventionInsightData {
  commonConcern: {
    title: string;
    percentage: number;
    change: number;
  };
  bestPerformingType: {
    type: string;
    successRate: number;
    change: number;
  };
  classNeedingSupport: {
    className: string;
    activeCount: number;
    change: number;
  };
  followUpCompletion: {
    rate: number;
    change: number;
  };
}

export interface NewInterventionPlanFormData {
  learnerName: string;
  admissionNo: string;
  className: string;
  concernArea: string;
  interventionType: string;
  assignedStaff: string;
  assignedStaffRole: string;
  priority: 'High' | 'Medium' | 'Low';
  nextReviewDate: string;
  notes?: string;
}

export interface ScheduleParentMeetingFormData {
  learnerName: string;
  parentName: string;
  parentPhone?: string;
  className: string;
  meetingDate: string;
  meetingTime: string;
  meetingType: 'In-Person' | 'Virtual';
  agenda: string;
}

export interface AssignFollowUpFormData {
  caseId: string;
  learnerName: string;
  assignedStaff: string;
  assignedStaffRole?: string;
  dueDate: string;
  instructions: string;
  followUpFrequency?: 'Weekly' | 'Bi-Weekly' | 'Monthly';
}
