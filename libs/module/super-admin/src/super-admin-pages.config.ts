export interface SuperAdminPage {
  path: string;
  label: string;
  icon: string;
  description: string;
  badge?: string;
  badgeClass?: string;
}

/**
 * The 13 official Super Admin portal pages in the order defined by the product designs (.design/SUPER ADMIN/).
 */
export const SUPER_ADMIN_PAGES: SuperAdminPage[] = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    description:
      'Platform-wide operations, quality, compliance, and growth overview across all institutions.',
  },
  {
    path: 'schools',
    label: 'Schools / Institutions',
    icon: 'apartment',
    description:
      'Onboard, manage, and monitor all schools and institutions on the platform.',
  },
  {
    path: 'users-roles',
    label: 'Users & Roles',
    icon: 'group',
    description:
      'Manage platform users, role permissions, and access controls across all institutions.',
  },
  {
    path: 'curriculum-content',
    label: 'Curriculum & Content',
    icon: 'menu_book',
    description:
      'Manage master curriculum packs, content governance, and platform-wide academic assets.',
  },
  {
    path: 'assessments-qb',
    label: 'Assessments & Question Bank',
    icon: 'fact_check',
    description:
      'Manage platform-wide assessments, question assets, review workflows, and academic quality.',
  },
  {
    path: 'analytics',
    label: 'Platform Analytics',
    icon: 'bar_chart',
    description:
      'Monitor usage, adoption, academic activity, and platform performance across all institutions.',
  },
  {
    path: 'subscriptions-billing',
    label: 'Subscriptions & Billing',
    icon: 'credit_card',
    description:
      'Manage subscription plans, billing status, renewals, invoices, and platform revenue.',
  },
  {
    path: 'reports',
    label: 'Reports',
    icon: 'description',
    description:
      'Generate and review platform-wide academic, operational, subscription, and compliance reports.',
  },
  {
    path: 'safeguarding-compliance',
    label: 'Safeguarding & Compliance',
    icon: 'shield',
    description:
      'Monitor platform-wide child safety, user compliance, communication risks, and escalation workflows.',
  },
  {
    path: 'support-centre',
    label: 'Support Centre',
    icon: 'headset_mic',
    description:
      'Manage platform-wide support tickets, school onboarding issues, bugs, and escalations.',
  },
  {
    path: 'resources-library',
    label: 'Resources Library',
    icon: 'folder_shared',
    description:
      'Manage platform-wide academic resources, curriculum assets, templates, and downloadable files.',
  },
  {
    path: 'system-settings',
    label: 'System Settings',
    icon: 'settings',
    description:
      'Configure global platform defaults, security, branding, notifications, integrations, and controls.',
  },
  {
    path: 'audit-logs',
    label: 'Audit Logs',
    icon: 'receipt_long',
    description:
      'Monitor platform-wide user actions, configuration changes, approvals, logins, and exports.',
  },
];

export function getSuperAdminPage(path: string): SuperAdminPage | undefined {
  return SUPER_ADMIN_PAGES.find((page) => page.path === path);
}
