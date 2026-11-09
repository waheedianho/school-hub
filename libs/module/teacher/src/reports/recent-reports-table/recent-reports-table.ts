import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { GeneratedReportItem } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-recent-reports-table',
  imports: [],
  templateUrl: './recent-reports-table.html',
  styleUrl: './recent-reports-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentReportsTableComponent {
  readonly reports = input.required<GeneratedReportItem[]>();
  readonly viewReport = output<GeneratedReportItem>();
  readonly downloadReport = output<GeneratedReportItem>();
  readonly openMenu = output<GeneratedReportItem>();
  readonly viewAllReports = output<void>();

  getStatusClass(status: string): string {
    switch (status) {
      case 'Ready':
        return 'status-ready';
      case 'Shared':
        return 'status-shared';
      default:
        return 'status-pending';
    }
  }
}
