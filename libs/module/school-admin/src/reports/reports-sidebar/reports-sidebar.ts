import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { PriorityAttentionArea } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-reports-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-sidebar.html',
  styleUrls: ['./reports-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSidebarComponent {
  readonly store = inject(SchoolAdminStore);
  readonly summary = this.store.reportsSidebarSummary;
  readonly attentionAreas = this.store.priorityAttentionAreas;
  readonly selectedArea = this.store.selectedReportAttentionArea;
  readonly lastUpdated = signal<string>('13 May 2025, 10:30 AM');

  onSelectArea(item: PriorityAttentionArea): void {
    this.store.selectReportAttentionArea(item);
  }

  onExportReport(): void {
    this.store.openExportReportModal();
  }

  onApproveAll(): void {
    this.store.approveAllSchoolReports();
  }

  onViewClassBreakdown(): void {
    this.store.setActiveReportTab('academic-performance');
  }

  onShareLeadership(): void {
    this.store.openShareLeadershipModal();
  }

  refreshData(): void {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    this.lastUpdated.set(formatted);
    this.store.setupSaveStatus.set(
      'Report metrics refreshed from central database.',
    );
  }
}
