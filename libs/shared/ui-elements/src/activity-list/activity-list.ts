import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { UiTone } from '../models/ui-tone.model';

export interface ActivityListItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: UiTone;
  route: string | readonly string[];
  queryParams?: Params;
  meta?: string;
  actionLabel?: string;
}
@Component({
  selector: 'school-hub-activity-list',
  imports: [RouterLink, IconBadgeComponent],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityListComponent {
  readonly items = input.required<readonly ActivityListItem[]>();
  readonly label = input('Activities');
  readonly emptyMessage = input('No activities to show yet.');
}
