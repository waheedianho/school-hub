import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherClassQuickAction } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-classes-quick-actions',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './classes-quick-actions.html',
  styleUrl: './classes-quick-actions.scss',
})
export class ClassesQuickActionsComponent {
  readonly actions = input.required<TeacherClassQuickAction[]>();
}
