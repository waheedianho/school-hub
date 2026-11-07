export interface TeacherLessonMetric {
  id: string;
  label: string;
  value: number | string;
  subtext: string;
  subtextType?: 'active' | 'growth' | 'neutral';
  icon: string;
  tone: 'purple' | 'green' | 'blue' | 'orange' | 'indigo';
}

export interface TeacherMaterialItem {
  id: string;
  name: string;
  icon: string;
}

export interface TeacherTopicDeliveryPack {
  id: string;
  topic: string;
  className: string;
  classTone: 'purple' | 'blue' | 'green';
  subject: string;
  week: string;
  status: 'Ready' | 'In Progress' | 'Pending Review';
  materials: string[]; // icon names or IDs
  materialsExtraCount?: number;
  lastUpdated: string;
}

export interface TeacherSelectedPackOverview {
  id: string;
  title: string;
  subject: string;
  className: string;
  week: string;
  readinessStatus: 'Ready to Teach' | 'In Progress' | 'Pending Review';
  checklist: {
    label: string;
    completed: boolean;
  }[];
}

export interface TeacherMisconceptionNote {
  id: string;
  title: string;
  snippet: string;
  topic: string;
}

export interface TeacherLessonTimelineItem {
  id: string;
  dateText: string;
  timeRange: string;
  className: string;
  subject: string;
  classTone: 'purple' | 'blue' | 'green';
}

