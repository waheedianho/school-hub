export interface TeacherMetricItem {
  id: string;
  label: string;
  value: number | string;
  icon: string;
  linkText: string;
  linkUrl: string;
  tone: 'blue' | 'orange' | 'pink' | 'green' | 'purple';
}

export interface TeacherScheduleItem {
  id: string;
  time: string;
  title: string;
  topic: string;
  typeBadge: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

export interface TeacherPendingSubmission {
  id: string;
  learnerName: string;
  learnerInitials: string;
  avatarBg: string;
  className: string;
  submissionType: string;
  topic: string;
  submittedAt: string;
  status: 'Pending Review' | 'Needs Scoring';
  actionText: 'Review Now' | 'Grade Now';
  actionType: 'outline' | 'solid';
  route: string;
}

export interface TeacherQuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  tone: 'blue' | 'green' | 'orange' | 'purple' | 'teal';
}

export interface TeacherUnreadMessage {
  id: string;
  senderName: string;
  snippet: string;
  time: string;
  unreadCount: number;
  avatarIcon: string;
}

export interface TeacherUpcomingDeadline {
  id: string;
  title: string;
  dueText: string;
  status: 'Due Soon' | 'Upcoming';
  tone: 'pink' | 'orange';
}

export interface TeacherClassTopic {
  id: string;
  className: string;
  subject: string;
  currentTopic: string;
  deliveryStatus: 'On Track' | 'Needs Attention';
  averageScore: number;
  classRoute: string;
}

export interface TeacherClassPerformance {
  className: string;
  averageScore: number;
  color: string;
}

export interface TeacherWorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  tone: 'blue' | 'orange' | 'purple' | 'green';
}

export const TEACHER_METRICS_DATA: TeacherMetricItem[] = [
  {
    id: 'classes',
    label: "Today's Classes",
    value: 4,
    icon: 'ri-calendar-2-line',
    linkText: 'View schedule →',
    linkUrl: '/teacher/classes',
    tone: 'blue',
  },
  {
    id: 'reviews',
    label: 'Pending Reviews',
    value: 18,
    icon: 'ri-file-text-line',
    linkText: 'Review now →',
    linkUrl: '/teacher/assignments',
    tone: 'orange',
  },
  {
    id: 'attention',
    label: 'Learners Attention',
    value: 7,
    icon: 'ri-group-line',
    linkText: 'See details →',
    linkUrl: '/teacher/learners',
    tone: 'pink',
  },
  {
    id: 'topics',
    label: 'Current Week Topics',
    value: 5,
    icon: 'ri-book-open-line',
    linkText: 'View topics →',
    linkUrl: '/teacher/curriculum',
    tone: 'green',
  },
  {
    id: 'assessments',
    label: 'Assessments',
    value: 3,
    icon: 'ri-survey-line',
    linkText: 'View assessments →',
    linkUrl: '/teacher/assessments',
    tone: 'purple',
  },
];

export const TEACHER_SCHEDULE_DATA: TeacherScheduleItem[] = [
  {
    id: 'sch-1',
    time: '8:00 AM',
    title: 'JSS 1A English Language',
    topic: 'Parts of Speech',
    typeBadge: 'Live Class',
    status: 'upcoming',
  },
  {
    id: 'sch-2',
    time: '10:00 AM',
    title: 'JSS 2B English Language',
    topic: 'Comprehension Practice',
    typeBadge: 'Lesson Review',
    status: 'upcoming',
  },
  {
    id: 'sch-3',
    time: '12:00 PM',
    title: 'JSS 1A English Language',
    topic: 'Worksheet Feedback',
    typeBadge: '',
    status: 'in-progress',
  },
  {
    id: 'sch-4',
    time: '2:00 PM',
    title: 'JSS 3A English Language',
    topic: 'Essay Writing',
    typeBadge: 'Live Class',
    status: 'upcoming',
  },
];

export const TEACHER_PENDING_SUBMISSIONS_DATA: TeacherPendingSubmission[] = [
  {
    id: 'sub-1',
    learnerName: 'Maryam Ibrahim',
    learnerInitials: 'MI',
    avatarBg: '#8b5cf6',
    className: 'JSS 1A',
    submissionType: 'Worksheet',
    topic: 'Parts of Speech',
    submittedAt: '9:12 AM',
    status: 'Pending Review',
    actionText: 'Review Now',
    actionType: 'outline',
    route: '/teacher/assignments',
  },
  {
    id: 'sub-2',
    learnerName: 'Chinedu Okafor',
    learnerInitials: 'CO',
    avatarBg: '#3b82f6',
    className: 'JSS 1A',
    submissionType: 'Portfolio Task',
    topic: 'Descriptive Writing',
    submittedAt: '8:45 AM',
    status: 'Pending Review',
    actionText: 'Review Now',
    actionType: 'outline',
    route: '/teacher/assignments',
  },
  {
    id: 'sub-3',
    learnerName: 'Amaka Nwosu',
    learnerInitials: 'AN',
    avatarBg: '#ec4899',
    className: 'JSS 2B',
    submissionType: 'Essay',
    topic: 'Comprehension',
    submittedAt: '7:58 AM',
    status: 'Needs Scoring',
    actionText: 'Grade Now',
    actionType: 'solid',
    route: '/teacher/assignments',
  },
];

