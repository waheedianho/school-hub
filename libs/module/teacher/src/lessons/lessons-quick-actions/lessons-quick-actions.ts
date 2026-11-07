import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherLessonQuickAction } from '../../data/teacher-lessons.data';

@Component({
  selector: 'school-hub-lessons-quick-actions',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './lessons-quick-actions.html',
  styleUrl: './lessons-quick-actions.scss',
})
export class LessonsQuickActionsComponent {
  readonly actions = input.required<TeacherLessonQuickAction[]>();
}
