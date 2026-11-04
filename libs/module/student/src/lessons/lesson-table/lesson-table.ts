import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadgeComponent } from '@school-hub/ui-elements';
import {
  LearnerLesson,
  LessonActivityKind,
  LESSON_ACTIVITY_ROUTES,
  LESSON_STATUS,
  lessonActivityQuery,
} from '../lessons.data';

@Component({
  selector: 'school-hub-lesson-table',
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './lesson-table.html',
  styleUrl: './lesson-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonTableComponent {
  readonly lessons = input.required<readonly LearnerLesson[]>();
  readonly selectedId = input<string>();
  readonly opened = output<{ lesson: LearnerLesson; actions: boolean }>();
  protected readonly kinds: LessonActivityKind[] = [
    'quiz',
    'worksheet',
    'portfolio',
  ];
  protected readonly statusLabels = LESSON_STATUS;
  protected readonly routes = LESSON_ACTIVITY_ROUTES;
  protected readonly activityQuery = lessonActivityQuery;

  protected actionLabel(lesson: LearnerLesson): string {
    if (lesson.status === 'completed') return 'Review';
    if (lesson.status === 'in-progress') return 'Continue';
    return lesson.available ? 'Start' : 'Preview';
  }
}
