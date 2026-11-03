import { Routes } from '@angular/router';
import { SchoolAdminLayoutComponent } from './school-admin-layout';
import { SchoolAdmin } from './school-admin';

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
        component: SchoolAdmin,
      },
    ],
  },
];
