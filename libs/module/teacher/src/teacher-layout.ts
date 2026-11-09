import { Component } from '@angular/core';
import { ShellComponent, HeaderUser } from '@school-hub/layout';
import { TEACHER_SIDEBAR_SECTIONS } from './teacher-sidebar.config';

@Component({
  selector: 'school-hub-teacher-layout',
  standalone: true,
  imports: [ShellComponent],
  template: `
    <school-hub-shell
      [sidebarSections]="sidebarSections"
      [sidebarTheme]="'light'"
      [logoText]="'SchoolHub'"
      logoIcon="images/learner-logo.svg"
      variant="learner"
      [user]="teacherUser"
    ></school-hub-shell>
  `,
})
export class TeacherLayoutComponent {
  sidebarSections = TEACHER_SIDEBAR_SECTIONS;

  teacherUser: HeaderUser = {
    name: 'Mr. Tunde A.',
    role: 'English Language Tutor',
    avatarUrl: 'images/admin.png',
    profileRoute: '/teacher/settings',
    settingsRoute: '/teacher/settings',
  };
}
