import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PlatformReport,
  ReportCategory,
} from '../../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-reports-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-table.html',
  styleUrls: ['./reports-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsTableComponent {
  readonly reports = input.required<PlatformReport[]>();
  readonly totalCount = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly searchQuery = input.required<string>();
  readonly selectedSchool = input.required<string>();
  readonly selectedType = input.required<string>();
  readonly selectedStatus = input.required<string>();
  readonly selectedDateRange = input.required<string>();

  readonly searchChange = output<string>();
  readonly schoolChange = output<string>();
  readonly typeChange = output<string>();
  readonly statusChange = output<string>();
  readonly pageChange = output<number>();
  readonly createReportClicked = output<void>();
  readonly scheduleReportClicked = output<void>();
  readonly exportClicked = output<void>();
  readonly viewReportDetails = output<PlatformReport>();
  readonly downloadReport = output<PlatformReport>();
  readonly triggerGenerate = output<PlatformReport>();

  readonly openActionMenuId = signal<string | null>(null);

  readonly schoolsList = [
    'All Schools',
    'Greenfield International',
    'Sunrise Public School',
    'Riverside Academy',
  ];

  readonly typesList = [
    'All Report Types',
    'Academic Reports',
    'School Performance',
    'Subscription Reports',
    'Usage Reports',
    'Safeguarding Reports',
    'PDF',
    'XLSX',
  ];

  readonly statusesList = [
    'All Statuses',
    'Ready',
    'Scheduled',
    'Pending Review',
    'Needs Update',
  ];

  toggleActionMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.openActionMenuId() === id) {
      this.openActionMenuId.set(null);
    } else {
      this.openActionMenuId.set(id);
    }
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onSearchInput(value: string): void {
    this.searchChange.emit(value);
  }

  onSchoolSelect(school: string): void {
    this.schoolChange.emit(school);
  }

  onTypeSelect(type: string): void {
    this.typeChange.emit(type);
  }

  onStatusSelect(status: string): void {
    this.statusChange.emit(status);
  }

  onPageSelect(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  onView(rep: PlatformReport): void {
    this.closeActionMenu();
    this.viewReportDetails.emit(rep);
  }

  onDownload(rep: PlatformReport): void {
    this.closeActionMenu();
    this.downloadReport.emit(rep);
  }

  onGenerate(rep: PlatformReport): void {
    this.closeActionMenu();
    this.triggerGenerate.emit(rep);
  }

  get startItemIndex(): number {
    if (this.totalCount() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage() * this.pageSize(), this.totalCount());
  }

  getCategoryBadgeClass(category: ReportCategory): string {
    switch (category) {
      case 'School Performance':
        return 'cat-badge-performance';
      case 'Academic Reports':
        return 'cat-badge-academic';
      case 'Usage Reports':
        return 'cat-badge-usage';
      case 'Subscription Reports':
        return 'cat-badge-subscription';
      case 'Safeguarding Reports':
        return 'cat-badge-safeguarding';
      case 'Custom Reports':
        return 'cat-badge-custom';
      default:
        return 'cat-badge-default';
    }
  }
}
