import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountSecurityInfo } from '../../data/teacher-settings.data';

@Component({
  selector: 'school-hub-account-security-card',
  imports: [FormsModule],
  templateUrl: './account-security-card.html',
  styleUrl: './account-security-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSecurityCardComponent {
  readonly securityInfo = input.required<AccountSecurityInfo>();
  readonly securityUpdated = output<AccountSecurityInfo>();
  readonly passwordChangeRequested = output<void>();
  readonly manageSessionsRequested = output<void>();

  readonly showPasswordModal = signal<boolean>(false);
  readonly showSessionsModal = signal<boolean>(false);
  readonly currentPassword = signal<string>('');
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');
  readonly passwordMessage = signal<string>('');

  onToggleTwoFactor(checked: boolean): void {
    const updated: AccountSecurityInfo = {
      ...this.securityInfo(),
      twoFactorEnabled: checked,
    };
    this.securityUpdated.emit(updated);
  }

  openPasswordModal(): void {
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
    this.passwordMessage.set('');
    this.showPasswordModal.set(true);
    this.passwordChangeRequested.emit();
  }

  closePasswordModal(): void {
    this.showPasswordModal.set(false);
  }

  submitPasswordChange(): void {
    if (!this.currentPassword() || !this.newPassword()) {
      this.passwordMessage.set('Please fill in all password fields.');
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      this.passwordMessage.set('New passwords do not match.');
      return;
    }
    // Per AGENTS.md honesty rule: Note local execution without masquerading as connected backend
    this.passwordMessage.set(
      'Password update simulated locally. Server-side password changes require an active authentication backend.',
    );
  }

  openSessionsModal(): void {
    this.showSessionsModal.set(true);
    this.manageSessionsRequested.emit();
  }

  closeSessionsModal(): void {
    this.showSessionsModal.set(false);
  }
}
