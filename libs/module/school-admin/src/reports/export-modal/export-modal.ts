import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-reports-export-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-modal.html',
  styleUrls: ['./export-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsExportModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isExportReportModalOpen;

  readonly selectedFormat = signal<'PDF' | 'Excel' | 'CSV'>('PDF');
  readonly selectedReportType = signal<string>(
    'Comprehensive School Performance Report',
  );

  onClose(): void {
    this.store.closeExportReportModal();
  }

  setFormat(format: 'PDF' | 'Excel' | 'CSV'): void {
    this.selectedFormat.set(format);
  }

  setReportType(type: string): void {
    this.selectedReportType.set(type);
  }

  onSubmit(): void {
    this.store.exportSchoolReport(this.selectedFormat());
  }
}
