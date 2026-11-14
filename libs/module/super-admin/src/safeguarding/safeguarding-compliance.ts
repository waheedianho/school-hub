import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import {
  SafeguardingCase,
  SafeguardingCaseStatus,
  SafeguardingTab,
} from '../data/super-admin-safeguarding.models';
import { SafeguardingMetricsComponent } from './safeguarding-metrics/safeguarding-metrics';
import { SafeguardingTableComponent } from './safeguarding-table/safeguarding-table';
import { SafeguardingBottomMetricsComponent } from './safeguarding-bottom-metrics/safeguarding-bottom-metrics';
import { SafeguardingSidebarComponent } from './safeguarding-sidebar/safeguarding-sidebar';
import { AssignReviewModalComponent } from './assign-review-modal/assign-review-modal';
import { CaseDetailModalComponent } from './case-detail-modal/case-detail-modal';

@Component({
  selector: 'school-hub-safeguarding-compliance',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SafeguardingMetricsComponent,
    SafeguardingTableComponent,
    SafeguardingBottomMetricsComponent,
    SafeguardingSidebarComponent,
    AssignReviewModalComponent,
    CaseDetailModalComponent,
  ],
  templateUrl: './safeguarding-compliance.html',
  styleUrl: './safeguarding-compliance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingComplianceComponent {
  readonly store = inject(SuperAdminStore);

  readonly tabs: SafeguardingTab[] = [
    'Incident Queue',
    'Flagged Communications',
    'Consent & Permissions',
    'Policy Compliance',
    'Escalations',
    'Audit Reviews',
  ];

  readonly activeModal = signal<'assign' | 'detail' | null>(null);
  readonly selectedCaseIdForAction = signal<string | null>(null);

  get selectedCase(): SafeguardingCase | undefined {
    const id = this.selectedCaseIdForAction();
    return this.store.safeguardingCases().find((c) => c.id === id);
  }

  onTabChange(tab: SafeguardingTab): void {
    this.store.setSafeguardingTab(tab);
  }

  openAssignModal(caseId?: string): void {
    this.selectedCaseIdForAction.set(caseId || null);
    this.activeModal.set('assign');
  }

  openDetailModal(caseId: string): void {
    this.selectedCaseIdForAction.set(caseId);
    this.activeModal.set('detail');
  }

  closeModal(): void {
    this.activeModal.set(null);
    this.selectedCaseIdForAction.set(null);
  }

  onAssigned(data: {
    caseId: string;
    reviewerName: string;
    reviewerRole: string;
    notes?: string;
  }): void {
    this.store.assignSafeguardingReviewer(
      data.caseId,
      data.reviewerName,
      data.reviewerRole,
    );
  }

  onStatusUpdate(data: {
    caseId: string;
    newStatus: SafeguardingCaseStatus;
  }): void {
    this.store.updateSafeguardingCaseStatus(data.caseId, data.newStatus);
  }

  exportData(): void {
    const cases = this.store.filteredSafeguardingCases();
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Case ID,Institution,Location,Category,Severity,Reported By,Assigned To,Status,Last Updated',
        ...cases.map(
          (c) =>
            `"${c.id}","${c.institution}","${c.location}","${c.category}","${c.severity}","${c.reportedBy.name}","${c.assignedTo.name}","${c.status}","${c.lastUpdated}"`,
        ),
      ].join('\n');

    if (typeof window !== 'undefined') {
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'safeguarding-cases-report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
