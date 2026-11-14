import {
  ActiveInstitution,
  AdoptionInsight,
  AnalyticsMetric,
  AnalyticsPerformanceSummary,
  AssessmentCompletionPoint,
  AttentionSchool,
  HeatmapCell,
  PlatformActivityItem,
  PlatformUsagePoint,
  RegionSpread,
  RoleUsageBreakdown,
  SubjectConsumption,
} from './super-admin-analytics.models';

export const ANALYTICS_METRICS: AnalyticsMetric[] = [
  {
    label: 'Active Schools',
    value: '248',
    change: '6.2%',
    trend: 'up',
    tone: 'primary',
    icon: 'apartment',
    comparisonPeriod: 'vs May 5 – May 11',
    sparkline: [210, 218, 224, 230, 236, 241, 248],
  },
  {
    label: 'Active Users',
    value: '18,432',
    change: '8.7%',
    trend: 'up',
    tone: 'success',
    icon: 'group',
    comparisonPeriod: 'vs May 5 – May 11',
    sparkline: [15200, 15900, 16400, 16900, 17300, 17800, 18432],
  },
  {
    label: 'Monthly Active Learners',
    value: '12,935',
    change: '10.3%',
    trend: 'up',
    tone: 'purple',
    icon: 'school',
    comparisonPeriod: 'vs Apr 14 – May 11',
    sparkline: [10200, 10800, 11400, 11900, 12200, 12600, 12935],
  },
  {
    label: 'Lessons Completed',
    value: '64,283',
    change: '12.6%',
    trend: 'up',
    tone: 'orange',
    icon: 'play_circle',
    comparisonPeriod: 'vs May 5 – May 11',
    sparkline: [52000, 54500, 57000, 59200, 61500, 63000, 64283],
  },
  {
    label: 'Assessments Completed',
    value: '21,476',
    change: '9.4%',
    trend: 'up',
    tone: 'indigo',
    icon: 'fact_check',
    comparisonPeriod: 'vs May 5 – May 11',
    sparkline: [18100, 18700, 19300, 19900, 20400, 20900, 21476],
  },
  {
    label: 'Churn Risk Schools',
    value: '14',
    change: '12.5%',
    trend: 'down',
    tone: 'danger',
    icon: 'warning',
    comparisonPeriod: 'vs May 5 – May 11',
    sparkline: [22, 20, 19, 17, 16, 15, 14],
  },
];

export const PLATFORM_USAGE_TREND_DATA: PlatformUsagePoint[] = [
  { date: 'Apr 19', dayLabel: 'Sat, Apr 19', dau: 3820, formattedDau: '3,820' },
  { date: 'Apr 21', dayLabel: 'Mon, Apr 21', dau: 4650, formattedDau: '4,650' },
  { date: 'Apr 24', dayLabel: 'Thu, Apr 24', dau: 4420, formattedDau: '4,420' },
  { date: 'Apr 26', dayLabel: 'Sat, Apr 26', dau: 5120, formattedDau: '5,120' },
  { date: 'Apr 29', dayLabel: 'Tue, Apr 29', dau: 6180, formattedDau: '6,180' },
  { date: 'May 1', dayLabel: 'Thu, May 1', dau: 5890, formattedDau: '5,890' },
  { date: 'May 4', dayLabel: 'Sun, May 4', dau: 6740, formattedDau: '6,740' },
  { date: 'May 7', dayLabel: 'Wed, May 7', dau: 7842, formattedDau: '7,842' },
  { date: 'May 9', dayLabel: 'Fri, May 9', dau: 5920, formattedDau: '5,920' },
  { date: 'May 11', dayLabel: 'Sun, May 11', dau: 6140, formattedDau: '6,140' },
  { date: 'May 14', dayLabel: 'Wed, May 14', dau: 5980, formattedDau: '5,980' },
  { date: 'May 16', dayLabel: 'Fri, May 16', dau: 6320, formattedDau: '6,320' },
  { date: 'May 18', dayLabel: 'Sun, May 18', dau: 7120, formattedDau: '7,120' },
];

