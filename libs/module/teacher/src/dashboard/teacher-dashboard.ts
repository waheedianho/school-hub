import { Component, signal } from '@angular/core';
import {
  TEACHER_CLASS_PERFORMANCE_DATA,
  TEACHER_CLASS_TOPICS_DATA,
  TEACHER_METRICS_DATA,
  TEACHER_PENDING_SUBMISSIONS_DATA,
  TEACHER_QUICK_ACTIONS_DATA,
  TEACHER_SCHEDULE_DATA,
  TEACHER_UNREAD_MESSAGES_DATA,
  TEACHER_UPCOMING_DEADLINES_DATA,
  TEACHER_WORKFLOW_STEPS,
} from '../data/teacher-dashboard.data';
import { DashboardMetricsComponent } from './dashboard-metrics/dashboard-metrics';
import { TodayScheduleComponent } from './today-schedule/today-schedule';
import { PendingReviewsComponent } from './pending-reviews/pending-reviews';
import { QuickActionsComponent } from './quick-actions/quick-actions';
import { UnreadMessagesComponent } from './unread-messages/unread-messages';
import { UpcomingDeadlinesComponent } from './upcoming-deadlines/upcoming-deadlines';
import { CurrentTopicsComponent } from './current-topics/current-topics';
import { ClassPerformanceComponent } from './class-performance/class-performance';
import { WorkflowReminderComponent } from './workflow-reminder/workflow-reminder';

@Component({
  selector: 'lib-teacher, school-hub-teacher-dashboard',
  standalone: true,
  imports: [
    DashboardMetricsComponent,
    TodayScheduleComponent,
    PendingReviewsComponent,
    QuickActionsComponent,
    UnreadMessagesComponent,
    UpcomingDeadlinesComponent,
    CurrentTopicsComponent,
    ClassPerformanceComponent,
    WorkflowReminderComponent,
  ],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.scss',
})
export class TeacherDashboardComponent {
  readonly metrics = signal(TEACHER_METRICS_DATA);
  readonly schedule = signal(TEACHER_SCHEDULE_DATA);
  readonly pendingSubmissions = signal(TEACHER_PENDING_SUBMISSIONS_DATA);
  readonly quickActions = signal(TEACHER_QUICK_ACTIONS_DATA);
  readonly unreadMessages = signal(TEACHER_UNREAD_MESSAGES_DATA);
  readonly upcomingDeadlines = signal(TEACHER_UPCOMING_DEADLINES_DATA);
  readonly classTopics = signal(TEACHER_CLASS_TOPICS_DATA);
  readonly classPerformance = signal(TEACHER_CLASS_PERFORMANCE_DATA);
  readonly workflowSteps = signal(TEACHER_WORKFLOW_STEPS);
}
