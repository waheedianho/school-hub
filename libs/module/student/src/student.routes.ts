import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout';
import { Student } from './student';

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
        component: Student,
      },
    ],
  },
];
