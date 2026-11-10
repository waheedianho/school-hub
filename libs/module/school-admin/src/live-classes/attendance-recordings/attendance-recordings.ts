import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LiveClassRecord } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-attendance-recordings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-recordings.html',
  styleUrls: ['./attendance-recordings.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceRecordingsComponent {
  readonly store = inject(SchoolAdminStore);

  readonly searchQuery = signal<string>('');
  readonly cohortFilter = signal<string>('All Cohorts');
  readonly selectedRecording = signal<LiveClassRecord | null>(null);

  readonly recordedClasses = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cohort = this.cohortFilter();

    return this.store
      .liveClassRecords()
      .filter((cls) => cls.recording.status === 'Available')
      .filter((cls) => {
        const matchesCohort =
          cohort === 'All Cohorts' || cls.className.startsWith(cohort);
        const matchesQuery =
          !query ||
          cls.className.toLowerCase().includes(query) ||
          cls.subject.toLowerCase().includes(query) ||
          cls.topic.toLowerCase().includes(query) ||
          cls.teacherName.toLowerCase().includes(query);

        return matchesCohort && matchesQuery;
      });
  });

  readonly cohortStats = [
    { cohort: 'JSS 1', rate: 89, totalSessions: 24, onTrack: true },
    { cohort: 'JSS 2', rate: 86, totalSessions: 22, onTrack: true },
    { cohort: 'JSS 3', rate: 84, totalSessions: 20, onTrack: true },
    { cohort: 'SSS 1', rate: 91, totalSessions: 26, onTrack: true },
    { cohort: 'SSS 2', rate: 88, totalSessions: 25, onTrack: true },
    { cohort: 'SSS 3', rate: 94, totalSessions: 28, onTrack: true },
  ];

  onPlayRecording(cls: LiveClassRecord): void {
    this.selectedRecording.set(cls);
  }

  closePlayer(): void {
    this.selectedRecording.set(null);
  }

  downloadRecording(cls: LiveClassRecord): void {
    this.store.setupSaveStatus.set(
      `Downloading recording for ${cls.className} - ${cls.subject}: ${cls.topic}`,
    );
  }
}
