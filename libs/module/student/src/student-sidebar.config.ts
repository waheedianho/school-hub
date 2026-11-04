import { SidebarSection } from '@school-hub/layout';
import { STUDENT_PAGES } from './student-pages.config';

export const STUDENT_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    heading: 'Learner',
    items: STUDENT_PAGES.map((page) => ({
      label: page.label,
      icon: page.icon,
      route: `/student/${page.path}`,
      exact: false,
    })),
  },
];
