import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-dashboard-card',
  imports: [IconBadgeComponent],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardComponent {
  readonly title = input.required<string>();
  readonly icon = input.required<string>();
  readonly tone = input<UiTone>('blue');
}
