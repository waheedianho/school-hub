import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CLASS_SUBJECT_PERFORMANCE_DATA,
  GeneratedReportItem,
  MASTERY_DISTRIBUTION_DATA,
  MasteryDistributionItem,
  PERFORMANCE_TREND_DATA,
  PerformanceTrendPoint,
  QUICK_REPORTS_LIST,
  QuickReportType,
  RECENT_GENERATED_REPORTS,
  REPORT_LEARNERS_ATTENTION,
  ReportLearnerAttentionItem,
  ReportsFilterValues,
  ReportsMetric,
  SubjectPerformanceItem,
  TEACHER_REPORTS_METRICS,
  TOPIC_MASTERY_DATA,
  TopicMasteryItem,
} from '../data/teacher-reports.data';
import { MasteryDistributionChartComponent } from './mastery-distribution-chart/mastery-distribution-chart';
import { QuickReportsPanelComponent } from './quick-reports-panel/quick-reports-panel';
import { RecentReportsTableComponent } from './recent-reports-table/recent-reports-table';
import { ReportsAttentionPanelComponent } from './reports-attention-panel/reports-attention-panel';
import { ReportsExportPanelComponent } from './reports-export-panel/reports-export-panel';
import { ReportsFiltersComponent } from './reports-filters/reports-filters';
import { ReportsMetricsComponent } from './reports-metrics/reports-metrics';
import { ReportsTrendChartComponent } from './reports-trend-chart/reports-trend-chart';
import { SubjectPerformanceChartComponent } from './subject-performance-chart/subject-performance-chart';
import { TopicMasteryTableComponent } from './topic-mastery-table/topic-mastery-table';

@Component({
  selector: 'school-hub-teacher-reports',
  imports: [
    ReportsMetricsComponent,
    ReportsFiltersComponent,
    ReportsTrendChartComponent,
    SubjectPerformanceChartComponent,
    MasteryDistributionChartComponent,
    TopicMasteryTableComponent,
    RecentReportsTableComponent,
    QuickReportsPanelComponent,
    ReportsAttentionPanelComponent,
    ReportsExportPanelComponent,
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherReportsComponent {
  private readonly router = inject(Router);

  readonly metrics = signal<ReportsMetric[]>(TEACHER_REPORTS_METRICS);
  readonly trendPoints = signal<PerformanceTrendPoint[]>(
    PERFORMANCE_TREND_DATA,
  );
  readonly subjectPerformance = signal<SubjectPerformanceItem[]>(
    CLASS_SUBJECT_PERFORMANCE_DATA,
  );
  readonly masteryDistribution = signal<MasteryDistributionItem[]>(
    MASTERY_DISTRIBUTION_DATA,
  );
  readonly topicMastery = signal<TopicMasteryItem[]>(TOPIC_MASTERY_DATA);
  readonly recentReports = signal<GeneratedReportItem[]>(
    RECENT_GENERATED_REPORTS,
  );
  readonly quickReports = signal<QuickReportType[]>(QUICK_REPORTS_LIST);
  readonly attentionLearners = signal<ReportLearnerAttentionItem[]>(
    REPORT_LEARNERS_ATTENTION,
  );

  readonly filters = signal<ReportsFilterValues>({
    className: 'JSS 1A',
    subject: 'All Subjects',
    term: 'Third Term',
    dateRange: 'Apr 14 – May 12, 2025',
  });

  onFiltersChanged(newFilters: ReportsFilterValues): void {
    this.filters.set(newFilters);
  }

  onGenerateReport(): void {
    // Generate report workflow trigger
  }

  onViewFullTopicAnalysis(): void {
    this.router.navigate(['/teacher/curriculum']);
  }

  onViewReport(): void {
    this.router.navigate(['/teacher/reports/learner-analysis']);
  }

  onDownloadReport(): void {
    // Download action
  }

  onOpenMenu(): void {
    // More options menu
  }

  onViewAllReports(): void {
    // View all reports list
  }

  onQuickReportSelected(reportId: string): void {
    if (reportId === 'progress-report' || reportId === 'report-card') {
      this.router.navigate(['/teacher/reports/learner-analysis']);
    } else if (reportId === 'assessment-analysis') {
      this.router.navigate(['/teacher/assessments']);
    }
  }

  onViewLearnerDetail(): void {
    this.router.navigate(['/teacher/reports/learner-analysis']);
  }

  onViewAllAttention(): void {
    this.router.navigate(['/teacher/learners']);
  }

  onExportPdf(): void {
    // Export PDF handler
  }

  onExportExcel(): void {
    // Export Excel handler
  }

  onShareWithParent(): void {
    // Share with parent handler
  }
}
