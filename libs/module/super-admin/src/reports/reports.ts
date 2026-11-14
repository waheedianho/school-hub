import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminStore } from '../data/super-admin.store';
import { ReportsMetricsComponent } from './reports-metrics/reports-metrics';
import { ReportsTableComponent } from './reports-table/reports-table';
import { ReportsBottomMetricsComponent } from './reports-bottom-metrics/reports-bottom-metrics';
import { ReportsSidebarComponent } from './reports-sidebar/reports-sidebar';
import { CreateReportModalComponent } from './create-report-modal/create-report-modal';
import { ScheduleReportModalComponent } from './schedule-report-modal/schedule-report-modal';
import { ReportDetailModalComponent } from './report-detail-modal/report-detail-modal';
import {
  CreateReportFormData,
  PlatformReport,
  QuickReportTemplate,
  ScheduleReportFormData,
} from '../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReportsMetricsComponent,
    ReportsTableComponent,
    ReportsBottomMetricsComponent,
    ReportsSidebarComponent,
    CreateReportModalComponent,
    ScheduleReportModalComponent,
    ReportDetailModalComponent,
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  readonly store = inject(SuperAdminStore);

  readonly tabs: string[] = [
    'Academic Reports',
    'School Performance',
    'Subscription Reports',
    'Usage Reports',
    'Safeguarding Reports',
    'Custom Reports',
  ];

  readonly isDatePickerOpen = signal<boolean>(false);
  readonly dateRangeOptions = [
    'May 1 – May 31, 2025',
    'Apr 1 – Apr 30, 2025',
    'Mar 1 – Mar 31, 2025',
    'Last 30 Days',
    'This Quarter',
    'Year to Date',
  ];

  readonly isCreateReportModalOpen = signal<boolean>(false);
  readonly isScheduleReportModalOpen = signal<boolean>(false);
  readonly selectedDetailReport = signal<PlatformReport | null>(null);
  readonly toastMessage = signal<string | null>(null);

  selectTab(tab: string): void {
    this.store.setReportTab(tab);
  }

  toggleDatePicker(): void {
    this.isDatePickerOpen.update((v) => !v);
  }

  selectDateRange(range: string): void {
    this.store.setReportsDateRange(range);
    this.isDatePickerOpen.set(false);
  }

  onSearchChange(query: string): void {
    this.store.setReportsSearch(query);
  }

  onSchoolChange(school: string): void {
    this.store.setReportsSchoolFilter(school);
  }

  onTypeChange(type: string): void {
    this.store.setReportsTypeFilter(type);
  }

  onStatusChange(status: string): void {
    this.store.setReportsStatusFilter(status);
  }

  onPageChange(page: number): void {
    this.store.setReportsPage(page);
  }

  openCreateReportModal(): void {
    this.isCreateReportModalOpen.set(true);
  }

  closeCreateReportModal(): void {
    this.isCreateReportModalOpen.set(false);
  }

  onReportCreated(formData: CreateReportFormData): void {
    const rep = this.store.createCustomReport(formData);
    this.isCreateReportModalOpen.set(false);
    this.showToast(`Report "${rep.name}" compiled and generated successfully!`);
  }

  openScheduleReportModal(): void {
    this.isScheduleReportModalOpen.set(true);
  }

  closeScheduleReportModal(): void {
    this.isScheduleReportModalOpen.set(false);
  }

  onReportScheduled(scheduleData: ScheduleReportFormData): void {
    this.store.scheduleReport(scheduleData);
    this.isScheduleReportModalOpen.set(false);
    this.showToast('Automated report schedule created successfully!');
  }

  openReportDetail(rep: PlatformReport): void {
    this.selectedDetailReport.set(rep);
  }

  closeReportDetail(): void {
    this.selectedDetailReport.set(null);
  }

  onDownloadReport(rep: PlatformReport): void {
    this.store.triggerReportGeneration(rep.id);
    this.showToast(`Downloading "${rep.name}" (${rep.format})...`);
  }

  onTriggerGenerate(rep: PlatformReport): void {
    this.store.triggerReportGeneration(rep.id);
    this.showToast(`Regenerating "${rep.name}" with latest school records...`);
  }

  onExportData(): void {
    this.showToast('Exporting reports metadata ledger summary...');
  }

  onQuickTemplateSelected(tmpl: QuickReportTemplate): void {
    this.showToast(`Applying template: ${tmpl.title}`);
    this.openCreateReportModal();
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3500);
  }
}
