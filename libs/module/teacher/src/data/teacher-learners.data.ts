export interface LearnersMetric {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  tone: 'purple' | 'green' | 'orange' | 'blue';
  subtitleTone?: 'green' | 'orange' | 'default';
}

export type PerformanceBand =
  | 'Excellent'
  | 'Very Good'
  | 'Good'
  | 'Average'
  | 'Below Average';

export type LearnerStatus = 'Active' | 'At Risk' | 'Needs Support';

export interface LearnerProfileItem {
  id: string;
  name: string;
  learnerId: string;
  avatarText: string;
  avatarColor: string;
  className: string;
  subjectsCount: string;
  pendingTasksCount: number;
  averageScore: number;
  performanceBand: PerformanceBand;
  attendanceRate: number;
  status: LearnerStatus;
  lastActivity: string;
}

export interface LearnersFilterValues {
  className: string;
  subject: string;
  performanceBand: string;
  attendance: string;
  searchQuery: string;
}

export interface LearnerNeedingAttentionItem {
  id: string;
  name: string;
  avatarText: string;
  avatarColor: string;
  className: string;
  subject: string;
  status: 'At Risk' | 'Needs Support';
  score: number;
}

export interface PendingSubmissionReviewItem {
  id: string;
  title: string;
  className: string;
  learnersCount: number;
  timestamp: string;
}

export interface TopPerformerItem {
  id: string;
  name: string;
  avatarText: string;
  avatarColor: string;
  className: string;
  subject: string;
  score: number;
}

export interface LearnersQuickAction {
  id: string;
  label: string;
  icon: string;
}

export const TEACHER_LEARNERS_METRICS: LearnersMetric[] = [
  {
    id: 'total-learners',
    label: 'Total Learners',
    value: 112,
    subtitle: 'Across all classes',
    icon: 'groups',
    tone: 'purple',
  },
  {
    id: 'active-learners',
    label: 'Active Learners',
    value: 104,
    subtitle: '93% of total learners',
    icon: 'how_to_reg',
    tone: 'green',
    subtitleTone: 'green',
  },
  {
    id: 'learners-needing-support',
    label: 'Learners Needing Support',
    value: 18,
    subtitle: '16% of total learners',
    icon: 'warning',
    tone: 'orange',
    subtitleTone: 'orange',
  },
  {
    id: 'class-average-score',
    label: 'Class Average Score',
    value: '72%',
    subtitle: '↑ 8% vs last term',
    icon: 'trending_up',
    tone: 'blue',
    subtitleTone: 'green',
  },
];

export const TEACHER_LEARNERS_LIST: LearnerProfileItem[] = [
  {
    id: 'lrn-1',
    name: 'Maryam Ibrahim',
    learnerId: 'LRN-2026-0001',
    avatarText: 'MI',
    avatarColor: '#8b5cf6',
    className: 'JSS 1A',
    subjectsCount: '3 Subjects',
    pendingTasksCount: 3,
    averageScore: 95,
    performanceBand: 'Very Good',
    attendanceRate: 95,
    status: 'Active',
    lastActivity: 'Today, 9:15 AM',
  },
  {
    id: 'lrn-2',
    name: 'Daniel Okafor',
    learnerId: 'LRN-2026-0002',
    avatarText: 'DO',
    avatarColor: '#3b82f6',
    className: 'JSS 1B',
    subjectsCount: '3 Subjects',
    pendingTasksCount: 3,
    averageScore: 68,
    performanceBand: 'Good',
    attendanceRate: 90,
    status: 'Active',
    lastActivity: 'Today, 8:42 AM',
  },
  {
    id: 'lrn-3',
    name: 'Aisha Ahmed',
    learnerId: 'LRN-2026-0003',
    avatarText: 'AA',
    avatarColor: '#ec4899',
    className: 'JSS 1A',
    subjectsCount: '4 Subjects',
    pendingTasksCount: 1,
    averageScore: 92,
    performanceBand: 'Excellent',
    attendanceRate: 98,
    status: 'Active',
    lastActivity: 'Yesterday, 7:30 PM',
  },
  {
    id: 'lrn-4',
    name: 'Uche Collins',
    learnerId: 'LRN-2026-0004',
    avatarText: 'UC',
    avatarColor: '#f97316',
    className: 'JSS 1C',
    subjectsCount: '3 Subjects',
    pendingTasksCount: 4,
    averageScore: 55,
    performanceBand: 'Below Average',
    attendanceRate: 78,
    status: 'At Risk',
    lastActivity: 'Yesterday, 3:12 PM',
  },
  {
    id: 'lrn-5',
    name: 'Fatima Yusuf',
    learnerId: 'LRN-2026-0005',
    avatarText: 'FY',
    avatarColor: '#10b981',
    className: 'JSS 1B',
    subjectsCount: '3 Subjects',
    pendingTasksCount: 2,
    averageScore: 62,
    performanceBand: 'Average',
    attendanceRate: 82,
    status: 'Needs Support',
    lastActivity: '2 days ago',
  },
  {
    id: 'lrn-6',
    name: 'Emeka Bassey',
    learnerId: 'LRN-2026-0006',
    avatarText: 'EB',
    avatarColor: '#6366f1',
    className: 'JSS 1A',
    subjectsCount: '4 Subjects',
    pendingTasksCount: 7,
    averageScore: 88,
    performanceBand: 'Very Good',
    attendanceRate: 94,
    status: 'Active',
    lastActivity: 'Today, 10:05 AM',
  },
  {
    id: 'lrn-7',
    name: 'Tunde Lawal',
    learnerId: 'LRN-2026-0007',
    avatarText: 'TL',
    avatarColor: '#ef4444',
    className: 'JSS 1C',
    subjectsCount: '3 Subjects',
    pendingTasksCount: 3,
    averageScore: 48,
    performanceBand: 'Below Average',
    attendanceRate: 71,
    status: 'At Risk',
    lastActivity: '3 days ago',
  },
  {
    id: 'lrn-8',
    name: 'Zainab Oladipo',
    learnerId: 'LRN-2026-0008',
    avatarText: 'ZO',
    avatarColor: '#f59e0b',
    className: 'JSS 1B',
    subjectsCount: '4 Subjects',
    pendingTasksCount: 7,
    averageScore: 76,
    performanceBand: 'Good',
    attendanceRate: 89,
    status: 'Needs Support',
    lastActivity: 'Yesterday, 6:20 PM',
  },
];

