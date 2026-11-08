export interface SchoolAdminPage {
  path: string;
  label: string;
  icon: string;
  description: string;
  badge?: string;
  badgeClass?: string;
}

/**
 * The 14 official School Admin portal pages in the order defined by the product designs (.design/SCHOOL ADMIN/).
 */
export const SCHOOL_ADMIN_PAGES: SchoolAdminPage[] = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    description:
      'School-wide overview of learners, staff, curriculum progress, attendance, and alerts.',
  },
  {
    path: 'school-setup',
    label: 'School Setup',
    icon: 'domain',
    description:
      'Configure school structure, academic sessions, terms, grading systems, and departments.',
  },
  {
    path: 'classes-learners',
    label: 'Classes & Learners',
    icon: 'groups',
    description:
      'Manage class streams, learner rosters, student admissions, and capacity tracking.',
  },
  {
    path: 'teachers-staff',
    label: 'Teachers & Staff',
    icon: 'badge',
    description:
      'Manage teaching staff directories, workloads, subject allocations, and staff qualifications.',
  },
  {
    path: 'subjects-curriculum',
    label: 'Subjects & Curriculum',
    icon: 'menu_book',
    description:
      'Monitor curriculum pacing, scheme of work compliance, syllabus coverage, and learning objectives.',
  },
  {
    path: 'lessons-oversight',
    label: 'Lessons & Delivery Oversight',
    icon: 'co_present',
    description:
      'Supervise structured lesson pack deliveries, weekly pacing, and teacher instructional timelines.',
  },
  {
    path: 'live-classes',
    label: 'Live Classes',
    icon: 'videocam',
    description:
      'Oversee real-time virtual classrooms, attendance logs, scheduled broadcasts, and session recordings.',
  },
  {
    path: 'assessments-gradebooks',
    label: 'Assessments & Gradebooks',
    icon: 'fact_check',
    description:
      'Audit school continuous assessments, term examinations, and teacher gradebook completion status.',
  },
  {
    path: 'reports',
    label: 'Reports & Report Cards',
    icon: 'analytics',
    description:
      'Generate term performance analytics, cohort summaries, subject diagnostics, and official report cards.',
  },
  {
    path: 'interventions',
    label: 'Interventions',
    icon: 'health_and_safety',
    description:
      'Track academic intervention cohorts, students below 50%, attendance risks, and support workflows.',
  },
  {
    path: 'resources',
    label: 'Resources',
    icon: 'folder_shared',
    description:
      'Manage institutional repository, digital teaching aids, textbooks, curriculum guides, and media.',
  },
  {
    path: 'communication',
    label: 'Communication',
    icon: 'forum',
    description:
      'Broadcast school announcements, circulars, and monitor communications with parents, staff, and learners.',
  },
  {
    path: 'calendar',
    label: 'Calendar',
    icon: 'calendar_month',
    description:
      'Schedule term dates, continuous assessments, examination windows, school holidays, and events.',
  },
  {
    path: 'settings',
    label: 'Settings & Permissions',
    icon: 'settings',
    description:
      'Manage administrative roles, security policies, access permissions, notifications, and portal settings.',
  },
];

export function getSchoolAdminPage(path: string): SchoolAdminPage | undefined {
  return SCHOOL_ADMIN_PAGES.find((page) => page.path === path);
}
