import { SidebarSection } from '@school-hub/layout';
import { SCHOOL_ADMIN_PAGES } from './school-admin-pages.config';

export const SCHOOL_ADMIN_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'School Admin',
    items: SCHOOL_ADMIN_PAGES.map((page) => ({
      label: page.label,
      icon: page.icon,
      route: `/school-admin/${page.path}`,
      exact: false,
      badge: page.badge,
      badgeClass: page.badgeClass,
    })),
  },
];
