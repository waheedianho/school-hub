export interface TeacherCurriculumMetric {
  id: string;
  label: string;
  value: number | string;
  subtext: string;
  subtextType?: 'active' | 'growth' | 'neutral';
  icon: string;
  tone: 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

export interface TeacherAssignedSubject {
  id: string;
  subject: string;
  subjectTone: 'purple' | 'blue' | 'green';
  subjectIcon: string;
  classesCount: number;
  classesList: string;
  term: string;
  currentWeek: string;
  dateRange: string;
  currentTopic: string;
  coverageStatus: 'On Track' | 'Needs Attention';
  coveragePercentage: number;
  deliveryPackStatus: 'Ready' | 'In Progress';
  deliveryPackCount: string;
  averagePerformance: number;
}

export interface TeacherWeeklyFocusItem {
  id: string;
  className: string;
  classTone: 'purple' | 'blue' | 'green';
  subject: string;
  topic: string;
  status: 'On Track' | 'Needs Attention' | 'Upcoming';
  statusTone: 'green' | 'orange' | 'purple';
}

export interface TeacherWeekCoverage {
  week: number;
  status: 'completed' | 'in-progress' | 'upcoming';
  topicName?: string;
}

export interface TeacherTopicObjective {
  subject: string;
  topic: string;
  objective: string;
  academicFocus: string;
  misconception: string;
  linkedPackTitle: string;
  linkedPackStatus: 'Ready' | 'In Progress';
}

export interface TeacherUpcomingTopic {
  weekNumber: number;
  title: string;
  dateRange: string;
  status: 'Upcoming';
}

export interface TeacherCurriculumQuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  tone: 'purple' | 'blue';
}

export const TEACHER_CURRICULUM_METRICS: TeacherCurriculumMetric[] = [
  {
    id: 'total-subjects',
    label: 'Total Subjects',
    value: 3,
    subtext: 'Across all classes',
    subtextType: 'neutral',
    icon: 'ri-book-open-line',
    tone: 'purple',
  },
  {
    id: 'active-classes',
    label: 'Active Classes',
    value: 5,
    subtext: 'You are teaching',
    subtextType: 'neutral',
    icon: 'ri-group-line',
    tone: 'blue',
  },
  {
    id: 'curriculum-coverage',
    label: 'Curriculum Coverage',
    value: '68%',
    subtext: '↑ 8% vs last term',
    subtextType: 'growth',
    icon: 'ri-pie-chart-line',
    tone: 'green',
  },
  {
    id: 'current-topics',
    label: 'Current Topics This Week',
    value: 7,
    subtext: 'Across all classes',
    subtextType: 'neutral',
    icon: 'ri-calendar-event-line',
    tone: 'orange',
  },
  {
    id: 'delivery-packs',
    label: 'Delivery Packs Ready',
    value: 12,
    subtext: 'Ready to deliver',
    subtextType: 'neutral',
    icon: 'ri-graduation-cap-line',
    tone: 'pink',
  },
];

export const TEACHER_ASSIGNED_SUBJECTS: TeacherAssignedSubject[] = [
  {
    id: 'eng-lang',
    subject: 'English Language',
    subjectTone: 'purple',
    subjectIcon: 'ri-book-open-line',
    classesCount: 3,
    classesList: 'JSS 1A, 1B, 2A',
    term: 'Term 1 2025/2026',
    currentWeek: 'Week 4',
    dateRange: 'May 5 – May 11',
    currentTopic: 'Parts of Speech',
    coverageStatus: 'On Track',
    coveragePercentage: 68,
    deliveryPackStatus: 'Ready',
    deliveryPackCount: '3/3',
    averagePerformance: 74,
  },
  {
    id: 'math',
    subject: 'Mathematics',
    subjectTone: 'blue',
    subjectIcon: 'ri-function-line',
    classesCount: 2,
    classesList: 'JSS 1A, 2A',
    term: 'Term 1 2025/2026',
    currentWeek: 'Week 4',
    dateRange: 'May 5 – May 11',
    currentTopic: 'Linear Equations',
    coverageStatus: 'Needs Attention',
    coveragePercentage: 52,
    deliveryPackStatus: 'In Progress',
    deliveryPackCount: '1/2',
    averagePerformance: 61,
  },
  {
    id: 'basic-sci',
    subject: 'Basic Science',
    subjectTone: 'green',
    subjectIcon: 'ri-flask-line',
    classesCount: 3,
    classesList: 'JSS 1A, 1B, 2A',
    term: 'Term 1 2025/2026',
    currentWeek: 'Week 4',
    dateRange: 'May 5 – May 11',
    currentTopic: 'Plant Cells',
    coverageStatus: 'On Track',
    coveragePercentage: 71,
    deliveryPackStatus: 'Ready',
    deliveryPackCount: '3/3',
    averagePerformance: 77,
  },
];

