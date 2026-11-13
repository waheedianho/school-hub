import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import { AttentionSchool } from '../data/super-admin-analytics.models';
import { AnalyticsMetricsComponent } from './analytics-metrics/analytics-metrics';
import { UsageTrendChartComponent } from './usage-trend-chart/usage-trend-chart';
import { ActiveInstitutionsChartComponent } from './active-institutions-chart/active-institutions-chart';
import { UsageRoleChartComponent } from './usage-role-chart/usage-role-chart';
import { AssessmentTrendChartComponent } from './assessment-trend-chart/assessment-trend-chart';
import { SubjectConsumptionChartComponent } from './subject-consumption-chart/subject-consumption-chart';
import { RegionSpreadCardComponent } from './region-spread-card/region-spread-card';
import { EngagementHeatmapComponent } from './engagement-heatmap/engagement-heatmap';
import { AnalyticsSidebarComponent } from './analytics-sidebar/analytics-sidebar';
import { AnalyticsPerformanceBarComponent } from './analytics-performance-bar/analytics-performance-bar';

@Component({
  selector: 'school-hub-platform-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AnalyticsMetricsComponent,
    UsageTrendChartComponent,
    ActiveInstitutionsChartComponent,
    UsageRoleChartComponent,
    AssessmentTrendChartComponent,
    SubjectConsumptionChartComponent,
    RegionSpreadCardComponent,
    EngagementHeatmapComponent,
    AnalyticsSidebarComponent,
    AnalyticsPerformanceBarComponent,
  ],
  templateUrl: './platform-analytics.html',
  styleUrls: ['./platform-analytics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformAnalyticsComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  readonly toastMessage = signal<string | null>(null);
  readonly selectedSchool = signal<AttentionSchool | null>(null);
  readonly isDatePickerOpen = signal<boolean>(false);

  readonly dateRanges = [
    'May 12 – May 18, 2025',
    'May 5 – May 11, 2025',
    'Apr 28 – May 4, 2025',
    'Last 30 Days',
    'This Quarter (Q2 2025)',
  ];

  toggleDatePicker(): void {
    this.isDatePickerOpen.update((open) => !open);
  }

  selectDateRange(range: string): void {
    this.onDateRangeChange(range);
    this.isDatePickerOpen.set(false);
  }

  onDateRangeChange(range: string): void {
    this.store.setAnalyticsDateRange(range);
    this.showToast(`Updated analytics view for ${range}`);
  }

  handleSchoolSelect(school: AttentionSchool): void {
    this.selectedSchool.set(school);
  }

  closeSchoolModal(): void {
    this.selectedSchool.set(null);
  }

  navigateToSchools(): void {
    this.router.navigate(['/super-admin/schools']);
  }

  exportReport(): void {
    this.showToast(
      'Exporting platform analytics executive summary (PDF / CSV)...',
    );
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }
}
