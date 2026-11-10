import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-modal.html',
  styleUrls: ['./schedule-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleModalComponent {
  readonly store = inject(SchoolAdminStore);

  readonly className = signal<string>('JSS 1A');
  readonly subject = signal<string>('Mathematics');
  readonly topic = signal<string>('');
  readonly teacherName = signal<string>('Mr. Tunde Adewale');
  readonly startDate = signal<string>('2026-11-10');
  readonly startTime = signal<string>('09:00 AM');
  readonly duration = signal<string>('40 min');
  readonly platform = signal<string>('Learno Native Classroom');

  readonly classOptions = [
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'JSS 2B',
    'JSS 2C',
    'JSS 3A',
    'JSS 3B',
    'JSS 3C',
    'SSS 1A',
    'SSS 1B',
    'SSS 1C',
    'SSS 2A',
    'SSS 2B',
    'SSS 2C',
    'SSS 3A',
    'SSS 3B',
  ];

  readonly subjectOptions = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
    'Civic Education',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'French',
  ];

  readonly teacherOptions = [
    'Mr. Tunde Adewale',
    'Mrs. Funmi Yusuf',
    'Mrs. Nkechi Okoro',
    'Mr. Joseph Anayo',
    'Mrs. Funke Yusuf',
    'Mrs. Aisha Bello',
    'Mr. Chinedu Obi',
    'Mrs. Grace Eze',
    'Dr. Kelechi Nwosu',
    'Mrs. Sandra Okafor',
  ];

  readonly timeOptions = [
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  readonly durationOptions = ['30 min', '40 min', '45 min', '50 min', '60 min'];

  onClose(): void {
    this.store.closeScheduleModal();
  }

  onSubmit(): void {
    if (!this.topic().trim()) return;

    this.store.scheduleNewLiveClass({
      className: this.className(),
      subject: this.subject(),
      topic: this.topic().trim(),
      teacherName: this.teacherName(),
      startDate: this.startDate(),
      startTime: this.startTime(),
      duration: this.duration(),
    });
  }
}
