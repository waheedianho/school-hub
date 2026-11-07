export interface TeacherClassMetric {
  id: string;
  label: string;
  value: number | string;
  subtext: string;
  subtextType?: 'active' | 'growth' | 'neutral';
  icon: string;
  tone: 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

export interface TeacherClassItem {
  id: string;
  name: string;
  badgeTone: 'purple' | 'blue' | 'orange' | 'green';
  subject: string;
  learnersCount: number;
  classAverage: number;
  attendanceRate: number;
  lastActivity: string;
  status: 'Active' | 'Inactive';
}

export interface TeacherPendingReviewItem {
  id: string;
  count: number;
  title: string;
  subtitle: string;
  tone: 'purple' | 'neutral' | 'red';
  route: string;
}

export interface TeacherLearnerAttentionItem {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarInitials: string;
  avatarBg: string;
  issue: string;
  badgeLabel: 'At Risk' | 'Needs Support';
  badgeTone: 'red' | 'orange';
  learnerId: string;
}

export interface TeacherAnnouncementItem {
  id: string;
  title: string;
  snippet: string;
  time: string;
  icon: string;
  tone: 'blue' | 'green' | 'pink';
}

export interface TeacherClassScheduleItem {
  id: string;
  badgeText: 'LIVE NOW' | 'UP NEXT' | 'SCHEDULED';
  badgeTone: 'green' | 'blue' | 'orange';
  time: string;
  className: string;
  subject: string;
  topic: string;
  route: string;
}

export interface TeacherPerformanceTier {
  label: string;
  range: string;
  percentage: number;
  color: string;
}

export interface TeacherClassQuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const TEACHER_CLASSES_METRICS: TeacherClassMetric[] = [
  {
    id: 'classes',
    label: 'Total Classes',
    value: 4,
    subtext: 'Active Classes',
    subtextType: 'active',
    icon: 'ri-group-line',
    tone: 'purple',
  },
  {
    id: 'learners',
    label: 'Total Learners',
    value: 112,
    subtext: 'Across all classes',
    subtextType: 'neutral',
    icon: 'ri-graduation-cap-line',
    tone: 'blue',
  },
  {
    id: 'average',
    label: 'Class Average',
    value: '72%',
    subtext: '↑ 8% vs last term',
    subtextType: 'growth',
    icon: 'ri-line-chart-line',
    tone: 'green',
  },
  {
    id: 'today',
    label: 'Classes Today',
    value: 2,
    subtext: '1 Live • 1 Scheduled',
    subtextType: 'neutral',
    icon: 'ri-slideshow-line',
    tone: 'orange',
  },
  {
    id: 'reviews',
    label: 'Pending Reviews',
    value: 18,
    subtext: 'Submissions',
    subtextType: 'neutral',
    icon: 'ri-file-list-3-line',
    tone: 'pink',
  },
];

export const TEACHER_CLASSES_DATA: TeacherClassItem[] = [
  {
    id: 'jss-1a',
    name: 'JSS 1A',
    badgeTone: 'purple',
    subject: 'English Language',
    learnersCount: 28,
    classAverage: 76,
    attendanceRate: 94,
    lastActivity: 'Today, 8:45 AM',
    status: 'Active',
  },
  {
    id: 'jss-1b',
    name: 'JSS 1B',
    badgeTone: 'blue',
    subject: 'English Language',
    learnersCount: 27,
    classAverage: 68,
    attendanceRate: 90,
    lastActivity: 'Yesterday, 2:15 PM',
    status: 'Active',
  },
  {
    id: 'jss-1c',
    name: 'JSS 1C',
    badgeTone: 'orange',
    subject: 'English Language',
    learnersCount: 29,
    classAverage: 70,
    attendanceRate: 88,
    lastActivity: 'Yesterday, 1:05 PM',
    status: 'Active',
  },
  {
    id: 'jss-1d',
    name: 'JSS 1D',
    badgeTone: 'green',
    subject: 'English Language',
    learnersCount: 28,
    classAverage: 66,
    attendanceRate: 86,
    lastActivity: '2 days ago',
    status: 'Active',
  },
];

export const TEACHER_CLASSES_PENDING_REVIEWS: TeacherPendingReviewItem[] = [
  {
    id: 'pr-1',
    count: 12,
    title: 'Assignments',
    subtitle: 'Awaiting your review',
    tone: 'purple',
    route: '/teacher/assignments',
  },
  {
    id: 'pr-2',
    count: 4,
    title: 'Portfolio Tasks',
    subtitle: 'Awaiting rubric assessment',
    tone: 'neutral',
    route: '/teacher/assignments',
  },
  {
    id: 'pr-3',
    count: 2,
    title: 'Essays / Theory',
    subtitle: 'Awaiting grading',
    tone: 'red',
    route: '/teacher/assignments',
  },
];

export const TEACHER_LEARNERS_ATTENTION_DATA: TeacherLearnerAttentionItem[] = [
  {
    id: 'la-1',
    name: 'Chinedu Okafor',
    avatarInitials: 'CO',
    avatarBg: '#3b82f6',
    issue: 'Low performance in 3 topics',
    badgeLabel: 'At Risk',
    badgeTone: 'red',
    learnerId: 'chinedu-okafor',
  },
  {
    id: 'la-2',
    name: 'Aisha Musa',
    avatarInitials: 'AM',
    avatarBg: '#ec4899',
    issue: 'Incomplete assignments',
    badgeLabel: 'Needs Support',
    badgeTone: 'orange',
    learnerId: 'aisha-musa',
  },
  {
    id: 'la-3',
    name: 'Ibrahim Bello',
    avatarInitials: 'IB',
    avatarBg: '#8b5cf6',
    issue: 'Struggling with comprehension',
    badgeLabel: 'Needs Support',
    badgeTone: 'orange',
    learnerId: 'ibrahim-bello',
  },
];

export const TEACHER_ANNOUNCEMENTS_DATA: TeacherAnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Weekly Quiz on Nouns',
    snippet: 'Quiz is scheduled for Friday, 2 May 2026.',
    time: 'Today, 9:00 AM',
    icon: 'ri-computer-line',
    tone: 'blue',
  },
  {
    id: 'ann-2',
    title: 'Submit Homework',
    snippet: 'Homework on Sentence Types is due Monday,',
    time: 'Yesterday, 6:00 PM',
    icon: 'ri-calendar-line',
    tone: 'green',
  },
  {
    id: 'ann-3',
    title: 'Live Class Reminder',
    snippet: 'JSS 1A - Live class starts in 15 minutes.',
    time: 'Today, 8:15 AM',
    icon: 'ri-notification-3-line',
    tone: 'pink',
  },
];

