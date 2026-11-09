import { SidebarSection } from '@school-hub/layout';

export const SUPER_ADMIN_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Main',
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/super-admin/dashboard',
      },
    ],
  },
  {
    heading: 'Management',
    items: [
      {
        label: 'Schools',
        icon: 'apartment',
        children: [
          { label: 'All Schools', route: '/super-admin/schools' },
          { label: 'Add School', route: '/super-admin/schools/add' },
        ],
      },
      {
        label: 'Admins',
        icon: 'admin_panel_settings',
        route: '/super-admin/admins',
      },
      {
        label: 'Subscriptions',
        icon: 'credit_card',
        route: '/super-admin/subscriptions',
      },
    ],
  },
  {
    heading: 'System',
    items: [
      {
        label: 'Platform Settings',
        icon: 'settings',
        route: '/super-admin/settings',
      },
      {
        label: 'Audit Logs',
        icon: 'history',
        route: '/super-admin/audit-logs',
      },
      {
        label: 'Reports',
        icon: 'analytics',
        route: '/super-admin/reports',
      },
    ],
  },
];