export const TEACHER_QUICK_ACTIONS_DATA: TeacherQuickAction[] = [
  {
    id: 'qa-live',
    label: 'Start Live Class',
    icon: 'ri-vidicon-fill',
    route: '/teacher/live-classes',
    tone: 'blue',
  },
  {
    id: 'qa-pack',
    label: 'Open Delivery Pack',
    icon: 'ri-folder-open-fill',
    route: '/teacher/lessons',
    tone: 'green',
  },
  {
    id: 'qa-review',
    label: 'Review Submissions',
    icon: 'ri-file-list-3-fill',
    route: '/teacher/assignments',
    tone: 'orange',
  },
  {
    id: 'qa-grade',
    label: 'Open Gradebook',
    icon: 'ri-bar-chart-fill',
    route: '/teacher/gradebook',
    tone: 'purple',
  },
  {
    id: 'qa-report',
    label: 'Generate Report',
    icon: 'ri-file-chart-fill',
    route: '/teacher/reports',
    tone: 'teal',
  },
];

export const TEACHER_UNREAD_MESSAGES_DATA: TeacherUnreadMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Vice Principal (Academics)',
    snippet: 'Please submit term plan for review.',
    time: '10:15 AM',
    unreadCount: 2,
    avatarIcon: 'ri-user-star-line',
  },
  {
    id: 'msg-2',
    senderName: 'JSS 2B Parents Group',
    snippet: 'Reminder: Comprehension test next week.',
    time: 'Yesterday',
    unreadCount: 3,
    avatarIcon: 'ri-parent-line',
  },
  {
    id: 'msg-3',
    senderName: 'System Notification',
    snippet: 'New assessment template available.',
    time: 'Yesterday',
    unreadCount: 1,
    avatarIcon: 'ri-notification-3-line',
  },
];

export const TEACHER_UPCOMING_DEADLINES_DATA: TeacherUpcomingDeadline[] = [
  {
    id: 'dl-1',
    title: 'Comprehension Quiz (JSS 2B)',
    dueText: 'May 24, 2025 (3 days left)',
    status: 'Due Soon',
    tone: 'pink',
  },
  {
    id: 'dl-2',
    title: 'Essay Writing Assignment (JSS 3A)',
    dueText: 'May 26, 2025 (5 days left)',
    status: 'Upcoming',
    tone: 'orange',
  },
  {
    id: 'dl-3',
    title: 'Parts of Speech Test (JSS 1A)',
    dueText: 'May 30, 2025 (9 days left)',
    status: 'Upcoming',
    tone: 'orange',
  },
];

export const TEACHER_CLASS_TOPICS_DATA: TeacherClassTopic[] = [
  {
    id: 'ct-1',
    className: 'JSS 1A',
    subject: 'English Language',
    currentTopic: 'Parts of Speech',
    deliveryStatus: 'On Track',
    averageScore: 74,
    classRoute: '/teacher/classes',
  },
  {
    id: 'ct-2',
    className: 'JSS 2B',
    subject: 'English Language',
    currentTopic: 'Comprehension',
    deliveryStatus: 'On Track',
    averageScore: 68,
    classRoute: '/teacher/classes',
  },
  {
    id: 'ct-3',
    className: 'JSS 3A',
    subject: 'English Language',
    currentTopic: 'Essay Writing',
    deliveryStatus: 'Needs Attention',
    averageScore: 61,
    classRoute: '/teacher/classes',
  },
];

export const TEACHER_CLASS_PERFORMANCE_DATA: TeacherClassPerformance[] = [
  { className: 'JSS 1A', averageScore: 74, color: '#10b981' },
  { className: 'JSS 2B', averageScore: 68, color: '#3b82f6' },
  { className: 'JSS 3A', averageScore: 61, color: '#f97316' },
];

export const TEACHER_WORKFLOW_STEPS: TeacherWorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Assessments & Submissions',
    description:
      'Learners complete assignments, quizzes, tests, and upload work.',
    icon: 'ri-file-text-line',
    tone: 'blue',
  },
  {
    stepNumber: 2,
    title: 'Teacher Review',
    description: 'You review and score where human judgment is required.',
    icon: 'ri-user-follow-line',
    tone: 'orange',
  },
  {
    stepNumber: 3,
    title: 'Gradebook',
    description: 'Reviewed scores are recorded and stored in the Gradebook.',
    icon: 'ri-bar-chart-box-line',
    tone: 'purple',
  },
  {
    stepNumber: 4,
    title: 'Reports & Report Cards',
    description: 'Scores are used to generate reports and report cards.',
    icon: 'ri-file-chart-line',
    tone: 'green',
  },
];
