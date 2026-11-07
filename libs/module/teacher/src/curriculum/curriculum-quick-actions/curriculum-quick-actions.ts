import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherCurriculumQuickAction } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-curriculum-quick-actions',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './curriculum-quick-actions.html',
  styleUrl: './curriculum-quick-actions.scss',
})
export class CurriculumQuickActionsComponent {
  readonly actions = input.required<TeacherCurriculumQuickAction[]>();
}
