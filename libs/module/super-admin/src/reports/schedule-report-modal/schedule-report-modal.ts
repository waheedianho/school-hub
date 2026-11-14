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
  ReportFormat,
  ReportFrequency,
  ScheduleReportFormData,
} from '../../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-schedule-report-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-report-modal.html',
  styleUrls: ['./schedule-report-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleReportModalComponent {
  readonly reports = input.required<PlatformReport[]>();
  readonly reportScheduled = output<ScheduleReportFormData>();
  readonly closed = output<void>();

  readonly selectedReportId = signal<string>('');
  readonly scheduleTime = signal<string>('Jun 10, 2025 • 09:00 AM');
  readonly frequency = signal<ReportFrequency>('Weekly');
  readonly deliveryEmail = signal<string>('superadmin@learno.com');
  readonly format = signal<ReportFormat>('PDF, XLSX');

  readonly frequenciesList: ReportFrequency[] = [
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
  ];

  onSubmit(): void {
    if (!this.selectedReportId()) return;

    this.reportScheduled.emit({
      reportId: this.selectedReportId(),
      scheduleTime: this.scheduleTime(),
      frequency: this.frequency(),
      deliveryEmail: this.deliveryEmail(),
      format: this.format(),
    });
  }

  onClose(): void {
    this.closed.emit();
  }
}
