import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-message-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-details-modal.html',
  styleUrls: ['./message-details-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDetailsModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly selectedMessage = this.store.selectedCommunicationMessage;

  onClose(): void {
    this.store.closeMessageDetails();
  }

  onResend(id: string): void {
    this.store.resendFailedMessage(id);
    this.store.closeMessageDetails();
  }
}
