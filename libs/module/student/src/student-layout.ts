import { Component } from '@angular/core';
import { ShellComponent } from '@school-hub/layout';
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
    ></school-hub-shell>
  `,
})
export class StudentLayoutComponent {
  sidebarSections = STUDENT_SIDEBAR_SECTIONS;
}
