import { Component } from '@angular/core';
import { ShellComponent } from '@school-hub/layout';
import { SCHOOL_ADMIN_SIDEBAR_SECTIONS } from './school-admin-sidebar.config';

@Component({
  selector: 'school-hub-admin-layout',
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
export class SchoolAdminLayoutComponent {
  sidebarSections = SCHOOL_ADMIN_SIDEBAR_SECTIONS;
}
