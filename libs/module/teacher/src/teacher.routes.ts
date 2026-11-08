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
      {
        path: 'curriculum',
        title: 'My Subjects & Curriculum | SchoolHub',
        loadComponent: () =>
          import('./curriculum/curriculum').then(
            (m) => m.TeacherCurriculumComponent,
          ),
      },
      {
        path: 'lessons',
        title: 'Lessons & Delivery Packs | SchoolHub',
        loadComponent: () =>
          import('./lessons/lessons').then((m) => m.TeacherLessonsComponent),
      },
      {
        path: 'live-classes',
        title: 'Live Classes | SchoolHub',
        loadComponent: () =>
          import('./live-classes/live-classes').then(
            (m) => m.TeacherLiveClassesComponent,
          ),
      },
      {
        path: 'live-classes/session',
        title: 'Live Class Session | SchoolHub',
        loadComponent: () =>
          import('./live-classes/live-class-session/live-class-session').then(
            (m) => m.LiveClassSessionComponent,
          ),
      },
      {
        path: 'live-classes/:id',
        title: 'Live Class Session | SchoolHub',
        loadComponent: () =>
          import('./live-classes/live-class-session/live-class-session').then(
            (m) => m.LiveClassSessionComponent,
          ),
      },
      {
        path: 'assignments',
        title: 'Assignments & Submissions | SchoolHub',
        loadComponent: () =>
          import('./assignments/assignments').then(
            (m) => m.TeacherAssignmentsComponent,
          ),
      },
      {
        path: 'assignments/review',
        title: 'Submission Review | SchoolHub',
        loadComponent: () =>
          import('./assignments/submission-review/submission-review').then(
            (m) => m.SubmissionReviewComponent,
          ),
      },
      {
        path: 'assignments/:id',
        title: 'Submission Review | SchoolHub',
        loadComponent: () =>
          import('./assignments/submission-review/submission-review').then(
            (m) => m.SubmissionReviewComponent,
          ),
      },
      {
        path: 'assessments',
        title: 'Assessments & Question Bank | SchoolHub',
        loadComponent: () =>
          import('./assessments/assessments').then(
            (m) => m.TeacherAssessmentsComponent,
          ),
      },
      {
        path: 'assessments/question-bank',
        title: 'Question Bank | SchoolHub',
        loadComponent: () =>
          import('./assessments/question-bank/question-bank').then(
            (m) => m.TeacherQuestionBankComponent,
          ),
      },
      {
        path: 'gradebook',
        title: 'Gradebook | SchoolHub',
        loadComponent: () =>
          import('./gradebook/gradebook').then(
            (m) => m.TeacherGradebookComponent,
          ),
      },
      {
        path: 'learners',
        title: 'Learners | SchoolHub',
        loadComponent: () =>
          import('./learners/learners').then((m) => m.TeacherLearnersComponent),
      },
      ...TEACHER_PAGES.filter(
        (page) =>
          page.path !== 'dashboard' &&
          page.path !== 'classes' &&
          page.path !== 'curriculum' &&
          page.path !== 'lessons' &&
          page.path !== 'live-classes' &&
          page.path !== 'assignments' &&
          page.path !== 'assessments' &&
          page.path !== 'gradebook' &&
          page.path !== 'learners',
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
