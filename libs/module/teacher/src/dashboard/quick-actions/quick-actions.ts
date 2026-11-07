import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherQuickAction } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-quick-actions',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss',
})
export class QuickActionsComponent {
  readonly actions = input.required<TeacherQuickAction[]>();
}
