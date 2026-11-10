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
      {
        path: 'classes-learners',
        title: 'Classes & Learners | SchoolHub Admin',
        loadComponent: () =>
          import('./classes-learners/classes-learners').then(
            (m) => m.ClassesLearnersComponent,
          ),
      },
      {
        path: 'classes-learners/add',
        title: 'Add Learner | SchoolHub Admin',
        loadComponent: () =>
          import('./classes-learners/add-learner/add-learner').then(
            (m) => m.AddLearnerComponent,
          ),
      },
      {
        path: 'teachers-staff',
        title: 'Teachers & Staff | SchoolHub Admin',
        loadComponent: () =>
          import('./teachers-staff/teachers-staff').then(
            (m) => m.TeachersStaffComponent,
          ),
      },
      {
        path: 'teachers-staff/add',
        title: 'Add Staff | SchoolHub Admin',
        loadComponent: () =>
          import('./teachers-staff/add-staff/add-staff').then(
            (m) => m.AddStaffComponent,
          ),
      },
      {
        path: 'subjects-curriculum',
        title: 'Subjects & Curriculum | SchoolHub Admin',
        loadComponent: () =>
          import('./subjects-curriculum/subjects-curriculum').then(
            (m) => m.SubjectsCurriculumComponent,
          ),
      },
      {
        path: 'lessons-oversight',
        title: 'Lessons & Delivery Oversight | SchoolHub Admin',
        loadComponent: () =>
          import('./lessons-oversight/lessons-oversight').then(
            (m) => m.LessonsOversightComponent,
          ),
      },
      {
        path: 'live-classes',
        title: 'Live Classes | SchoolHub Admin',
        loadComponent: () =>
          import('./live-classes/live-classes').then(
            (m) => m.LiveClassesComponent,
          ),
      },
      {
        path: 'assessments-gradebooks',
        title: 'Assessments & Gradebooks | SchoolHub Admin',
        loadComponent: () =>
          import('./assessments-gradebooks/assessments-gradebooks').then(
            (m) => m.AssessmentsGradebooksComponent,
          ),
      },
      {
        path: 'reports',
        title: 'Reports & Report Cards | SchoolHub Admin',
        loadComponent: () =>
          import('./reports/reports').then((m) => m.ReportsComponent),
      },
      {
        path: 'interventions',
        title: 'Interventions | SchoolHub Admin',
        loadComponent: () =>
          import('./interventions/interventions').then(
            (m) => m.InterventionsComponent,
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
      { path: 'live', redirectTo: 'live-classes', pathMatch: 'full' },
      {
        path: 'virtual-classes',
        redirectTo: 'live-classes',
        pathMatch: 'full',
      },
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
      { path: 'report-cards', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'performance-report', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'remediation', redirectTo: 'interventions', pathMatch: 'full' },
      { path: 'support-plans', redirectTo: 'interventions', pathMatch: 'full' },
      { path: 'messages', redirectTo: 'communication', pathMatch: 'full' },
      // Register all remaining portal pages
      ...SCHOOL_ADMIN_PAGES.filter(
        (page) =>
          page.path !== 'dashboard' &&
          page.path !== 'school-setup' &&
          page.path !== 'classes-learners' &&
          page.path !== 'teachers-staff' &&
          page.path !== 'subjects-curriculum' &&
          page.path !== 'lessons-oversight' &&
          page.path !== 'live-classes' &&
          page.path !== 'assessments-gradebooks' &&
          page.path !== 'reports' &&
          page.path !== 'interventions',
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