export const TOP_ACTIVE_INSTITUTIONS: ActiveInstitution[] = [
  {
    name: 'Greenfield International School',
    activeLearners: 2154,
    capacityPercentage: 89.7,
  },
  {
    name: 'Sunrise Public School',
    activeLearners: 1896,
    capacityPercentage: 79.0,
  },
  {
    name: 'Riverside Academy',
    activeLearners: 1542,
    capacityPercentage: 64.2,
  },
  {
    name: 'Northview High School',
    activeLearners: 1326,
    capacityPercentage: 55.2,
  },
  {
    name: 'Bright Future Academy',
    activeLearners: 1187,
    capacityPercentage: 49.4,
  },
];

export const ROLE_USAGE_DATA: RoleUsageBreakdown[] = [
  {
    role: 'Learners',
    count: 12935,
    percentage: 70.2,
    color: '#2563eb', // Blue
  },
  {
    role: 'Teachers',
    count: 3842,
    percentage: 20.9,
    color: '#10b981', // Green
  },
  {
    role: 'School Admins',
    count: 1125,
    percentage: 6.1,
    color: '#8b5cf6', // Purple
  },
  {
    role: 'Parents',
    count: 530,
    percentage: 2.8,
    color: '#f59e0b', // Amber/Orange
  },
];

export const ASSESSMENT_COMPLETION_TREND_DATA: AssessmentCompletionPoint[] = [
  {
    date: 'Apr 19',
    completed: 2100,
    inProgress: 1200,
    notStarted: 1500,
    total: 4800,
  },
  {
    date: 'Apr 24',
    completed: 2450,
    inProgress: 1350,
    notStarted: 1400,
    total: 5200,
  },
  {
    date: 'Apr 29',
    completed: 2900,
    inProgress: 1500,
    notStarted: 1600,
    total: 6000,
  },
  {
    date: 'May 4',
    completed: 3300,
    inProgress: 1650,
    notStarted: 1550,
    total: 6500,
  },
  {
    date: 'May 9',
    completed: 3650,
    inProgress: 1800,
    notStarted: 1750,
    total: 7200,
  },
  {
    date: 'May 14',
    completed: 3900,
    inProgress: 1950,
    notStarted: 1650,
    total: 7500,
  },
  {
    date: 'May 18',
    completed: 4200,
    inProgress: 2100,
    notStarted: 1800,
    total: 8100,
  },
];

export const SUBJECT_CONSUMPTION_DATA: SubjectConsumption[] = [
  { subject: 'Mathematics', value: 12842, percentage: 85.6 },
  { subject: 'Science', value: 10763, percentage: 71.7 },
  { subject: 'English', value: 8945, percentage: 59.6 },
  { subject: 'Social Studies', value: 6432, percentage: 42.8 },
  { subject: 'Computer Science', value: 5184, percentage: 34.5 },
];

export const REGION_SPREAD_DATA: RegionSpread[] = [
  {
    region: 'North',
    institutions: 78,
    activeLearners: 4312,
    growth: '8.4%',
    growthTrend: 'up',
  },
  {
    region: 'South',
    institutions: 64,
    activeLearners: 3876,
    growth: '6.1%',
    growthTrend: 'up',
  },
  {
    region: 'East',
    institutions: 52,
    activeLearners: 2945,
    growth: '5.7%',
    growthTrend: 'up',
  },
  {
    region: 'West',
    institutions: 54,
    activeLearners: 2871,
    growth: '7.9%',
    growthTrend: 'up',
  },
  {
    region: 'Total',
    institutions: 248,
    activeLearners: 13104,
    growth: '6.8%',
    growthTrend: 'up',
  },
];

