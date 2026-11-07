import { Component, input, output } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherClassItem } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-classes-table',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './classes-table.html',
  styleUrl: './classes-table.scss',
})
export class ClassesTableComponent {
  readonly classes = input.required<TeacherClassItem[]>();
  readonly viewClass = output<TeacherClassItem>();

  onViewClass(cls: TeacherClassItem): void {
    this.viewClass.emit(cls);
  }
}
