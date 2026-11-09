import { Component } from '@angular/core';
import { ShellComponent } from '@school-hub/layout';
import { SUPER_ADMIN_SIDEBAR_SECTIONS } from './super-admin-sidebar.config';

@Component({
  selector: 'school-hub-super-admin-layout',
  standalone: true,
  imports: [ShellComponent],
  template: `
    <school-hub-shell
      [sidebarSections]="sidebarSections"
      [sidebarTheme]="'light'"
      [logoText]="'SchoolHub'"
      logoIcon="images/learner-logo.svg"
      variant="learner"
    ></school-hub-shell>
  `,
})
export class SuperAdminLayoutComponent {
  sidebarSections = SUPER_ADMIN_SIDEBAR_SECTIONS;
}
