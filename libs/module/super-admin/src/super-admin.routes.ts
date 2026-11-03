import { Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './super-admin-layout';
import { SuperAdmin } from './super-admin';

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
        component: SuperAdmin,
      },
    ],
  },
];
