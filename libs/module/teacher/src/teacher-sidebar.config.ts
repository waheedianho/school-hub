import { SidebarSection } from '@school-hub/layout';
import { TEACHER_PAGES } from './teacher-pages.config';

export const TEACHER_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Teacher',
    items: TEACHER_PAGES.map((page) => ({
      label: page.label,
      icon: page.icon,
      route: `/teacher/${page.path}`,
      exact: false,
    })),
  },
];
