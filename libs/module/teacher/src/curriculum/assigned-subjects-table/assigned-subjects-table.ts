import { Component, input, output } from '@angular/core';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherAssignedSubject } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-assigned-subjects-table',
  standalone: true,
  imports: [DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './assigned-subjects-table.html',
  styleUrl: './assigned-subjects-table.scss',
})
export class AssignedSubjectsTableComponent {
  readonly subjects = input.required<TeacherAssignedSubject[]>();
  readonly selectSubject = output<TeacherAssignedSubject>();

  onSelectSubject(item: TeacherAssignedSubject): void {
    this.selectSubject.emit(item);
  }
}
