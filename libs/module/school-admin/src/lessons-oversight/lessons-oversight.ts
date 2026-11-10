import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { LessonsSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { LessonMonitoringTableComponent } from './monitoring-table/monitoring-table';
import { OversightSidebarComponent } from './oversight-sidebar/oversight-sidebar';
import { LessonReviewsComponent } from './lesson-reviews/lesson-reviews';
import { ReadinessAlertsComponent } from './readiness-alerts/readiness-alerts';
import { LessonsQuickActionsComponent } from './quick-actions/quick-actions';

@Component({
  selector: 'school-hub-lessons-oversight',
  standalone: true,
  imports: [
    CommonModule,
    LessonsSummaryMetricsComponent,
    LessonMonitoringTableComponent,
    OversightSidebarComponent,
    LessonReviewsComponent,
    ReadinessAlertsComponent,
    LessonsQuickActionsComponent,
  ],
  templateUrl: './lessons-oversight.html',
  styleUrls: ['./lessons-oversight.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsOversightComponent {
  readonly store = inject(SchoolAdminStore);

  readonly tabs: Array<{
    id:
      | 'active-lessons'
      | 'delivery-oversight'
      | 'lesson-reviews'
      | 'readiness-alerts';
    label: string;
    icon: string;
    badge?: number;
  }> = [
    {
      id: 'active-lessons',
      label: 'Active Lessons',
      icon: 'ri-file-list-3-line',
    },
    {
      id: 'delivery-oversight',
      label: 'Delivery Oversight',
      icon: 'ri-book-open-line',
    },
    {
      id: 'lesson-reviews',
      label: 'Lesson Reviews',
      icon: 'ri-survey-line',
      badge: 5,
    },
    {
      id: 'readiness-alerts',
      label: 'Readiness Alerts',
      icon: 'ri-alarm-warning-line',
      badge: 4,
    },
  ];

  setTab(
    tab:
      | 'active-lessons'
      | 'delivery-oversight'
      | 'lesson-reviews'
      | 'readiness-alerts',
  ): void {
    this.store.setActiveLessonsTab(tab);
  }

  onCheckDeliveryPacks(): void {
    this.store.setActiveLessonsTab('delivery-oversight');
  }

  onScheduleObservation(): void {
    this.store.setupSaveStatus.set(
      'Classroom observation scheduler opened. Select teacher, class, and observation rubric.',
    );
  }

  dismissNotification(): void {
    this.store.setupSaveStatus.set(null);
  }
}