export const TEACHER_CLASS_SCHEDULE_DATA: TeacherClassScheduleItem[] = [
  {
    id: 'cs-1',
    badgeText: 'LIVE NOW',
    badgeTone: 'green',
    time: '8:30 AM – 9:30 AM',
    className: 'JSS 1A',
    subject: 'English Language',
    topic: 'Topic: Nouns and Their Kinds',
    route: '/teacher/live-classes',
  },
  {
    id: 'cs-2',
    badgeText: 'UP NEXT',
    badgeTone: 'blue',
    time: '11:00 AM – 12:00 PM',
    className: 'JSS 1C',
    subject: 'English Language',
    topic: 'Topic: Parts of Speech',
    route: '/teacher/live-classes',
  },
  {
    id: 'cs-3',
    badgeText: 'SCHEDULED',
    badgeTone: 'orange',
    time: '2:00 PM – 3:00 PM',
    className: 'JSS 1B',
    subject: 'English Language',
    topic: 'Topic: Sentence Structure',
    route: '/teacher/live-classes',
  },
];

export const TEACHER_PERFORMANCE_TIERS: TeacherPerformanceTier[] = [
  {
    label: 'Excellent',
    range: '80–100%',
    percentage: 25,
    color: '#10b981',
  },
  {
    label: 'Very Good',
    range: '70–79%',
    percentage: 30,
    color: '#06b6d4',
  },
  {
    label: 'Good',
    range: '60–69%',
    percentage: 35,
    color: '#f59e0b',
  },
  {
    label: 'Average',
    range: '50–59%',
    percentage: 8,
    color: '#6366f1',
  },
  {
    label: 'Below Average',
    range: '<50%',
    percentage: 2,
    color: '#ef4444',
  },
];

export const TEACHER_CLASSES_QUICK_ACTIONS: TeacherClassQuickAction[] = [
  {
    id: 'qa-assignment',
    label: 'Create Assignment',
    icon: 'ri-file-add-line',
    route: '/teacher/assignments',
  },
  {
    id: 'qa-live',
    label: 'Schedule Live Class',
    icon: 'ri-vidicon-line',
    route: '/teacher/live-classes',
  },
  {
    id: 'qa-quiz',
    label: 'Create Quiz/Test',
    icon: 'ri-questionnaire-line',
    route: '/teacher/assessments',
  },
  {
    id: 'qa-announcement',
    label: 'Send Announcement',
    icon: 'ri-megaphone-line',
    route: '/teacher/messages',
  },
  {
    id: 'qa-bulk-msg',
    label: 'Bulk Message to Classes',
    icon: 'ri-mail-send-line',
    route: '/teacher/messages',
  },
];
