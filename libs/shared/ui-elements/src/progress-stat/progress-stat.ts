import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { ProgressBarComponent } from '../progress-bar/progress-bar';
import { UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-progress-stat',
  imports: [RouterLink, IconBadgeComponent, ProgressBarComponent],
  templateUrl: './progress-stat.html',
  styleUrl: './progress-stat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressStatComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string>();
  readonly percentage = input.required<number>();
  readonly detail = input.required<string>();
  readonly icon = input.required<string>();
  readonly tone = input<UiTone>('blue');
  readonly route = input.required<string>();
  readonly queryParams = input<Params>();
}
