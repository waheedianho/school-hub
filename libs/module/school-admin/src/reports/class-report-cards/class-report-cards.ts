import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { ClassReportCardSummary } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-reports-class-report-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-report-cards.html',
  styleUrls: ['./class-report-cards.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsClassReportCardsComponent {
  readonly store = inject(SchoolAdminStore);
  readonly classes = this.store.filteredClassReportCards;
  readonly classFilter = this.store.reportClassFilter;
  readonly searchQuery = this.store.reportSearchQuery;
  readonly approvalRate = this.store.overallReportsApprovalRate;

  onFilterClass(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.setReportClassFilter(target.value);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setReportSearchQuery(target.value);
  }

  onPreviewSampleReport(): void {
    this.store.openStudentReportCard();
  }

  onApproveClass(classId: string, event: Event): void {
    event.stopPropagation();
    this.store.approveClassReportCards(classId);
  }

  getStatusClass(status: ClassReportCardSummary['status']): string {
    switch (status) {
      case 'Approved':
        return 'badge-approved';
      case 'In Progress':
        return 'badge-progress';
      case 'Pending Approval':
        return 'badge-pending';
      default:
        return 'badge-neutral';
    }
  }
}
