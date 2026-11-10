import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { ReportTab } from '../data/school-admin.models';
import { ReportsSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { ReportsPerformanceChartsComponent } from './performance-charts/performance-charts';
import { ReportsSubjectSummaryTableComponent } from './subject-summary-table/subject-summary-table';
import { ReportsHighlightCardsComponent } from './highlight-cards/highlight-cards';
import { ReportsSidebarComponent } from './reports-sidebar/reports-sidebar';
import { ReportsClassReportCardsComponent } from './class-report-cards/class-report-cards';
import { ReportsStudentReportModalComponent } from './student-report-modal/student-report-modal';
import { ReportsExportModalComponent } from './export-modal/export-modal';
import { ReportsShareModalComponent } from './share-modal/share-modal';

@Component({
  selector: 'school-hub-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReportsSummaryMetricsComponent,
    ReportsPerformanceChartsComponent,
    ReportsSubjectSummaryTableComponent,
    ReportsHighlightCardsComponent,
    ReportsSidebarComponent,
    ReportsClassReportCardsComponent,
    ReportsStudentReportModalComponent,
    ReportsExportModalComponent,
    ReportsShareModalComponent,
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  readonly store = inject(SchoolAdminStore);
  readonly activeTab = this.store.activeReportTab;
  readonly statusMessage = this.store.setupSaveStatus;

  readonly tabs: { id: ReportTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'academic-performance', label: 'Academic Performance' },
    { id: 'attendance-engagement', label: 'Attendance & Engagement' },
    { id: 'subject-analysis', label: 'Subject Analysis' },
    { id: 'teacher-performance', label: 'Teacher Performance' },
    { id: 'interventions', label: 'Interventions' },
    { id: 'export', label: 'Export' },
  ];

  selectTab(tab: ReportTab): void {
    if (tab === 'export') {
      this.store.openExportReportModal();
    } else {
      this.store.setActiveReportTab(tab);
    }
  }

  onExport(): void {
    this.store.openExportReportModal();
  }

  onApproveAll(): void {
    this.store.approveAllSchoolReports();
  }
}
