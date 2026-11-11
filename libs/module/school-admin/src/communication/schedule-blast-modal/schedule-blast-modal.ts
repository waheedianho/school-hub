import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { CommunicationAudience } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-schedule-blast-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-blast-modal.html',
  styleUrls: ['./schedule-blast-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleBlastModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isScheduleBlastModalOpen;

  readonly audience = signal<CommunicationAudience>('All Students & Parents');
  readonly blastTitle = signal<string>('');
  readonly blastDate = signal<string>('May 28, 2025');
  readonly blastTime = signal<string>('09:00 AM');
  readonly messageContent = signal<string>('');

  onClose(): void {
    this.store.closeScheduleBlastModal();
  }

  onSubmit(): void {
    if (!this.blastTitle().trim() || !this.messageContent().trim()) return;
    this.store.createAnnouncement({
      title: this.blastTitle(),
      audience: this.audience(),
      category: 'General',
      channels: ['In-App', 'Email', 'SMS'],
      scheduleDate: this.blastDate(),
      scheduleTime: this.blastTime(),
      body: this.messageContent(),
    });
    this.store.closeScheduleBlastModal();
  }
}
