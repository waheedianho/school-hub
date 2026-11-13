import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformUser, UserStatus } from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-user-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail-modal.html',
  styleUrl: './user-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailModalComponent {
  readonly user = input.required<PlatformUser>();

  readonly closeModal = output<void>();
  readonly editUser = output<PlatformUser>();
  readonly resetPassword = output<PlatformUser>();
  readonly toggleMfa = output<PlatformUser>();
  readonly updateStatus = output<{ user: PlatformUser; status: UserStatus }>();
  readonly deleteUser = output<PlatformUser>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onEdit(): void {
    this.editUser.emit(this.user());
  }

  onResetPassword(): void {
    this.resetPassword.emit(this.user());
  }

  onToggleMfa(): void {
    this.toggleMfa.emit(this.user());
  }

  onToggleStatus(): void {
    const nextStatus: UserStatus =
      this.user().status === 'Suspended' ? 'Active' : 'Suspended';
    this.updateStatus.emit({ user: this.user(), status: nextStatus });
  }

  onDelete(): void {
    this.deleteUser.emit(this.user());
  }
}
