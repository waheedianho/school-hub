import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-confirm-discard-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-discard-modal.html',
  styleUrls: ['./confirm-discard-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDiscardModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isConfirmDiscardModalOpen;

  onClose(): void {
    this.store.closeDiscardConfirmModal();
  }

  onConfirmDiscard(): void {
    this.store.discardGeneralSettings();
  }
}
