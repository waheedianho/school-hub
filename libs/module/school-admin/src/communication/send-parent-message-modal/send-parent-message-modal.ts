import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { SendParentMessageFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-send-parent-message-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-parent-message-modal.html',
  styleUrls: ['./send-parent-message-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendParentMessageModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isSendParentMessageModalOpen;

  readonly classOptions: string[] = [
    'All Classes',
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'JSS 2B',
    'JSS 2C',
    'JSS 3A',
    'JSS 3B',
    'SSS 1A',
    'SSS 2A',
    'SSS 3A',
  ];

  readonly formData = signal<SendParentMessageFormData>({
    className: 'JSS 1A',
    recipientAudience: 'All Parents',
    subject: '',
    category: 'Academics',
    body: '',
    priority: 'Normal',
  });

  onClose(): void {
    this.store.closeSendParentMessageModal();
  }

  updateField<K extends keyof SendParentMessageFormData>(
    field: K,
    value: SendParentMessageFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.subject.trim() || !data.body.trim()) return;
    this.store.sendParentMessage(data);
  }
}
