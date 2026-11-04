import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-summary-stat',
  imports: [IconBadgeComponent],
  templateUrl: './summary-stat.html',
  styleUrl: './summary-stat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryStatComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly description = input('');
  readonly icon = input.required<string>();
  readonly tone = input<UiTone>('blue');
}
