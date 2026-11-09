import {
  AcademicPerformanceOverview,
  AcademicSession,
  CurriculumCoverage,
  SafeguardingNotice,
  SchoolAdminMetric,
  SchoolAlert,
  TeacherActivityMetric,
  TopPerformingSubject,
  UpcomingSchoolEvent,
} from './school-admin.models';

export const ACADEMIC_SESSIONS_DATA: AcademicSession[] = [
  {
    id: 'session-2024-2025',
    name: '2024/2025 Academic Session',
    isActive: true,
    terms: [
      {
        id: 'term-1',
        name: 'First Term',
        startDate: '2024-09-09',
        endDate: '2024-12-13',
        isCurrent: false,
      },
      {
        id: 'term-2',
        name: 'Second Term',
        startDate: '2025-01-06',
        endDate: '2025-04-11',
        isCurrent: false,
      },
      {
        id: 'term-3',
        name: 'Third Term',
        startDate: '2025-04-28',
        endDate: '2025-07-25',
        isCurrent: true,
      },
    ],
  },
  {
    id: 'session-2023-2024',
    name: '2023/2024 Academic Session',
    isActive: false,
    terms: [
      {
        id: 'prev-term-1',
        name: 'First Term',
        startDate: '2023-09-11',
        endDate: '2023-12-15',
        isCurrent: false,
      },
      {
        id: 'prev-term-2',
        name: 'Second Term',
        startDate: '2024-01-08',
        endDate: '2024-04-05',
        isCurrent: false,
      },
      {
        id: 'prev-term-3',
        name: 'Third Term',
        startDate: '2024-04-22',
        endDate: '2024-07-19',
        isCurrent: false,
      },
    ],
  },
];

export const DASHBOARD_METRICS_DATA: SchoolAdminMetric[] = [
  {
    id: 'total-learners',
    label: 'Total Learners',
    value: 482,
    changeText: '↑ 12 this term',
    trend: 'up',
    tone: 'purple',
    icon: 'groups',
    sparkline: [440, 452, 460, 475, 470, 482],
  },
  {
    id: 'total-teachers',
    label: 'Total Teachers',
    value: 32,
    changeText: '— 0 change',
    trend: 'neutral',
    tone: 'green',
    icon: 'badge',
    sparkline: [32, 32, 32, 32, 32, 32],
  },
  {
    id: 'total-classes',
    label: 'Total Classes',
    value: 12,
    changeText: '— 0 change',
    trend: 'neutral',
    tone: 'blue',
    icon: 'school',
    sparkline: [12, 12, 12, 12, 12, 12],
  },
  {
    id: 'subjects-offered',
    label: 'Subjects Offered',
    value: 10,
    changeText: '— 0 change',
    trend: 'neutral',
    tone: 'yellow',
    icon: 'menu_book',
    sparkline: [10, 10, 10, 10, 10, 10],
  },
  {
    id: 'avg-attendance',
    label: 'Avg. Attendance',
    value: '86%',
    changeText: '↑ 4% this term',
    trend: 'up',
    tone: 'pink',
    icon: 'fact_check',
    sparkline: [80, 82, 84, 83, 85, 86],
  },
  {
    id: 'overall-performance',
    label: 'Overall Performance (Index)',
    value: '72%',
    changeText: '↑ 6% this term',
    trend: 'up',
    tone: 'teal',
    icon: 'trending_up',
    sparkline: [64, 66, 68, 70, 69, 72],
  },
];

export const ACADEMIC_PERFORMANCE_DATA: AcademicPerformanceOverview = {
  term: 'Third Term',
  schoolAverage: 72,
  classAverages: [
    { form: 'JSS 1', average: 68, schoolAverage: 72 },
    { form: 'JSS 2', average: 71, schoolAverage: 72 },
    { form: 'JSS 3', average: 65, schoolAverage: 72 },
    { form: 'SS 1', average: 74, schoolAverage: 72 },
    { form: 'SS 2', average: 76, schoolAverage: 72 },
    { form: 'SS 3', average: 79, schoolAverage: 72 },
  ],
};

export const CURRICULUM_COVERAGE_DATA: CurriculumCoverage = {
  term: 'Third Term',
  overallPercentage: 68,
  onTrackCount: 7,
  onTrackPercentage: 58,
  behindCount: 4,
  behindPercentage: 33,
  atRiskCount: 1,
  atRiskPercentage: 8,
  totalClasses: 12,
};

