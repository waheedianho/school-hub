import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  LearnerReportDetail,
  MARYAM_REPORT_ANALYSIS_DETAIL,
} from '../../data/teacher-reports.data';
import { ReportsMetricsComponent } from '../reports-metrics/reports-metrics';

@Component({
  selector: 'school-hub-learner-report-analysis',
  imports: [ReportsMetricsComponent],
  templateUrl: './learner-report-analysis.html',
  styleUrl: './learner-report-analysis.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnerReportAnalysisComponent {
  private readonly router = inject(Router);

  readonly detail = signal<LearnerReportDetail>(MARYAM_REPORT_ANALYSIS_DETAIL);
  readonly timeFrame = signal('Weekly');
  readonly copied = signal(false);

  onBackToReports(): void {
    this.router.navigate(['/teacher/reports']);
  }

  onCopyId(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  onGenerateReport(): void {
    // Generate report
  }

  onViewAllPortfolio(): void {
    this.router.navigate(['/teacher/assignments']);
  }

  onDownloadPdf(): void {
    // Download PDF
  }

  onShareWithParent(): void {
    // Share with parent
  }

  onPrintReport(): void {
    // Print report
  }
}
