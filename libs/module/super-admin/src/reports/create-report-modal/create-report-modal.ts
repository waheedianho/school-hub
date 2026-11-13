import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CreateReportFormData,
  ReportCategory,
  ReportFormat,
  ReportFrequency,
} from '../../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-create-report-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-report-modal.html',
  styleUrls: ['./create-report-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReportModalComponent {
  readonly reportCreated = output<CreateReportFormData>();
  readonly closed = output<void>();

  readonly reportName = signal<string>('');
  readonly description = signal<string>('');
  readonly category = signal<ReportCategory>('Academic Reports');
  readonly scope = signal<string>('All Schools');
  readonly frequency = signal<ReportFrequency>('Monthly');
  readonly format = signal<ReportFormat>('PDF, XLSX');
  readonly includeCharts = signal<boolean>(true);
  readonly notifyRecipients = signal<boolean>(true);

  readonly categoriesList: ReportCategory[] = [
    'Academic Reports',
    'School Performance',
    'Subscription Reports',
    'Usage Reports',
    'Safeguarding Reports',
    'Custom Reports',
  ];

  readonly frequenciesList: ReportFrequency[] = [
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Annual',
    'On-Demand',
  ];

  readonly formatsList: ReportFormat[] = [
    'PDF',
    'XLSX',
    'CSV',
    'PDF, XLSX',
    'PDF, CSV',
  ];

  onSubmit(): void {
    if (!this.reportName().trim()) return;

    this.reportCreated.emit({
      reportName: this.reportName().trim(),
      description:
        this.description().trim() ||
        `${this.category()} covering platform schools.`,
      category: this.category(),
      scope: this.scope(),
      frequency: this.frequency(),
      format: this.format(),
      includeCharts: this.includeCharts(),
      notifyRecipients: this.notifyRecipients(),
    });
  }

  onClose(): void {
    this.closed.emit();
  }
}
