export interface ReportsMetric {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  tone: 'purple' | 'orange' | 'green' | 'blue';
  subtitleTone?: 'green' | 'orange' | 'blue' | 'default';
}

export interface ReportsFilterValues {
  className: string;
  subject: string;
  term: string;
  dateRange: string;
}

export interface PerformanceTrendPoint {
  label: string;
  value: number;
}

export interface SubjectPerformanceItem {
  subject: string;
  score: number;
}

export interface MasteryDistributionItem {
  category: string;
  range: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TopicMasteryItem {
  id: string;
  topic: string;
  subject: string;
  averageScore: number;
  masteryLevel: 'Strong' | 'Good' | 'Developing' | 'Weak';
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface GeneratedReportItem {
  id: string;
  name: string;
  className: string;
  subjectScope: string;
  dateGenerated: string;
  generatedBy: string;
  status: 'Ready' | 'Shared' | 'Pending';
}

export interface QuickReportType {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ReportLearnerAttentionItem {
  id: string;
  name: string;
  avatarText: string;
  avatarColor: string;
  className: string;
  subject: string;
  status: 'Below Mastery' | 'Developing';
  score: number;
}

export interface LearnerReportDetail {
  id: string;
  name: string;
  learnerId: string;
  avatarText: string;
  avatarColor: string;
  className: string;
  subjectLoad: string;
  age: string;
  guardian: string;
  status: 'Active';
  metrics: ReportsMetric[];
  trendPoints: PerformanceTrendPoint[];
  subjectPerformance: SubjectPerformanceItem[];
  topicMastery: TopicMasteryItem[];
  recentAssessments: {
    id: string;
    title: string;
    subject: string;
    date: string;
    score: number;
    teacherRemark: string;
  }[];
  keyStrengths: string[];
  interventionsNeeded: string[];
  portfolioEvidence: {
    id: string;
    title: string;
    subject: string;
    date: string;
  }[];
  commentsPlan: {
    strengths: string[];
    weakAreas: string[];
    nextSteps: string[];
  };
}

export const TEACHER_REPORTS_METRICS: ReportsMetric[] = [
  {
    id: 'average-class-score',
    label: 'Average Class Score',
    value: '72%',
    subtitle: '↑ 6% vs last term',
    icon: 'trending_up',
    tone: 'purple',
    subtitleTone: 'green',
  },
  {
    id: 'learners-below-mastery',
    label: 'Learners Below Mastery',
    value: 18,
    subtitle: '16% of total learners',
    icon: 'person_alert',
    tone: 'orange',
    subtitleTone: 'orange',
  },
  {
    id: 'portfolio-completion-rate',
    label: 'Portfolio Completion Rate',
    value: '78%',
    subtitle: '↑ 9% vs last term',
    icon: 'assignment_turned_in',
    tone: 'green',
    subtitleTone: 'green',
  },
  {
    id: 'parent-reports-ready',
    label: 'Parent Reports Ready',
    value: 24,
    subtitle: 'Ready to share',
    icon: 'description',
    tone: 'blue',
    subtitleTone: 'blue',
  },
];

export const PERFORMANCE_TREND_DATA: PerformanceTrendPoint[] = [
  { label: 'Apr 14–20', value: 60 },
  { label: 'Apr 21–27', value: 64 },
  { label: 'Apr 28–May 4', value: 68 },
  { label: 'May 5–11', value: 71 },
  { label: 'May 12–18', value: 72 },
];

export const CLASS_SUBJECT_PERFORMANCE_DATA: SubjectPerformanceItem[] = [
  { subject: 'English Lang.', score: 78 },
  { subject: 'Mathematics', score: 72 },
  { subject: 'Basic Science', score: 68 },
  { subject: 'Civic Educ.', score: 66 },
  { subject: 'Igbo Lang.', score: 75 },
];

export const MASTERY_DISTRIBUTION_DATA: MasteryDistributionItem[] = [
  {
    category: 'Strong',
    range: '80–100%',
    count: 34,
    percentage: 30,
    color: '#22c55e',
  },
  {
    category: 'Good',
    range: '60–79%',
    count: 43,
    percentage: 38,
    color: '#3b82f6',
  },
  {
    category: 'Developing',
    range: '40–59%',
    count: 24,
    percentage: 21,
    color: '#f97316',
  },
  {
    category: 'Weak',
    range: '0–39%',
    count: 11,
    percentage: 10,
    color: '#ef4444',
  },
];

export const TOPIC_MASTERY_DATA: TopicMasteryItem[] = [
  {
    id: 'top-1',
    topic: 'Whole Numbers',
    subject: 'Mathematics',
    averageScore: 76,
    masteryLevel: 'Good',
    trend: '7%',
    trendDirection: 'up',
  },
  {
    id: 'top-2',
    topic: 'Parts of Speech',
    subject: 'English Language',
    averageScore: 71,
    masteryLevel: 'Good',
    trend: '5%',
    trendDirection: 'up',
  },
  {
    id: 'top-3',
    topic: 'Fractions',
    subject: 'Mathematics',
    averageScore: 58,
    masteryLevel: 'Developing',
    trend: '3%',
    trendDirection: 'up',
  },
  {
    id: 'top-4',
    topic: 'Reading Comprehension',
    subject: 'English Language',
    averageScore: 63,
    masteryLevel: 'Developing',
    trend: '2%',
    trendDirection: 'down',
  },
];

export const RECENT_GENERATED_REPORTS: GeneratedReportItem[] = [
  {
    id: 'rep-1',
    name: 'JSS 1A – Third Term Progress Report',
    className: 'JSS 1A',
    subjectScope: 'All Subjects',
    dateGenerated: 'May 12, 2025, 9:15 AM',
    generatedBy: 'Mr. Tunde A.',
    status: 'Ready',
  },
  {
    id: 'rep-2',
    name: 'Mathematics Assessment Analysis',
    className: 'JSS 1A',
    subjectScope: 'Mathematics',
    dateGenerated: 'May 10, 2025, 4:32 PM',
    generatedBy: 'Mr. Tunde A.',
    status: 'Ready',
  },
  {
    id: 'rep-3',
    name: 'English Language Report Card',
    className: 'JSS 1A',
    subjectScope: 'English Language',
    dateGenerated: 'May 8, 2025, 2:18 PM',
    generatedBy: 'Mr. Tunde A.',
    status: 'Shared',
  },
  {
    id: 'rep-4',
    name: 'Basic Science Topic Mastery Report',
    className: 'JSS 1A',
    subjectScope: 'Basic Science',
    dateGenerated: 'May 6, 2025, 11:05 AM',
    generatedBy: 'Mr. Tunde A.',
    status: 'Ready',
  },
];

export const QUICK_REPORTS_LIST: QuickReportType[] = [
  {
    id: 'progress-report',
    title: 'Progress Report',
    description: 'Individual student progress overview',
    icon: 'analytics',
  },
  {
    id: 'report-card',
    title: 'Report Card',
    description: 'Comprehensive term report card',
    icon: 'assignment',
  },
  {
    id: 'assessment-analysis',
    title: 'Assessment Analysis',
    description: 'Item & performance analysis',
    icon: 'trending_up',
  },
  {
    id: 'misconception-report',
    title: 'Misconception Report',
    description: 'Common learning gaps & misconceptions',
    icon: 'fact_check',
  },
];

export const REPORT_LEARNERS_ATTENTION: ReportLearnerAttentionItem[] = [
  {
    id: 'lrn-attn-1',
    name: 'Emeka Bassey',
    avatarText: 'EB',
    avatarColor: '#6366f1',
    className: 'JSS 1A',
    subject: 'Mathematics',
    status: 'Below Mastery',
    score: 38,
  },
  {
    id: 'lrn-attn-2',
    name: 'Fatima Yusuf',
    avatarText: 'FY',
    avatarColor: '#10b981',
    className: 'JSS 1A',
    subject: 'English Language',
    status: 'Developing',
    score: 46,
  },
  {
    id: 'lrn-attn-3',
    name: 'Daniel Okafor',
    avatarText: 'DO',
    avatarColor: '#3b82f6',
    className: 'JSS 1A',
    subject: 'Basic Science',
    status: 'Developing',
    score: 49,
  },
  {
    id: 'lrn-attn-4',
    name: 'Aisha Ahmed',
    avatarText: 'AA',
    avatarColor: '#ec4899',
    className: 'JSS 1A',
    subject: 'Mathematics',
    status: 'Developing',
    score: 52,
  },
];

export const MARYAM_REPORT_ANALYSIS_DETAIL: LearnerReportDetail = {
  id: 'lrn-24-00158',
  name: 'Maryam Ibrahim',
  learnerId: 'LRN-24-00158',
  avatarText: 'MI',
  avatarColor: '#8b5cf6',
  className: 'JSS 1A',
  subjectLoad: '5 Subjects',
  age: '13 years',
  guardian: 'Hajia A. Ibrahim (Mother)',
  status: 'Active',
  metrics: [
    {
      id: 'overall-average-score',
      label: 'Overall Average Score',
      value: '76%',
      subtitle: '↑ 8% vs last term',
      icon: 'trending_up',
      tone: 'purple',
      subtitleTone: 'green',
    },
    {
      id: 'mastery-level',
      label: 'Mastery Level',
      value: 'Good',
      subtitle: 'Improving steadily',
      icon: 'military_tech',
      tone: 'orange',
      subtitleTone: 'default',
    },
    {
      id: 'attendance-rate',
      label: 'Attendance Rate',
      value: '92%',
      subtitle: '↑ 5% vs last term',
      icon: 'event',
      tone: 'green',
      subtitleTone: 'green',
    },
    {
      id: 'portfolio-completion',
      label: 'Portfolio Completion',
      value: '78%',
      subtitle: '28 of 36 tasks',
      icon: 'assignment_turned_in',
      tone: 'blue',
      subtitleTone: 'default',
    },
  ],
  trendPoints: [
    { label: 'Apr 14–20', value: 62 },
    { label: 'Apr 21–27', value: 66 },
    { label: 'Apr 28–May 4', value: 70 },
    { label: 'May 5–11', value: 74 },
    { label: 'May 12–18', value: 76 },
  ],
  subjectPerformance: [
    { subject: 'English Language', score: 82 },
    { subject: 'Mathematics', score: 74 },
    { subject: 'Basic Science', score: 78 },
    { subject: 'Civic Education', score: 70 },
    { subject: 'Business Studies', score: 65 },
  ],
  topicMastery: [
    {
      id: 'top-1',
      topic: 'Whole Numbers',
      subject: 'Mathematics',
      averageScore: 82,
      masteryLevel: 'Good',
      trend: '9%',
      trendDirection: 'up',
    },
    {
      id: 'top-2',
      topic: 'Parts of Speech',
      subject: 'English Language',
      averageScore: 76,
      masteryLevel: 'Good',
      trend: '6%',
      trendDirection: 'up',
    },
    {
      id: 'top-3',
      topic: 'Fractions',
      subject: 'Mathematics',
      averageScore: 68,
      masteryLevel: 'Developing',
      trend: '4%',
      trendDirection: 'down',
    },
    {
      id: 'top-4',
      topic: 'Reading Comprehension',
      subject: 'English Language',
      averageScore: 84,
      masteryLevel: 'Good',
      trend: '10%',
      trendDirection: 'up',
    },
    {
      id: 'top-5',
      topic: 'Citizenship Values',
      subject: 'Civic Education',
      averageScore: 72,
      masteryLevel: 'Good',
      trend: '5%',
      trendDirection: 'up',
    },
  ],
  recentAssessments: [
    {
      id: 'asmt-1',
      title: 'Quiz: Fractions',
      subject: 'Mathematics',
      date: 'May 13, 2025',
      score: 70,
      teacherRemark: 'Good effort. Review CDI method.',
    },
    {
      id: 'asmt-2',
      title: 'Reading Passage Test',
      subject: 'English Language',
      date: 'May 9, 2025',
      score: 82,
      teacherRemark: 'Excellent comprehension!',
    },
    {
      id: 'asmt-3',
      title: 'Test: Place Value',
      subject: 'Mathematics',
      date: 'May 6, 2025',
      score: 65,
      teacherRemark: 'Watch for place value errors.',
    },
    {
      id: 'asmt-4',
      title: 'Civic Education Quiz',
      subject: 'Civic Education',
      date: 'May 2, 2025',
      score: 75,
      teacherRemark: 'Good understanding.',
    },
    {
      id: 'asmt-5',
      title: 'Grammar Quiz',
      subject: 'English Language',
      date: 'Apr 29, 2025',
      score: 72,
      teacherRemark: 'Improve punctuation.',
    },
  ],
  keyStrengths: [
    'Excellent reading comprehension',
    'Strong grasp of basic concepts',
    'Active participation in class',
  ],
  interventionsNeeded: [
    'Word-problem interpretation',
    'Place-value confusion',
    'Punctuation and sentence structure',
  ],
  portfolioEvidence: [
    {
      id: 'port-1',
      title: 'Narrative Essay',
      subject: 'English Language',
      date: 'May 13, 2025',
    },
    {
      id: 'port-2',
      title: 'Fractions Worksheet',
      subject: 'Mathematics',
      date: 'May 10, 2025',
    },
    {
      id: 'port-3',
      title: 'Civic Project: Our Rights',
      subject: 'Civic Education',
      date: 'May 6, 2025',
    },
  ],
  commentsPlan: {
    strengths: [
      'Shows consistent improvement in reading.',
      'Demonstrates good class participation.',
      'Strong effort in assignments and quizzes.',
    ],
    weakAreas: [
      'Needs support with word-problem interpretation.',
      'Occasional place-value confusion.',
      'Punctuation and sentence structure need practice.',
    ],
    nextSteps: [
      'Practice word problems daily.',
      'Use place-value charts and examples.',
      'Complete grammar and punctuation exercises.',
    ],
  },
};
