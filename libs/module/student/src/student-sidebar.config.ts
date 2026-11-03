import { SidebarSection } from '@school-hub/layout';

export const STUDENT_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Main',
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/student/dashboard',
      },
      {
        label: 'My Courses',
        icon: 'menu_book',
        route: '/student/courses',
      },
      {
        label: 'Assignments',
        icon: 'assignment',
        route: '/student/assignments',
        badge: '3',
        badgeClass: 'text-orange-500 bg-orange-50 dark:bg-[#ffffff14]',
      },
      {
        label: 'Exams & Results',
        icon: 'quiz',
        route: '/student/results',
      },
      {
        label: 'Timetable',
        icon: 'calendar_month',
        route: '/student/timetable',
      },
    ],
  },
  {
    heading: 'Resources',
    items: [
      {
        label: 'Library',
        icon: 'local_library',
        route: '/student/library',
      },
      {
        label: 'Attendance',
        icon: 'fact_check',
        route: '/student/attendance',
      },
      {
        label: 'Fees & Payments',
        icon: 'payments',
        route: '/student/fees',
      },
      {
        label: 'Announcements',
        icon: 'campaign',
        route: '/student/announcements',
      },
    ],
  },
];