export interface TeacherPackCompletionTier {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TeacherLessonQuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const TEACHER_LESSONS_METRICS: TeacherLessonMetric[] = [
  {
    id: 'total-packs',
    label: 'Total Delivery Packs',
    value: 128,
    subtext: 'Across all classes',
    icon: 'ri-stack-line',
    tone: 'purple',
  },
  {
    id: 'ready-to-teach',
    label: 'Ready to Teach',
    value: 86,
    subtext: '67% of total',
    icon: 'ri-checkbox-circle-line',
    tone: 'green',
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    value: 28,
    subtext: '22% of total',
    icon: 'ri-time-line',
    tone: 'blue',
  },
  {
    id: 'pending-review',
    label: 'Pending Review',
    value: 14,
    subtext: '11% of total',
    icon: 'ri-hourglass-2-line',
    tone: 'orange',
  },
  {
    id: 'lessons-this-week',
    label: 'Lessons This Week',
    value: 16,
    subtext: 'Across 6 classes',
    icon: 'ri-calendar-line',
    tone: 'indigo',
  },
];

export const TEACHER_TOPIC_DELIVERY_PACKS: TeacherTopicDeliveryPack[] = [
  {
    id: 'tdp-1',
    topic: 'Parts of Speech',
    className: 'JSS 1A',
    classTone: 'purple',
    subject: 'English Language',
    week: 'Week 4',
    status: 'Ready',
    materials: [
      'ri-file-text-line',
      'ri-book-open-line',
      'ri-slideshow-line',
      'ri-file-list-line',
      'ri-checkbox-line',
      'ri-video-line',
    ],
    materialsExtraCount: 1,
    lastUpdated: 'Today, 9:15 AM',
  },
  {
    id: 'tdp-2',
    topic: 'Sentence Structure',
    className: 'JSS 1B',
    classTone: 'blue',
    subject: 'English Language',
    week: 'Week 5',
    status: 'In Progress',
    materials: [
      'ri-file-text-line',
      'ri-book-open-line',
      'ri-slideshow-line',
      'ri-file-list-line',
      'ri-checkbox-line',
      'ri-video-line',
    ],
    materialsExtraCount: 1,
    lastUpdated: 'Yesterday, 4:30 PM',
  },
  {
    id: 'tdp-3',
    topic: 'Whole Numbers',
    className: 'JSS 1A',
    classTone: 'purple',
    subject: 'Mathematics',
    week: 'Week 4',
    status: 'Ready',
    materials: [
      'ri-file-text-line',
      'ri-book-open-line',
      'ri-slideshow-line',
      'ri-file-list-line',
      'ri-checkbox-line',
      'ri-video-line',
    ],
    materialsExtraCount: 1,
    lastUpdated: 'Today, 8:20 AM',
  },
  {
    id: 'tdp-4',
    topic: 'Plant Cells',
    className: 'JSS 2A',
    classTone: 'green',
    subject: 'Basic Science',
    week: 'Week 4',
    status: 'Pending Review',
    materials: [
      'ri-file-text-line',
      'ri-book-open-line',
      'ri-slideshow-line',
      'ri-file-list-line',
      'ri-checkbox-line',
      'ri-video-line',
    ],
    materialsExtraCount: 1,
    lastUpdated: '2 days ago',
  },
];

export const TEACHER_SELECTED_PACK_OVERVIEW: TeacherSelectedPackOverview = {
  id: 'tdp-1',
  title: 'Parts of Speech – Week 4 Pack',
  subject: 'English Language',
  className: 'JSS 1A',
  week: 'Week 4',
  readinessStatus: 'Ready to Teach',
  checklist: [
    { label: 'Curriculum Objective', completed: true },
    { label: 'Lesson Note', completed: true },
    { label: 'Tutor Guide', completed: true },
    { label: 'Guided Examples', completed: true },
    { label: 'Worksheet', completed: true },
    { label: 'Quiz / Assessment', completed: true },
    { label: 'Misconception Notes', completed: true },
    { label: 'Portfolio Task', completed: true },
    { label: 'Parent Explanation', completed: true },
    { label: 'Slide Deck', completed: true },
    { label: 'Video Link', completed: true },
  ],
};

export const TEACHER_MISCONCEPTION_NOTES: TeacherMisconceptionNote[] = [
  {
    id: 'mn-1',
    title: 'Confusing adjectives with adverbs',
    snippet:
      "Learners often use 'very quick' (adjective) in place of 'very quickly' (adverb).",
    topic: 'Parts of Speech',
  },
  {
    id: 'mn-2',
    title: 'Place-value confusion in whole numbers',
    snippet:
      'Learners struggle to identify the value of digits in larger numbers.',
    topic: 'Whole Numbers',
  },
];

export const TEACHER_LESSON_TIMELINE: TeacherLessonTimelineItem[] = [
  {
    id: 'lt-1',
    dateText: 'Today, 2 May 2026',
    timeRange: '8:30 – 9:30 AM',
    className: 'JSS 1A',
    subject: 'English Language',
    classTone: 'purple',
  },
  {
    id: 'lt-2',
    dateText: 'Today, 2 May 2026',
    timeRange: '11:00 AM – 12:00 PM',
    className: 'JSS 1B',
    subject: 'English Language',
    classTone: 'blue',
  },
  {
    id: 'lt-3',
    dateText: 'Tomorrow, 3 May 2026',
    timeRange: '10:00 – 11:00 AM',
    className: 'JSS 2A',
    subject: 'Basic Science',
    classTone: 'green',
  },
];

export const TEACHER_PACK_COMPLETION_TIERS: TeacherPackCompletionTier[] = [
  { label: 'Ready', count: 86, percentage: 67, color: '#10b981' },
  { label: 'In Progress', count: 28, percentage: 22, color: '#3b82f6' },
  { label: 'Pending Review', count: 14, percentage: 11, color: '#f59e0b' },
];

export const TEACHER_LESSONS_QUICK_ACTIONS: TeacherLessonQuickAction[] = [
  {
    id: 'qa-create',
    label: 'Create New Pack',
    icon: 'ri-add-line',
    route: '/teacher/lessons',
  },
  {
    id: 'qa-open',
    label: 'Open Delivery Pack',
    icon: 'ri-folder-open-line',
    route: '/teacher/lessons',
  },
  {
    id: 'qa-upload',
    label: 'Upload Worksheet',
    icon: 'ri-upload-2-line',
    route: '/teacher/assignments',
  },
  {
    id: 'qa-attach',
    label: 'Attach Assessment',
    icon: 'ri-checkbox-line',
    route: '/teacher/assessments',
  },
  {
    id: 'qa-scheme',
    label: 'View Scheme of Work',
    icon: 'ri-book-open-line',
    route: '/teacher/curriculum',
  },
];
