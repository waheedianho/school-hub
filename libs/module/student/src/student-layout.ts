import { Component, inject } from '@angular/core';
import { ShellComponent } from '@school-hub/layout';
import { LearnerProfileStore } from './data/learner-profile-store';
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
      [encouragement]="true"
      [user]="profile.header()"
    ></school-hub-shell>
  `,
})
export class StudentLayoutComponent {
  sidebarSections = STUDENT_SIDEBAR_SECTIONS;
  readonly profile = inject(LearnerProfileStore);
}
