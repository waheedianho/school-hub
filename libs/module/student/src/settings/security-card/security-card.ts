import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';

@Component({
  selector: 'school-hub-settings-security-card',
  imports: [DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './security-card.html',
  styleUrl: './security-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class SecurityCardComponent {
  readonly wifiOnly = input<boolean>(true);
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly wifiToggled = output<boolean>();
  readonly modalRequested = output<'sessions' | 'twoFactor' | 'about'>();
}
