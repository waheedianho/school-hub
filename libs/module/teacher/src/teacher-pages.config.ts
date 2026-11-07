export interface TeacherPage {
  path: string;
  label: string;
  icon: string;
  description: string;
}

/** Main teacher pages in the order used by the design's sidebar. */
export const TEACHER_PAGES: TeacherPage[] = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    description:
      "Monitor today's teaching, learner performance, pending reviews, and academic priorities.",
  },
  {
    path: 'classes',
    label: 'My Classes',
    icon: 'groups',
    description:
      'Manage your classes, student rosters, schedules, and class activities.',
  },
  {
    path: 'curriculum',
    label: 'My Subjects & Curriculum',
    icon: 'menu_book',
    description:
      'Explore your assigned subjects, curriculum scope, and syllabus topics.',
  },
  {
    path: 'lessons',
    label: 'Lessons & Delivery Packs',
    icon: 'folder_open',
    description:
      'Plan, organize, and deliver structured lesson packs and teaching materials.',
  },
  {
    path: 'live-classes',
    label: 'Live Classes',
    icon: 'videocam',
    description:
      'Host interactive live sessions, view upcoming schedules, and review recordings.',
  },
  {
    path: 'assignments',
    label: 'Assignments & Submissions',
    icon: 'assignment',
    description:
      'Create assignments, track learner submissions, and provide timely grading.',
  },
  {
    path: 'assessments',
    label: 'Assessments & Question Bank',
    icon: 'quiz',
    description:
      'Build quizzes, manage question banks, and evaluate learner assessments.',
  },
  {
    path: 'gradebook',
    label: 'Gradebook',
    icon: 'grade',
    description:
      'Record marks, calculate weighted scores, and manage continuous assessment records.',
  },
  {
    path: 'learners',
    label: 'Learners',
    icon: 'school',
    description:
      'View individual student profiles, track learning needs, and review performance.',
  },
  {
    path: 'reports',
    label: 'Reports & Report Cards',
    icon: 'analytics',
    description:
      'Generate academic performance analytics, term summaries, and report cards.',
  },
  {
    path: 'resources',
    label: 'Resources',
    icon: 'folder',
    description:
      'Access digital teaching aids, reference materials, and educational media.',
  },
  {
    path: 'messages',
    label: 'Message Centre',
    icon: 'mail',
    description:
      'Communicate with learners, parents, and school administrators.',
  },
  {
    path: 'calendar',
    label: 'Calendar',
    icon: 'calendar_month',
    description:
      'View timetables, upcoming deadlines, exam schedules, and academic events.',
  },
  {
    path: 'settings',
    label: 'Settings',
    icon: 'settings',
    description:
      'Configure your profile, teaching preferences, notifications, and security settings.',
  },
];
