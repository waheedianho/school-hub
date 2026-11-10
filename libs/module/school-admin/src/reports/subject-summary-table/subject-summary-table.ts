import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { SubjectPerformanceRow } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-reports-subject-summary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-summary-table.html',
  styleUrls: ['./subject-summary-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSubjectSummaryTableComponent {
  readonly store = inject(SchoolAdminStore);
  readonly rows = this.store.filteredSubjectPerformance;
  readonly searchQuery = this.store.reportSearchQuery;
  readonly selectedSubjectFilter = this.store.reportSubjectFilter;

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setReportSearchQuery(target.value);
  }

  onSubjectFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.setReportSubjectFilter(target.value);
  }

  getStatusClass(status: SubjectPerformanceRow['status']): string {
    switch (status) {
      case 'Good':
        return 'status-good';
      case 'Needs Attention':
        return 'status-attention';
      case 'Monitor':
        return 'status-monitor';
      default:
        return '';
    }
  }
}
