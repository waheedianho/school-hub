import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-live-classes-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesQuickActionsComponent {
  readonly store = inject(SchoolAdminStore);

  onScheduleNewClass(): void {
    this.store.openScheduleModal();
  }

  onReviewRecordings(): void {
    this.store.setActiveLiveClassTab('recordings');
  }

  onMonitorAttendance(): void {
    this.store.setActiveLiveClassTab('recordings');
  }

  onGenerateReport(): void {
    this.store.exportLiveClassesReport();
  }
}
