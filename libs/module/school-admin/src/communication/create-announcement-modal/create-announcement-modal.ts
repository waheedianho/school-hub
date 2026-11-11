import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { CreateAnnouncementFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-create-announcement-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-announcement-modal.html',
  styleUrls: ['./create-announcement-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAnnouncementModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isCreateAnnouncementModalOpen;

  readonly isScheduled = signal<boolean>(false);

  readonly formData = signal<CreateAnnouncementFormData>({
    title: '',
    audience: 'All Students & Parents',
    category: 'General',
    channels: ['In-App', 'Email'],
    scheduleDate: '',
    scheduleTime: '',
    body: '',
    isUrgent: false,
  });

  onClose(): void {
    this.store.closeCreateAnnouncementModal();
  }

  updateField<K extends keyof CreateAnnouncementFormData>(
    field: K,
    value: CreateAnnouncementFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  toggleChannel(channel: 'In-App' | 'Email' | 'SMS'): void {
    this.formData.update((prev) => {
      const exists = prev.channels.includes(channel);
      const nextChannels = exists
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel];
      return {
        ...prev,
        channels: nextChannels.length > 0 ? nextChannels : [channel],
      };
    });
  }

  toggleScheduled(enabled: boolean): void {
    this.isScheduled.set(enabled);
    if (!enabled) {
      this.formData.update((prev) => ({
        ...prev,
        scheduleDate: undefined,
        scheduleTime: undefined,
      }));
    } else {
      this.formData.update((prev) => ({
        ...prev,
        scheduleDate: 'May 25, 2025',
        scheduleTime: '08:00 AM',
      }));
    }
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.title.trim() || !data.body.trim()) return;
    this.store.createAnnouncement(data);
  }
}