export const LEARNERS_NEEDING_ATTENTION_DATA: LearnerNeedingAttentionItem[] = [
  {
    id: 'attn-1',
    name: 'Uche Collins',
    avatarText: 'UC',
    avatarColor: '#f97316',
    className: 'JSS 1C',
    subject: 'English Language',
    status: 'At Risk',
    score: 55,
  },
  {
    id: 'attn-2',
    name: 'Tunde Lawal',
    avatarText: 'TL',
    avatarColor: '#ef4444',
    className: 'JSS 1C',
    subject: 'English Language',
    status: 'At Risk',
    score: 48,
  },
  {
    id: 'attn-3',
    name: 'Fatima Yusuf',
    avatarText: 'FY',
    avatarColor: '#10b981',
    className: 'JSS 1B',
    subject: 'Mathematics',
    status: 'Needs Support',
    score: 62,
  },
];

export const RECENT_SUBMISSIONS_PENDING_REVIEW: PendingSubmissionReviewItem[] =
  [
    {
      id: 'sub-1',
      title: 'Essay: My Favourite Book',
      className: 'JSS 1A',
      learnersCount: 12,
      timestamp: 'Today, 9:20 AM',
    },
    {
      id: 'sub-2',
      title: 'Algebra Worksheet Set 2',
      className: 'JSS 1B',
      learnersCount: 10,
      timestamp: 'Yesterday, 6:15 PM',
    },
    {
      id: 'sub-3',
      title: 'Speech Outline Draft',
      className: 'JSS 1C',
      learnersCount: 8,
      timestamp: 'Yesterday, 4:40 PM',
    },
  ];

export const TOP_PERFORMERS_THIS_WEEK: TopPerformerItem[] = [
  {
    id: 'top-1',
    name: 'Aisha Ahmed',
    avatarText: 'AA',
    avatarColor: '#ec4899',
    className: 'JSS 1A',
    subject: 'English Language',
    score: 92,
  },
  {
    id: 'top-2',
    name: 'Emeka Bassey',
    avatarText: 'EB',
    avatarColor: '#6366f1',
    className: 'JSS 1B',
    subject: 'Mathematics',
    score: 88,
  },
  {
    id: 'top-3',
    name: 'Maryam Ibrahim',
    avatarText: 'MI',
    avatarColor: '#8b5cf6',
    className: 'JSS 1A',
    subject: 'English Language',
    score: 85,
  },
];

export const LEARNERS_QUICK_ACTIONS: LearnersQuickAction[] = [
  {
    id: 'message-parent',
    label: 'Message Parent',
    icon: 'chat_bubble_outline',
  },
  {
    id: 'assign-remediation',
    label: 'Assign Remediation',
    icon: 'menu_book',
  },
  {
    id: 'schedule-intervention',
    label: 'Schedule Intervention',
    icon: 'calendar_month',
  },
  {
    id: 'view-full-profile',
    label: 'View Full Profile',
    icon: 'person_outline',
  },
];
