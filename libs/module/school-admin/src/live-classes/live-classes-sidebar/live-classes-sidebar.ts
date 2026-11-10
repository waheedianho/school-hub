import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LiveClassAttentionItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-live-classes-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-classes-sidebar.html',
  styleUrls: ['./live-classes-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesSidebarComponent {
  readonly store = inject(SchoolAdminStore);

  onAttentionClick(item: LiveClassAttentionItem): void {
    this.store.toggleAttentionFilter(item.filterKey);
  }

  onScheduleClass(): void {
    this.store.openScheduleModal();
  }

  onMonitorOngoing(): void {
    this.store.setActiveLiveClassTab('ongoing');
  }

  onReviewAttendance(): void {
    this.store.setActiveLiveClassTab('recordings');
  }

  onExportReport(): void {
    this.store.exportLiveClassesReport();
  }
}
