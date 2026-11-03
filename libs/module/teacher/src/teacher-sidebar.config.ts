import { SidebarSection } from '@school-hub/layout';

export const TEACHER_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Main',
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/teacher/dashboard',
      },
    ],
  },
  {
    heading: 'Academic',
    items: [
      {
        label: 'My Classes',
        icon: 'class',
        route: '/teacher/classes',
      },
      {
        label: 'Students',
        icon: 'school',
        route: '/teacher/students',
      },
      {
        label: 'Assignments',
        icon: 'assignment',
        route: '/teacher/assignments',
      },
      {
        label: 'Exams & Results',
        icon: 'quiz',
        children: [
          { label: 'Enter Marks', route: '/teacher/exams/marks' },
          { label: 'Results', route: '/teacher/exams/results' },
        ],
      },
      {
        label: 'Timetable',
        icon: 'calendar_month',
        route: '/teacher/timetable',
      },
      {
        label: 'Attendance',
        icon: 'fact_check',
        route: '/teacher/attendance',
      },
    ],
  },
  {
    heading: 'Resources',
    items: [
      {
        label: 'Study Materials',
        icon: 'description',
        route: '/teacher/materials',
      },
      {
        label: 'Announcements',
        icon: 'campaign',
        route: '/teacher/announcements',
      },
    ],
  },
];
