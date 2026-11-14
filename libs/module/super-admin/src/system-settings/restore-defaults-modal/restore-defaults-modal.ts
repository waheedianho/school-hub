import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'school-hub-restore-defaults-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restore-defaults-modal.html',
  styleUrl: './restore-defaults-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreDefaultsModalComponent {
  readonly isOpen = input<boolean>(false);

  readonly closeModal = output<void>();
  readonly confirmed = output<void>();

  confirmationInput = '';

  get canConfirm(): boolean {
    return this.confirmationInput.trim().toUpperCase() === 'RESTORE';
  }

  onClose(): void {
    this.confirmationInput = '';
    this.closeModal.emit();
  }

  onConfirm(): void {
    if (this.canConfirm) {
      this.confirmed.emit();
      this.onClose();
    }
  }
}
