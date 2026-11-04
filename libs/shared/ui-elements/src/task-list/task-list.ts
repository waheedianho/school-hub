import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { UiTone } from '../models/ui-tone.model';

export interface TaskListItem {
  id: string;
  title: string;
  dueLabel: string;
  icon: string;
  tone: UiTone;
  route: string;
  queryParams?: Params;
}

@Component({
  selector: 'school-hub-task-list',
  imports: [RouterLink, IconBadgeComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly tasks = input.required<readonly TaskListItem[]>();
}