export const TOP_PERFORMING_SUBJECTS_DATA: TopPerformingSubject[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    averageScore: 78,
    icon: 'calculate',
    colorClass: 'bg-emerald-500',
  },
  {
    id: 'science',
    name: 'Basic Science',
    averageScore: 74,
    icon: 'science',
    colorClass: 'bg-blue-500',
  },
  {
    id: 'english',
    name: 'English Language',
    averageScore: 72,
    icon: 'auto_stories',
    colorClass: 'bg-purple-500',
  },
  {
    id: 'business',
    name: 'Business Studies',
    averageScore: 69,
    icon: 'payments',
    colorClass: 'bg-amber-500',
  },
  {
    id: 'social',
    name: 'Social Studies',
    averageScore: 65,
    icon: 'public',
    colorClass: 'bg-teal-500',
  },
];

export const SCHOOL_ALERTS_DATA: SchoolAlert[] = [
  {
    id: 'curriculum-delay',
    title: 'Classes behind curriculum plan',
    description: '4 classes are behind their expected topics',
    count: 4,
    severity: 'critical',
    icon: 'warning',
    route: '/school-admin/lessons-oversight',
  },
  {
    id: 'pending-submissions',
    title: 'Teachers with pending submissions',
    description: '6 teachers have ungraded assessments',
    count: 6,
    severity: 'warning',
    icon: 'assignment_late',
    route: '/school-admin/assessments-gradebooks',
  },
  {
    id: 'low-average',
    title: 'Learners below 50% average',
    description: '32 learners need immediate intervention',
    count: 32,
    severity: 'critical',
    icon: 'trending_down',
    route: '/school-admin/interventions',
  },
  {
    id: 'attendance-drop',
    title: 'Attendance concerns',
    description: '18 learners with attendance below 75%',
    count: 18,
    severity: 'info',
    icon: 'person_off',
    route: '/school-admin/classes-learners',
  },
];

export const TEACHER_ACTIVITY_DATA: TeacherActivityMetric[] = [
  {
    id: 'lessons-delivered',
    label: 'Lessons Delivered',
    completed: 128,
    total: 156,
    percentage: 82,
    icon: 'co_present',
    tone: 'teal',
  },
  {
    id: 'live-classes',
    label: 'Live Classes Conducted',
    completed: 94,
    total: 120,
    percentage: 78,
    icon: 'videocam',
    tone: 'purple',
  },
  {
    id: 'assessments-created',
    label: 'Assessments Created',
    completed: 76,
    total: 100,
    percentage: 76,
    icon: 'assignment',
    tone: 'amber',
  },
  {
    id: 'gradebooks-completed',
    label: 'Gradebooks Completed',
    completed: 7,
    total: 12,
    percentage: 58,
    icon: 'fact_check',
    tone: 'green',
  },
  {
    id: 'feedback-given',
    label: 'Feedback Given',
    completed: 512,
    total: 512,
    isCountOnly: true,
    icon: 'chat',
    tone: 'blue',
  },
];

export const UPCOMING_EVENTS_DATA: UpcomingSchoolEvent[] = [
  {
    id: 'event-1',
    title: 'Third Term Continuous Assessment',
    month: 'MAY',
    day: '02',
    dateRange: 'May 2 - May 9, 2025',
    status: 'Upcoming',
    tone: 'green',
  },
  {
    id: 'event-2',
    title: 'End of Term Examination',
    month: 'MAY',
    day: '15',
    dateRange: 'May 15 - May 22, 2025',
    status: 'Upcoming',
    tone: 'green',
  },
  {
    id: 'event-3',
    title: 'Third Term Ends',
    month: 'MAY',
    day: '30',
    dateRange: 'May 30, 2025',
    status: 'Upcoming',
    tone: 'green',
  },
];

export const SAFEGUARDING_NOTICE_DATA: SafeguardingNotice = {
  message:
    'Safeguarding is our priority. All activities are monitored to ensure a safe and supportive learning environment for every learner.',
  reportLinkText: 'View Safeguarding Reports →',
  reportLinkUrl: '/school-admin/reports',
};
