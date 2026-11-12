import { SidebarSection } from '@school-hub/layout';
import { SUPER_ADMIN_PAGES } from './super-admin-pages.config';

export const SUPER_ADMIN_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Super Admin',
    items: SUPER_ADMIN_PAGES.map((page) => ({
      label: page.label,
      icon: page.icon,
      route: `/super-admin/${page.path}`,
      exact: false,
      badge: page.badge,
      badgeClass: page.badgeClass,
    })),
  },
];
