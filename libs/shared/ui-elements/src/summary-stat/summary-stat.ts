import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { UiTone, UI_TONES } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-summary-stat',
  imports: [IconBadgeComponent],
  templateUrl: './summary-stat.html',
  styleUrl: './summary-stat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.tile]': 'appearance() === "tile"',
    '[style.--stat-soft]': 'palettes[tone()].soft',
    '[style.--stat-color]': 'palettes[tone()].color',
  },
})
export class SummaryStatComponent {
  protected readonly palettes = UI_TONES;
  readonly appearance = input<'default' | 'tile'>('default');
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly description = input('');
  readonly icon = input.required<string>();
  readonly tone = input<UiTone>('blue');
}
