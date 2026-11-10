import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { ScheduleParentMeetingFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-interventions-schedule-meeting-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-meeting-modal.html',
  styleUrls: ['./schedule-meeting-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleMeetingModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isScheduleParentMeetingModalOpen;

  readonly formData = signal<ScheduleParentMeetingFormData>({
    learnerName: 'Adebayo, Oluwatobi',
    parentName: 'Mr. & Mrs. Adebayo',
    parentPhone: '+234 803 123 4567',
    className: 'JSS 1A',
    meetingDate: '2025-05-20',
    meetingTime: '10:00 AM',
    meetingType: 'In-Person',
    agenda: 'Discuss Term 2 Mathematics remediation and homework support plan',
  });

  onClose(): void {
    this.store.closeScheduleParentMeetingModal();
  }

  updateField<K extends keyof ScheduleParentMeetingFormData>(
    field: K,
    value: ScheduleParentMeetingFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.learnerName || !data.parentName || !data.meetingDate) return;
    this.store.scheduleParentMeeting(data);
  }
}
