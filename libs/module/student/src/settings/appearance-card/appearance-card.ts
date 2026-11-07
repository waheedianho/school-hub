import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TextSizePreference, ThemePreference } from '../settings-engine';

@Component({
  selector: 'school-hub-settings-appearance-card',
  imports: [DashboardCardComponent],
  templateUrl: './appearance-card.html',
  styleUrl: './appearance-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class AppearanceCardComponent {
  readonly theme = input<ThemePreference>('light');
  readonly textSize = input<TextSizePreference>('medium');
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly themeSelected = output<ThemePreference>();
  readonly textSizeSelected = output<TextSizePreference>();
}
