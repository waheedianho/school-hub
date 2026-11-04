export interface StudentPage {
  path: string;
  label: string;
  icon: string;
  description: string;
}

/** Main learner pages in the order used by the design's sidebar. */
export const STUDENT_PAGES: StudentPage[] = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    description:
      'Your lessons, upcoming tasks, and learning progress at a glance.',
  },
  {
    path: 'lessons',
    label: 'My Lessons',
    icon: 'play_circle',
    description:
      'Continue learning and explore your current and upcoming lessons.',
  },
  {
    path: 'subjects',
    label: 'My Subjects',
    icon: 'menu_book',
    description: 'Explore your subjects and the topics you are learning.',
  },
  {
    path: 'assessments',
    label: 'Quizzes & Assessments',
    icon: 'quiz',
    description: 'Test your understanding and review your assessment results.',
  },
  {
    path: 'worksheets',
    label: 'Worksheets',
    icon: 'description',
    description:
      'Practise what you have learned with your assigned worksheets.',
  },
  {
    path: 'portfolio-tasks',
    label: 'Portfolio Tasks',
    icon: 'work_outline',
    description:
      'Apply your learning to practical tasks and build your portfolio.',
  },
  {
    path: 'feedback',
    label: 'Feedback',
    icon: 'chat_bubble_outline',
    description:
      'Read your tutor’s feedback and discover what to improve next.',
  },
  {
    path: 'progress',
    label: 'Progress',
    icon: 'monitoring',
    description:
      'Track your achievements, subject mastery, and learning goals.',
  },
  {
    path: 'live-classes',
    label: 'Live Classes',
    icon: 'videocam',
    description: 'Find upcoming live classes and revisit past sessions.',
  },
  {
    path: 'resources',
    label: 'Resources',
    icon: 'local_library',
    description:
      'Find videos, notes, and other materials to support your learning.',
  },
  {
    path: 'ask-tutor',
    label: 'Ask Tutor',
    icon: 'support_agent',
    description: 'Ask questions and get help from your tutors.',
  },
  {
    path: 'profile',
    label: 'Profile',
    icon: 'person_outline',
    description: 'View your learner profile, achievements, and personal goals.',
  },
  {
    path: 'settings',
    label: 'Settings',
    icon: 'settings',
    description:
      'Manage your account, learning preferences, and notifications.',
  },
];