export const ENGAGEMENT_HEATMAP_DATA: HeatmapCell[] = [
  // Week 1: Apr 21 – Apr 27
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Mon',
    intensity: 2,
    value: 420,
  },
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Tue',
    intensity: 3,
    value: 680,
  },
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Wed',
    intensity: 3,
    value: 710,
  },
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Thu',
    intensity: 4,
    value: 890,
  },
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Fri',
    intensity: 4,
    value: 920,
  },
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Sat',
    intensity: 1,
    value: 230,
  },
  {
    week: 'Week 1',
    weekLabel: 'Apr 21 – Apr 27',
    day: 'Sun',
    intensity: 1,
    value: 180,
  },

  // Week 2: Apr 28 – May 4
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Mon',
    intensity: 3,
    value: 650,
  },
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Tue',
    intensity: 3,
    value: 720,
  },
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Wed',
    intensity: 4,
    value: 880,
  },
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Thu',
    intensity: 4,
    value: 910,
  },
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Fri',
    intensity: 4,
    value: 950,
  },
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Sat',
    intensity: 2,
    value: 380,
  },
  {
    week: 'Week 2',
    weekLabel: 'Apr 28 – May 4',
    day: 'Sun',
    intensity: 1,
    value: 210,
  },

  // Week 3: May 5 – May 11
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Mon',
    intensity: 4,
    value: 890,
  },
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Tue',
    intensity: 4,
    value: 940,
  },
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Wed',
    intensity: 5,
    value: 1250,
  },
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Thu',
    intensity: 5,
    value: 1310,
  },
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Fri',
    intensity: 5,
    value: 1280,
  },
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Sat',
    intensity: 2,
    value: 410,
  },
  {
    week: 'Week 3',
    weekLabel: 'May 5 – May 11',
    day: 'Sun',
    intensity: 2,
    value: 320,
  },

  // Week 4: May 12 – May 18
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Mon',
    intensity: 4,
    value: 920,
  },
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Tue',
    intensity: 5,
    value: 1290,
  },
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Wed',
    intensity: 5,
    value: 1380,
  },
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Thu',
    intensity: 5,
    value: 1420,
  },
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Fri',
    intensity: 5,
    value: 1350,
  },
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Sat',
    intensity: 2,
    value: 450,
  },
  {
    week: 'Week 4',
    weekLabel: 'May 12 – May 18',
    day: 'Sun',
    intensity: 2,
    value: 340,
  },
];

export const ATTENTION_SCHOOLS_DATA: AttentionSchool[] = [
  {
    id: 'att-1',
    name: 'Oakwood High School',
    reason: 'Low engagement',
    engagementRate: 18,
    status: 'critical',
  },
  {
    id: 'att-2',
    name: 'Silverline Academy',
    reason: 'Assessment rate low',
    engagementRate: 22,
    status: 'warning',
  },
  {
    id: 'att-3',
    name: 'Pinecrest School',
    reason: 'Content usage low',
    engagementRate: 24,
    status: 'warning',
  },
];

export const ADOPTION_INSIGHTS_DATA: AdoptionInsight[] = [
  {
    id: 'adp-1',
    schoolName: 'Greenfield International School',
    metric: '41% increase in active learners',
    tag: 'Strong Growth',
    trend: 'up',
    icon: 'trending_up',
  },
  {
    id: 'adp-2',
    schoolName: 'Bright Future Academy',
    metric: '28% in assessments completed',
    tag: 'High Adoption',
    trend: 'up',
    icon: 'star',
  },
  {
    id: 'adp-3',
    schoolName: 'Riverside Academy',
    metric: '15% in lessons completed',
    tag: 'On Track',
    trend: 'up',
    icon: 'check_circle',
  },
];

export const RECENT_PLATFORM_ACTIVITIES: PlatformActivityItem[] = [
  {
    id: 'act-1',
    title: 'New school onboarded: Horizon Global School',
    timestamp: 'Today, 09:32 AM',
    icon: 'apartment',
    type: 'school',
  },
  {
    id: 'act-2',
    title: 'Assessment created: Grade 8 Science Quiz',
    timestamp: 'Today, 08:47 AM',
    icon: 'assignment',
    type: 'assessment',
  },
  {
    id: 'act-3',
    title: 'Bulk user import completed: 320 users',
    timestamp: 'Today, 07:15 AM',
    icon: 'group_add',
    type: 'user',
  },
  {
    id: 'act-4',
    title: 'Content published: Physics – Motion (Grade 10)',
    timestamp: 'Yesterday, 05:42 PM',
    icon: 'menu_book',
    type: 'content',
  },
  {
    id: 'act-5',
    title: 'System update: v2.5.1 deployed successfully',
    timestamp: 'Yesterday, 02:18 PM',
    icon: 'build_circle',
    type: 'system',
  },
];

export const PERFORMANCE_SUMMARY_DATA: AnalyticsPerformanceSummary = {
  avgSessionDuration: '24m 36s',
  sessionDurationChange: '↑ 6.3% vs May 5 – May 11',
  retentionRate: '82.4%',
  retentionChange: '↑ 3.4% vs Apr 14 – May 11',
  ticketVolume: 156,
  ticketVolumeChange: '↓ 8.7% vs May 5 – May 11',
  systemStatus: 'All Systems Operational',
  dataSyncHealth: '100%',
  lastSynced: 'Today, 08:12 AM',
};
