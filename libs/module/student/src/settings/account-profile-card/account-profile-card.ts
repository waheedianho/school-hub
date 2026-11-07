import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';

@Component({
  selector: 'school-hub-settings-account-profile-card',
  imports: [RouterLink, DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './account-profile-card.html',
  styleUrl: './account-profile-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class AccountProfileCardComponent {
  readonly avatarUrl = input<string>('');
  readonly fullName = input<string>('');
  readonly className = input<string>('');
  readonly email = input<string>('');
  readonly phone = input<string>('');
  readonly location = input<string>('');
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
}
