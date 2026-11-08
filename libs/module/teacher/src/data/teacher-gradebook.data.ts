export interface GradebookMetric {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  tone: 'purple' | 'green' | 'orange' | 'blue' | 'teal';
}

export type GradebookStatus = 'Approved' | 'Pending' | 'Mixed';

export interface LearnerGradeRecord {
  id: string;
  learnerName: string;
  avatarText: string;
  avatarColor: string;
  avatarUrl?: string;
  className: string;
  quizScore: number; // max 20
  worksheetScore: number; // max 20
  essayScore: number; // max 25
  portfolioScore: number; // max 15
  attendanceScore: number; // max 10
  averagePercentage: number; // /100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  status: GradebookStatus;
}

export interface GradebookFilterValues {
  term: string;
  className: string;
  subject: string;
  assessmentGroup: string;
  searchQuery: string;
}

export interface GradebookSummarySegment {
  id: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RecentScoreActivityItem {
  id: string;
  type: 'approved' | 'pending' | 'auto-synced' | 'review-required';
  title: string;
  timestamp: string;
}

export interface AssessmentWeightItem {
  id: string;
  name: string;
  weightPercentage: number;
}

export interface LearnerAttentionItem {
  id: string;
  name: string;
  className: string;
  avatarText: string;
  avatarColor: string;
  warningLabel: string;
  details: string;
  severity: 'high' | 'medium';
}

export interface GradebookQuickAction {
  id: string;
  label: string;
  icon: string;
}

export const TEACHER_GRADEBOOK_METRICS: GradebookMetric[] = [
  {
    id: 'total-learners',
    label: 'Total Learners',
    value: 112,
    icon: 'groups',
    tone: 'purple',
  },
  {
    id: 'recorded-assessments',
    label: 'Recorded Assessments',
    value: 36,
    icon: 'assignment_turned_in',
    tone: 'green',
  },
  {
    id: 'pending-approval',
    label: 'Pending Score Approval',
    value: 7,
    icon: 'hourglass_empty',
    tone: 'orange',
  },
  {
    id: 'class-average',
    label: 'Class Average',
    value: '72%',
    icon: 'trending_up',
    tone: 'blue',
  },
  {
    id: 'auto-synced',
    label: 'Auto-Synced Scores',
    value: 84,
    icon: 'sync',
    tone: 'teal',
  },
];

export const GRADEBOOK_RECORDS: LearnerGradeRecord[] = [
  {
    id: 'rec-1',
    learnerName: 'Maryam Ibrahim',
    avatarText: 'MI',
    avatarColor: '#8b5cf6',
    className: 'JSS 1A',
    quizScore: 18,
    worksheetScore: 16,
    essayScore: 20,
    portfolioScore: 13,
    attendanceScore: 9,
    averagePercentage: 76,
    grade: 'B',
    status: 'Approved',
  },
  {
    id: 'rec-2',
    learnerName: 'Chinedu Okafor',
    avatarText: 'CO',
    avatarColor: '#3b82f6',
    className: 'JSS 1A',
    quizScore: 14,
    worksheetScore: 12,
    essayScore: 16,
    portfolioScore: 10,
    attendanceScore: 8,
    averagePercentage: 60,
    grade: 'C',
    status: 'Pending',
  },
  {
    id: 'rec-3',
    learnerName: 'Aisha Musa',
    avatarText: 'AM',
    avatarColor: '#ec4899',
    className: 'JSS 1A',
    quizScore: 19,
    worksheetScore: 17,
    essayScore: 23,
    portfolioScore: 14,
    attendanceScore: 10,
    averagePercentage: 83,
    grade: 'A',
    status: 'Approved',
  },
  {
    id: 'rec-4',
    learnerName: 'Ibrahim Bello',
    avatarText: 'IB',
    avatarColor: '#10b981',
    className: 'JSS 1A',
    quizScore: 16,
    worksheetScore: 13,
    essayScore: 15,
    portfolioScore: 8,
    attendanceScore: 7,
    averagePercentage: 59,
    grade: 'C',
    status: 'Mixed',
  },
  {
    id: 'rec-5',
    learnerName: 'Amaka Nwosu',
    avatarText: 'AN',
    avatarColor: '#f59e0b',
    className: 'JSS 1A',
    quizScore: 17,
    worksheetScore: 15,
    essayScore: 18,
    portfolioScore: 12,
    attendanceScore: 9,
    averagePercentage: 71,
    grade: 'B',
    status: 'Pending',
  },
  {
    id: 'rec-6',
    learnerName: 'Uche Eze',
    avatarText: 'UE',
    avatarColor: '#ef4444',
    className: 'JSS 1A',
    quizScore: 11,
    worksheetScore: 10,
    essayScore: 12,
    portfolioScore: 7,
    attendanceScore: 6,
    averagePercentage: 46,
    grade: 'D',
    status: 'Pending',
  },
];

export const GRADEBOOK_SUMMARY_SEGMENTS: GradebookSummarySegment[] = [
  {
    id: 'grade-a',
    label: 'A (80% and above)',
    count: 29,
    percentage: 25.9,
    color: '#10b981', // green
  },
  {
    id: 'grade-b',
    label: 'B (60% to 79%)',
    count: 48,
    percentage: 42.9,
    color: '#3b82f6', // blue
  },
  {
    id: 'grade-c',
    label: 'C (40% to 59%)',
    count: 20,
    percentage: 17.9,
    color: '#f97316', // orange
  },
  {
    id: 'grade-below',
    label: 'Below Average (<40%)',
    count: 15,
    percentage: 13.4,
    color: '#ef4444', // red
  },
];

export const RECENT_SCORE_ACTIVITIES: RecentScoreActivityItem[] = [
  {
    id: 'act-1',
    type: 'approved',
    title: 'Essay / Theory score approved for Maryam Ibrahim',
    timestamp: '3 May 2026, 10:23 AM',
  },
  {
    id: 'act-2',
    type: 'approved',
    title: 'Worksheet score approved for Aisha Musa',
    timestamp: '3 May 2026, 9:45 AM',
  },
  {
    id: 'act-3',
    type: 'pending',
    title: 'Portfolio Task score pending for Chinedu Okafor',
    timestamp: '3 May 2026, 9:12 AM',
  },
  {
    id: 'act-4',
    type: 'auto-synced',
    title: 'Quiz - Parts of Speech score auto-synced for Amaka Nwosu',
    timestamp: '3 May 2026, 8:51 AM',
  },
  {
    id: 'act-5',
    type: 'review-required',
    title: 'Essay / Theory score requires review for Ibrahim Bello',
    timestamp: '2 May 2026, 4:32 PM',
  },
];

export const ASSESSMENT_WEIGHTS: AssessmentWeightItem[] = [
  {
    id: 'weight-quiz',
    name: 'Quiz - Parts of Speech',
    weightPercentage: 20,
  },
  {
    id: 'weight-worksheet',
    name: 'Worksheet',
    weightPercentage: 20,
  },
  {
    id: 'weight-essay',
    name: 'Essay / Theory',
    weightPercentage: 25,
  },
  {
    id: 'weight-portfolio',
    name: 'Portfolio Task',
    weightPercentage: 15,
  },
  {
    id: 'weight-attendance',
    name: 'Attendance / Participation',
    weightPercentage: 10,
  },
  {
    id: 'weight-test',
    name: 'Topic Test',
    weightPercentage: 10,
  },
];

export const LEARNERS_NEEDING_ATTENTION: LearnerAttentionItem[] = [
  {
    id: 'attn-1',
    name: 'Ibrahim Bello',
    className: 'JSS 1A',
    avatarText: 'IB',
    avatarColor: '#10b981',
    warningLabel: '3 areas below average',
    details: 'Essay, Portfolio, Participation',
    severity: 'medium',
  },
  {
    id: 'attn-2',
    name: 'Uche Eze',
    className: 'JSS 1A',
    avatarText: 'UE',
    avatarColor: '#ef4444',
    warningLabel: 'All assessments below average',
    details: 'Needs immediate support',
    severity: 'high',
  },
  {
    id: 'attn-3',
    name: 'Chinedu Okafor',
    className: 'JSS 1A',
    avatarText: 'CO',
    avatarColor: '#3b82f6',
    warningLabel: '2 areas below average',
    details: 'Worksheet, Essay',
    severity: 'medium',
  },
];

export const GRADEBOOK_QUICK_ACTIONS: GradebookQuickAction[] = [
  {
    id: 'enter-offline',
    label: 'Enter Offline Scores',
    icon: 'edit_note',
  },
  {
    id: 'approve-pending',
    label: 'Approve Pending Scores',
    icon: 'task_alt',
  },
  {
    id: 'export-gradebook',
    label: 'Export Gradebook',
    icon: 'download',
  },
  {
    id: 'open-reports',
    label: 'Open Report Builder',
    icon: 'bar_chart',
  },
  {
    id: 'adjust-weights',
    label: 'Adjust Weight Settings',
    icon: 'tune',
  },
];
