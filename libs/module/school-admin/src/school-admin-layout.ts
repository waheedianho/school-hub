import { Component } from '@angular/core';
import { ShellComponent, HeaderUser } from '@school-hub/layout';
import { SCHOOL_ADMIN_SIDEBAR_SECTIONS } from './school-admin-sidebar.config';

@Component({
  selector: 'school-hub-admin-layout',
  standalone: true,
  imports: [ShellComponent],
  template: `
    <school-hub-shell
      [sidebarSections]="sidebarSections"
      [sidebarTheme]="'light'"
      [logoText]="'Learno'"
      logoIcon="images/learner-logo.svg"
      variant="learner"
      [user]="adminUser"
    ></school-hub-shell>
  `,
})
export class SchoolAdminLayoutComponent {
  sidebarSections = SCHOOL_ADMIN_SIDEBAR_SECTIONS;

  adminUser: HeaderUser = {
    name: 'School Admin',
    role: 'Super Admin',
    avatarUrl: 'images/admin.png',
    profileRoute: '/school-admin/settings',
    settingsRoute: '/school-admin/settings',
  };
}
