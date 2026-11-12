import { Component } from '@angular/core';
import { ShellComponent, HeaderUser } from '@school-hub/layout';
import { SUPER_ADMIN_SIDEBAR_SECTIONS } from './super-admin-sidebar.config';

@Component({
  selector: 'school-hub-super-admin-layout',
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
export class SuperAdminLayoutComponent {
  sidebarSections = SUPER_ADMIN_SIDEBAR_SECTIONS;

  adminUser: HeaderUser = {
    name: 'Super Admin',
    role: 'Platform Owner',
    avatarUrl: 'images/admin.png',
    profileRoute: '/super-admin/system-settings',
    settingsRoute: '/super-admin/system-settings',
  };
}
