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
      {
        path: 'users-roles',
        title: 'Users & Roles | Learno Super Admin',
        loadComponent: () =>
          import('./users-roles/users-roles').then(
            (m) => m.UsersRolesComponent,
          ),
      },
      {
        path: 'curriculum-content',
        title: 'Curriculum & Content | Learno Super Admin',
        loadComponent: () =>
          import('./curriculum-content/curriculum-content').then(
            (m) => m.CurriculumContentComponent,
          ),
      },
      {
        path: 'curriculum-content/create',
        title: 'Create Curriculum Pack | Learno Super Admin',
        loadComponent: () =>
          import('./curriculum-content/create-pack/create-pack').then(
            (m) => m.CreatePackComponent,
          ),
      },
      {
        path: 'assessments-qb',
        title: 'Assessments & Question Bank | Learno Super Admin',
        loadComponent: () =>
          import('./assessments-qb/assessments-qb').then(
            (m) => m.AssessmentsQbComponent,
          ),
      },
      {
        path: 'assessments-qb/create',
        title: 'Create Assessment Pack | Learno Super Admin',
        loadComponent: () =>
          import('./assessments-qb/create-assessment/create-assessment').then(
            (m) => m.CreateAssessmentComponent,
          ),
      },
      {
        path: 'analytics',
        title: 'Platform Analytics | Learno Super Admin',
        loadComponent: () =>
          import('./analytics/platform-analytics').then(
            (m) => m.PlatformAnalyticsComponent,
          ),
      },
      {
        path: 'subscriptions-billing',
        title: 'Subscriptions & Billing | Learno Super Admin',
        loadComponent: () =>
          import('./subscriptions/subscriptions-billing').then(
            (m) => m.SubscriptionsBillingComponent,
          ),
      },
      {
        path: 'reports',
        title: 'Reports | Learno Super Admin',
        loadComponent: () =>
          import('./reports/reports').then((m) => m.ReportsComponent),
      },
      {
        path: 'safeguarding-compliance',
        title: 'Safeguarding & Compliance | Learno Super Admin',
        loadComponent: () =>
          import('./safeguarding/safeguarding-compliance').then(
            (m) => m.SafeguardingComplianceComponent,
          ),
      },
      {
        path: 'safeguarding-compliance/create',
        title: 'Create Safeguarding Case | Learno Super Admin',
        loadComponent: () =>
          import('./safeguarding/create-case/create-case').then(
            (m) => m.CreateCaseComponent,
          ),
      },
      {
        path: 'support-centre',
        title: 'Support Centre | Learno Super Admin',
        loadComponent: () =>
          import('./support-centre/support-centre').then(
            (m) => m.SupportCentreComponent,
          ),
      },
      {
        path: 'support-centre/:id',
        title: 'Ticket Details | Learno Super Admin',
        loadComponent: () =>
          import('./support-centre/ticket-detail/ticket-detail').then(
            (m) => m.TicketDetailComponent,
          ),
      },
      ...SUPER_ADMIN_PAGES.filter(
        (page) =>
          page.path !== 'dashboard' &&
          page.path !== 'schools' &&
          page.path !== 'users-roles' &&
          page.path !== 'curriculum-content' &&
          page.path !== 'assessments-qb' &&
          page.path !== 'analytics' &&
          page.path !== 'subscriptions-billing' &&
          page.path !== 'reports' &&
          page.path !== 'safeguarding-compliance' &&
          page.path !== 'support-centre',
      ).map((page) => ({
        path: page.path,
        component: SuperAdmin,
        title: `${page.label} | Learno Super Admin`,
        data: { page },
      })),
      // Detail routes & sub-flows
      {
        path: 'curriculum/create',
        redirectTo: 'curriculum-content/create',
        pathMatch: 'full',
      },
      {
        path: 'assessments/create',
        redirectTo: 'assessments-qb/create',
        pathMatch: 'full',
      },
      {
        path: 'subscriptions',
        redirectTo: 'subscriptions-billing',
        pathMatch: 'full',
      },
      {
        path: 'safeguarding/create-case',
        redirectTo: 'safeguarding-compliance/create',
        pathMatch: 'full',
      },
      {
        path: 'safeguarding/create',
        redirectTo: 'safeguarding-compliance/create',
        pathMatch: 'full',
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
        redirectTo: 'support-centre/TKT-2025-5128',
        pathMatch: 'full',
      },
      // Convenience navigation aliases
      { path: 'onboard', redirectTo: 'schools/onboard', pathMatch: 'full' },
      { path: 'schools/add', redirectTo: 'schools/onboard', pathMatch: 'full' },
      { path: 'institutions', redirectTo: 'schools', pathMatch: 'full' },
      {
        path: 'support-centre/ticket',
        redirectTo: 'support-centre/TKT-2025-5128',
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