export const TEACHER_WEEKLY_FOCUS_ITEMS: TeacherWeeklyFocusItem[] = [
  {
    id: 'wf-1',
    className: 'JSS 1A',
    classTone: 'purple',
    subject: 'English Language',
    topic: 'Parts of Speech',
    status: 'On Track',
    statusTone: 'green',
  },
  {
    id: 'wf-2',
    className: 'JSS 1B',
    classTone: 'blue',
    subject: 'English Language',
    topic: 'Types of Sentences',
    status: 'Needs Attention',
    statusTone: 'orange',
  },
  {
    id: 'wf-3',
    className: 'JSS 2A',
    classTone: 'green',
    subject: 'English Language',
    topic: 'Comprehension Skills',
    status: 'Upcoming',
    statusTone: 'purple',
  },
];

export const TEACHER_WEEKS_COVERAGE: TeacherWeekCoverage[] = [
  { week: 1, status: 'completed', topicName: 'Introduction to Grammar' },
  { week: 2, status: 'completed', topicName: 'Nouns and Pronouns' },
  { week: 3, status: 'completed', topicName: 'Verbs and Tenses' },
  { week: 4, status: 'in-progress', topicName: 'Parts of Speech' },
  { week: 5, status: 'upcoming', topicName: 'Sentence Structure' },
  { week: 6, status: 'upcoming', topicName: 'Direct & Indirect Speech' },
  { week: 7, status: 'upcoming', topicName: 'Active & Passive Voice' },
  { week: 8, status: 'upcoming', topicName: 'Comprehension Skills' },
  { week: 9, status: 'upcoming', topicName: 'Summary Writing' },
  { week: 10, status: 'upcoming', topicName: 'Vocabulary Development' },
  { week: 11, status: 'upcoming', topicName: 'Essay Writing' },
  { week: 12, status: 'upcoming', topicName: 'Revision' },
  { week: 13, status: 'upcoming', topicName: 'Term Examinations' },
];

export const TEACHER_TOPIC_OBJECTIVE: TeacherTopicObjective = {
  subject: 'English Language',
  topic: 'Parts of Speech',
  objective:
    'Identify and correctly use nouns, pronouns, adjectives, verbs, adverbs, prepositions, conjunctions, and interjections in sentences.',
  academicFocus: 'Improving sentence structure and grammatical accuracy.',
  misconception:
    'Confusing adjectives with adverbs; misidentifying verbs as nouns.',
  linkedPackTitle: 'Parts of Speech – Week 4 Pack',
  linkedPackStatus: 'Ready',
};

export const TEACHER_UPCOMING_TOPICS: TeacherUpcomingTopic[] = [
  {
    weekNumber: 5,
    title: 'Sentence Structure',
    dateRange: 'Week 5 • May 12 – May 18',
    status: 'Upcoming',
  },
  {
    weekNumber: 6,
    title: 'Direct and Indirect Speech',
    dateRange: 'Week 6 • May 19 – May 25',
    status: 'Upcoming',
  },
  {
    weekNumber: 7,
    title: 'Active and Passive Voice',
    dateRange: 'Week 7 • May 26 – Jun 1',
    status: 'Upcoming',
  },
  {
    weekNumber: 8,
    title: 'Comprehension Skills',
    dateRange: 'Week 8 • Jun 2 – Jun 8',
    status: 'Upcoming',
  },
];

export const TEACHER_CURRICULUM_QUICK_ACTIONS: TeacherCurriculumQuickAction[] =
  [
    {
      id: 'ca-delivery',
      label: 'Open Delivery Pack',
      icon: 'ri-folder-open-line',
      route: '/teacher/lessons',
      tone: 'purple',
    },
    {
      id: 'ca-scheme',
      label: 'View Scheme of Work',
      icon: 'ri-book-open-line',
      route: '/teacher/curriculum',
      tone: 'blue',
    },
    {
      id: 'ca-create-lesson',
      label: 'Create Lesson',
      icon: 'ri-add-circle-line',
      route: '/teacher/lessons',
      tone: 'purple',
    },
    {
      id: 'ca-worksheet',
      label: 'Assign Worksheet',
      icon: 'ri-file-list-2-line',
      route: '/teacher/assignments',
      tone: 'blue',
    },
    {
      id: 'ca-question-bank',
      label: 'Open Question Bank',
      icon: 'ri-questionnaire-line',
      route: '/teacher/assessments',
      tone: 'purple',
    },
  ];
