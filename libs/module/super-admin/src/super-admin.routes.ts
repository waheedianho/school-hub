import { Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './super-admin-layout';
import { SuperAdmin } from './super-admin';
import { SUPER_ADMIN_PAGES } from './super-admin-pages.config';

export const superAdminRoutes: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Super Admin Dashboard | Learno Super Admin',
        loadComponent: () =>
          import('./dashboard/super-admin-dashboard').then(
            (m) => m.SuperAdminDashboardComponent,
          ),
      },
      {
        path: 'schools',
        title: 'Schools / Institutions | Learno Super Admin',
        loadComponent: () =>
          import('./schools/schools-list/schools-list').then(
            (m) => m.SchoolsListComponent,
          ),
      },
      {
        path: 'schools/onboard',
        title: 'Onboard School | Learno Super Admin',
        loadComponent: () =>
          import('./schools/school-onboard/school-onboard').then(
            (m) => m.SchoolOnboardComponent,
          ),
      },
      ...SUPER_ADMIN_PAGES.filter(
        (page) => page.path !== 'dashboard' && page.path !== 'schools',
      ).map((page) => ({
        path: page.path,
        component: SuperAdmin,
        title: `${page.label} | Learno Super Admin`,
        data: { page },
      })),
      // Detail routes & sub-flows
      {
        path: 'curriculum/create',
        component: SuperAdmin,
        title: 'Create Curriculum Pack | Learno Super Admin',
        data: {
          page: {
            path: 'curriculum/create',
            label: 'Create Curriculum Pack',
            icon: 'menu_book',
            description:
              'Build and publish a master curriculum pack for schools and institutions.',
          },
        },
      },
      {
        path: 'assessments/create',
        component: SuperAdmin,
        title: 'Create Assessment | Learno Super Admin',
        data: {
          page: {
            path: 'assessments/create',
            label: 'Create Assessment',
            icon: 'fact_check',
            description:
              'Build and publish a platform-wide assessment pack for schools and institutions.',
          },
        },
      },
      {
        path: 'safeguarding/create-case',
        component: SuperAdmin,
        title: 'Create Safeguarding Case | Learno Super Admin',
        data: {
          page: {
            path: 'safeguarding/create-case',
            label: 'Create Safeguarding Case',
            icon: 'shield',
            description:
              'Log a new incident or compliance concern across institutions.',
          },
        },
      },
      {
        path: 'resources/upload',
        component: SuperAdmin,
        title: 'Upload Resource | Learno Super Admin',
        data: {
          page: {
            path: 'resources/upload',
            label: 'Upload Resource',
            icon: 'folder_shared',
            description:
              'Upload and organize platform-wide academic resources for schools and learners.',
          },
        },
      },
      {
        path: 'support/ticket',
        component: SuperAdmin,
        title: 'Support Ticket Details | Learno Super Admin',
        data: {
          page: {
            path: 'support-centre',
            label: 'Support Ticket',
            icon: 'headset_mic',
            description:
              'Review incident details, communications, SLA tracking, and ticket status.',
          },
        },
      },
      // Convenience navigation aliases
      { path: 'onboard', redirectTo: 'schools/onboard', pathMatch: 'full' },
      { path: 'schools/add', redirectTo: 'schools/onboard', pathMatch: 'full' },
      { path: 'institutions', redirectTo: 'schools', pathMatch: 'full' },
      {
        path: 'support-centre/ticket',
        redirectTo: 'support/ticket',
        pathMatch: 'full',
      },
      { path: 'users', redirectTo: 'users-roles', pathMatch: 'full' },
      { path: 'roles', redirectTo: 'users-roles', pathMatch: 'full' },
      {
        path: 'curriculum',
        redirectTo: 'curriculum-content',
        pathMatch: 'full',
      },
      { path: 'content', redirectTo: 'curriculum-content', pathMatch: 'full' },
      { path: 'assessments', redirectTo: 'assessments-qb', pathMatch: 'full' },
      {
        path: 'question-bank',
        redirectTo: 'assessments-qb',
        pathMatch: 'full',
      },
      { path: 'qb', redirectTo: 'assessments-qb', pathMatch: 'full' },
      {
        path: 'platform-analytics',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
      {
        path: 'billing',
        redirectTo: 'subscriptions-billing',
        pathMatch: 'full',
      },
      {
        path: 'subscriptions',
        redirectTo: 'subscriptions-billing',
        pathMatch: 'full',
      },
      {
        path: 'compliance',
        redirectTo: 'safeguarding-compliance',
        pathMatch: 'full',
      },
      {
        path: 'safeguarding',
        redirectTo: 'safeguarding-compliance',
        pathMatch: 'full',
      },
      { path: 'support', redirectTo: 'support-centre', pathMatch: 'full' },
      { path: 'tickets', redirectTo: 'support-centre', pathMatch: 'full' },
      { path: 'resources', redirectTo: 'resources-library', pathMatch: 'full' },
      { path: 'settings', redirectTo: 'system-settings', pathMatch: 'full' },
      { path: 'logs', redirectTo: 'audit-logs', pathMatch: 'full' },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
