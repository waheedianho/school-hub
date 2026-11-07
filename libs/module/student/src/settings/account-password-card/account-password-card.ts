import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { validatePasswordChange } from '../settings-engine';

@Component({
  selector: 'school-hub-settings-account-password-card',
  imports: [DashboardCardComponent],
  templateUrl: './account-password-card.html',
  styleUrl: './account-password-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class AccountPasswordCardComponent {
  readonly active = input<boolean>(false);
  readonly statusMessage = input<string>('');

  readonly interacted = output<void>();
  readonly passwordSubmitted = output<{
    current: string;
    newPass: string;
    confirm: string;
  }>();

  readonly currentPassword = signal('');
  readonly newPassword = signal('');
  readonly confirmPassword = signal('');

  readonly showCurrent = signal(false);
  readonly showNew = signal(false);
  readonly showConfirm = signal(false);

  readonly errors = signal<{
    current?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  submitForm(event: Event): void {
    event.preventDefault();
    const curr = this.currentPassword();
    const np = this.newPassword();
    const cp = this.confirmPassword();

    const result = validatePasswordChange(curr, np, cp);
    if (!result.valid) {
      this.errors.set(result.errors);
      return;
    }

    this.errors.set({});
    this.passwordSubmitted.emit({ current: curr, newPass: np, confirm: cp });
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
  }
}
