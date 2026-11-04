import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout';
import { Student } from './student';
import { STUDENT_PAGES } from './student-pages.config';

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
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
          import('./dashboard/dashboard').then(
            (m) => m.StudentDashboardComponent,
          ),
      },
      {
        path: 'lessons',
        title: 'My Lessons | SchoolHub',
        loadComponent: () =>
          import('./lessons/lessons').then((m) => m.StudentLessonsComponent),
      },
      {
        path: 'subjects',
        title: 'My Subjects | SchoolHub',
        loadComponent: () =>
          import('./subjects/subjects').then((m) => m.StudentSubjectsComponent),
      },
      {
        path: 'assessments',
        title: 'Quizzes & Assessments | SchoolHub',
        loadComponent: () =>
          import('./assessments/assessments').then(
            (m) => m.StudentAssessmentsComponent,
          ),
      },
      {
        path: 'assessments/:assessmentId/attempt',
        title: 'Quiz Attempt | SchoolHub',
        loadComponent: () =>
          import('./assessments/attempt/attempt').then(
            (m) => m.AssessmentAttemptComponent,
          ),
      },
      {
        path: 'assessments/:assessmentId/results/:attemptId',
        title: 'Assessment Results | SchoolHub',
        loadComponent: () =>
          import('./assessments/result/result').then(
            (m) => m.AssessmentResultComponent,
          ),
      },
      ...STUDENT_PAGES.filter(
        (page) =>
          !['dashboard', 'lessons', 'subjects', 'assessments'].includes(
            page.path,
          ),
      ).map((page) => ({
        path: page.path,
        component: Student,
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
