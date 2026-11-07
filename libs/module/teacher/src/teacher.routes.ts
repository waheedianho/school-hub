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
      ...TEACHER_PAGES.filter(
        (page) =>
          page.path !== 'dashboard' &&
          page.path !== 'classes' &&
          page.path !== 'curriculum' &&
          page.path !== 'lessons' &&
          page.path !== 'live-classes',
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
