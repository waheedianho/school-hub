import { Routes } from '@angular/router';
import { SchoolAdminLayoutComponent } from './school-admin-layout';
import { SchoolAdmin } from './school-admin';
import { SCHOOL_ADMIN_PAGES } from './school-admin-pages.config';

export const schoolAdminRoutes: Routes = [
  {
    path: '',
    component: SchoolAdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard | SchoolHub Admin',
        loadComponent: () =>
          import('./dashboard/school-admin-dashboard').then(
            (m) => m.SchoolAdminDashboardComponent,
          ),
      },
      {
        path: 'school-setup',
        title: 'School Setup | SchoolHub Admin',
        loadComponent: () =>
          import('./school-setup/school-setup').then(
            (m) => m.SchoolSetupComponent,
          ),
      },
      // Convenience aliases for intuitive navigation
      { path: 'setup', redirectTo: 'school-setup', pathMatch: 'full' },
      { path: 'classes', redirectTo: 'classes-learners', pathMatch: 'full' },
      { path: 'students', redirectTo: 'classes-learners', pathMatch: 'full' },
      { path: 'learners', redirectTo: 'classes-learners', pathMatch: 'full' },
      { path: 'teachers', redirectTo: 'teachers-staff', pathMatch: 'full' },
      { path: 'staff', redirectTo: 'teachers-staff', pathMatch: 'full' },
      {
        path: 'curriculum',
        redirectTo: 'subjects-curriculum',
        pathMatch: 'full',
      },
      {
        path: 'subjects',
        redirectTo: 'subjects-curriculum',
        pathMatch: 'full',
      },
      { path: 'lessons', redirectTo: 'lessons-oversight', pathMatch: 'full' },
      { path: 'delivery', redirectTo: 'lessons-oversight', pathMatch: 'full' },
      {
        path: 'gradebook',
        redirectTo: 'assessments-gradebooks',
        pathMatch: 'full',
      },
      {
        path: 'gradebooks',
        redirectTo: 'assessments-gradebooks',
        pathMatch: 'full',
      },
      {
        path: 'assessments',
        redirectTo: 'assessments-gradebooks',
        pathMatch: 'full',
      },
      { path: 'messages', redirectTo: 'communication', pathMatch: 'full' },
      // Register all remaining portal pages
      ...SCHOOL_ADMIN_PAGES.filter(
        (page) => page.path !== 'dashboard' && page.path !== 'school-setup',
      ).map((page) => ({
        path: page.path,
        component: SchoolAdmin,
        title: `${page.label} | SchoolHub Admin`,
        data: { page },
      })),
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
