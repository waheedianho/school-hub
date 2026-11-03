import { SidebarSection } from '@school-hub/layout';

export const SCHOOL_ADMIN_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Main',
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/school-admin/dashboard',
      },
    ],
  },
  {
    heading: 'Academic',
    items: [
      {
        label: 'Students',
        icon: 'school',
        children: [
          { label: 'All Students', route: '/school-admin/students' },
          { label: 'Admissions', route: '/school-admin/students/admissions' },
          { label: 'Promotions', route: '/school-admin/students/promotions' },
        ],
      },
      {
        label: 'Teachers',
        icon: 'person',
        children: [
          { label: 'All Teachers', route: '/school-admin/teachers' },
          { label: 'Add Teacher', route: '/school-admin/teachers/add' },
        ],
      },
      {
        label: 'Classes',
        icon: 'class',
        route: '/school-admin/classes',
      },
      {
        label: 'Subjects',
        icon: 'auto_stories',
        route: '/school-admin/subjects',
      },
      {
        label: 'Timetable',
        icon: 'calendar_month',
        route: '/school-admin/timetable',
      },
      {
        label: 'Exams',
        icon: 'quiz',
        children: [
          { label: 'Exam Schedule', route: '/school-admin/exams/schedule' },
          { label: 'Results', route: '/school-admin/exams/results' },
          { label: 'Grade Settings', route: '/school-admin/exams/grades' },
        ],
      },
    ],
  },
  {
    heading: 'Administration',
    items: [
      {
        label: 'Attendance',
        icon: 'fact_check',
        route: '/school-admin/attendance',
      },
      {
        label: 'Fees & Payments',
        icon: 'payments',
        children: [
          { label: 'Fee Structure', route: '/school-admin/fees/structure' },
          { label: 'Invoices', route: '/school-admin/fees/invoices' },
          { label: 'Transactions', route: '/school-admin/fees/transactions' },
        ],
      },
      {
        label: 'Announcements',
        icon: 'campaign',
        route: '/school-admin/announcements',
      },
      {
        label: 'Library',
        icon: 'local_library',
        route: '/school-admin/library',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'School Setup',
        icon: 'apartment',
        route: '/school-admin/setup',
      },
      {
        label: 'Settings & Permissions',
        icon: 'settings',
        route: '/school-admin/settings',
      },
    ],
  },
];
