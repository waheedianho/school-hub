import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherLessonTimelineItem } from '../../data/teacher-lessons.data';

@Component({
  selector: 'school-hub-lesson-timeline',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './lesson-timeline.html',
  styleUrl: './lesson-timeline.scss',
})
export class LessonTimelineComponent {
  readonly items = input.required<TeacherLessonTimelineItem[]>();
}
