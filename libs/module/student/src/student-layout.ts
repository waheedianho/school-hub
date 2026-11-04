import { Component } from '@angular/core';
import { HeaderUser, ShellComponent } from '@school-hub/layout';
import { STUDENT_SIDEBAR_SECTIONS } from './student-sidebar.config';

@Component({
  selector: 'school-hub-student-layout',
  standalone: true,
  imports: [ShellComponent],
  template: `
    <school-hub-shell
      [sidebarSections]="sidebarSections"
      [sidebarTheme]="'light'"
      [logoText]="'SchoolHub'"
      logoIcon="images/learner-logo.svg"
      variant="learner"
      [user]="user"
    ></school-hub-shell>
  `,
})
export class StudentLayoutComponent {
  sidebarSections = STUDENT_SIDEBAR_SECTIONS;
  readonly user: HeaderUser = {
    name: 'Sarah A.',
    role: 'JSS 1 / Basic 7',
    avatarUrl: 'images/admin.png',
    profileRoute: '/student/profile',
    settingsRoute: '/student/settings',
  };
}
