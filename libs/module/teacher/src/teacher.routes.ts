import { Routes } from '@angular/router';
import { TeacherLayoutComponent } from './teacher-layout';
import { Teacher } from './teacher';
import { TEACHER_PAGES } from './teacher-pages.config';

export const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard | SchoolHub',
        loadComponent: () =>
          import('./dashboard/teacher-dashboard').then(
            (m) => m.TeacherDashboardComponent,
          ),
      },
      {
        path: 'classes',
        title: 'My Classes | SchoolHub',
        loadComponent: () =>
          import('./classes/classes').then((m) => m.TeacherClassesComponent),
      },
      ...TEACHER_PAGES.filter(
        (page) => page.path !== 'dashboard' && page.path !== 'classes',
      ).map((page) => ({
        path: page.path,
        component: Teacher,
        title: `${page.label} | SchoolHub`,
        data: { page },
      })),
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
