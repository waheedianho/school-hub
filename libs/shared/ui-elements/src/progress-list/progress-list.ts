import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { UiTone } from '../models/ui-tone.model';
export interface ProgressListItem {
  id: string;
  title: string;
  description?: string;
  icon: string;
  tone: UiTone;
  value?: number;
  valueLabel: string;
  detail?: string;
  route?: string;
  queryParams?: Params;
  actionLabel?: string;
}
@Component({
  selector: 'school-hub-progress-list',
  imports: [RouterLink, ProgressBarComponent, IconBadgeComponent],
  templateUrl: './progress-list.html',
  styleUrl: './progress-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressListComponent {
  readonly items = input.required<readonly ProgressListItem[]>();
  readonly label = input('Progress');
  readonly compact = input(false);
}
