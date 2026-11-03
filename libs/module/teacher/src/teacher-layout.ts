import { Component } from '@angular/core';
import { ShellComponent } from '@school-hub/layout';
import { TEACHER_SIDEBAR_SECTIONS } from './teacher-sidebar.config';

@Component({
  selector: 'school-hub-teacher-layout',
  standalone: true,
  imports: [ShellComponent],
  template: `
    <school-hub-shell
      [sidebarSections]="sidebarSections"
      [sidebarTheme]="'dark'"
      [logoText]="'SchoolHub'"
    ></school-hub-shell>
  `,
})
export class TeacherLayoutComponent {
  sidebarSections = TEACHER_SIDEBAR_SECTIONS;
}
