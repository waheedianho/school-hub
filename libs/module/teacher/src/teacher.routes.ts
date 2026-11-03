import { Routes } from '@angular/router';
import { TeacherLayoutComponent } from './teacher-layout';
import { Teacher } from './teacher';

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
        component: Teacher,
      },
    ],
  },
];
