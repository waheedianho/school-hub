import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout';
import { Student } from './student';
import { STUDENT_PAGES } from './student-pages.config';
import { leaveLiveClassGuard } from './live-classes/room/leave-class.guard';

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
      {
        path: 'worksheets',
        title: 'Worksheets | SchoolHub',
        loadComponent: () =>
          import('./worksheets/worksheets').then(
            (m) => m.StudentWorksheetsComponent,
          ),
      },
      {
        path: 'worksheets/:worksheetId',
        title: 'Worksheet | SchoolHub',
        loadComponent: () =>
          import('./worksheets/workspace/workspace').then(
            (m) => m.WorksheetWorkspaceComponent,
          ),
      },
      {
        path: 'portfolio-tasks',
        title: 'Portfolio Tasks | SchoolHub',
        loadComponent: () =>
          import('./portfolio/portfolio').then(
            (m) => m.StudentPortfolioComponent,
          ),
      },
      {
        path: 'portfolio-tasks/:taskId',
        title: 'Portfolio Task | SchoolHub',
        loadComponent: () =>
          import('./portfolio/task/task').then((m) => m.PortfolioTaskComponent),
      },
      {
        path: 'feedback',
        title: 'Feedback | SchoolHub',
        loadComponent: () =>
          import('./feedback/feedback').then((m) => m.StudentFeedbackComponent),
      },
      {
        path: 'progress',
        title: 'Progress | SchoolHub',
        loadComponent: () =>
          import('./progress/progress').then((m) => m.StudentProgressComponent),
      },
      {
        path: 'live-classes',
        title: 'Live Classes | SchoolHub',
        loadComponent: () =>
          import('./live-classes/live-classes').then(
            (m) => m.StudentLiveClassesComponent,
          ),
      },
      {
        path: 'live-classes/:classId',
        title: 'Live Classroom | SchoolHub',
        canDeactivate: [leaveLiveClassGuard],
        loadComponent: () =>
          import('./live-classes/room/room').then(
            (m) => m.LiveClassroomComponent,
          ),
      },
      {
        path: 'resources',
        title: 'Resources | SchoolHub',
        loadComponent: () =>
          import('./resources/resources').then(
            (m) => m.StudentResourcesComponent,
          ),
      },
      {
        path: 'resources/:resourceId',
        title: 'Resource | SchoolHub',
        loadComponent: () =>
          import('./resources/detail/detail').then(
            (m) => m.ResourceDetailComponent,
          ),
      },
      {
        path: 'ask-tutor',
        title: 'Ask Tutor | SchoolHub',
        loadComponent: () =>
          import('./ask-tutor/ask-tutor').then(
            (m) => m.StudentAskTutorComponent,
          ),
      },
      {
        path: 'profile',
        title: 'Profile | SchoolHub',
        loadComponent: () =>
          import('./profile/profile').then((m) => m.StudentProfileComponent),
      },
      ...STUDENT_PAGES.filter(
        (page) =>
          ![
            'dashboard',
            'lessons',
            'subjects',
            'assessments',
            'worksheets',
            'portfolio-tasks',
            'feedback',
            'progress',
            'live-classes',
            'resources',
            'profile',
            'ask-tutor',
          ].includes(page.path),
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
