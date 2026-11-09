import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchoolAdminStore } from '../data/school-admin.store';
import { DashboardMetricsComponent } from './dashboard-metrics/dashboard-metrics';
import { AcademicPerformanceComponent } from './academic-performance/academic-performance';
import { CurriculumCoverageComponent } from './curriculum-coverage/curriculum-coverage';
import { TopSubjectsComponent } from './top-subjects/top-subjects';
import { AdminAlertsComponent } from './admin-alerts/admin-alerts';
import { TeacherActivityComponent } from './teacher-activity/teacher-activity';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events';
import { SafeguardingBannerComponent } from './safeguarding-banner/safeguarding-banner';

@Component({
  selector: 'school-hub-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardMetricsComponent,
    AcademicPerformanceComponent,
    CurriculumCoverageComponent,
    TopSubjectsComponent,
    AdminAlertsComponent,
    TeacherActivityComponent,
    UpcomingEventsComponent,
    SafeguardingBannerComponent,
  ],
  templateUrl: './school-admin-dashboard.html',
  styleUrl: './school-admin-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolAdminDashboardComponent {
  readonly store = inject(SchoolAdminStore);

  readonly metrics = this.store.metrics;
  readonly performance = this.store.performanceOverview;
  readonly coverage = this.store.curriculumCoverage;
  readonly topSubjects = this.store.topPerformingSubjects;
  readonly alerts = this.store.alerts;
  readonly teacherActivities = this.store.teacherActivities;
  readonly upcomingEvents = this.store.upcomingEvents;
  readonly safeguardingNotice = this.store.safeguardingNotice;
  readonly lastUpdated = this.store.lastUpdated;

  refresh(): void {
    this.store.refreshMetrics();
  }

  onDismissAlert(alertId: string): void {
    this.store.dismissAlert(alertId);
  }
}
