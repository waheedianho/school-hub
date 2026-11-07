import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  ASSIGNMENTS_QUICK_ACTIONS,
  AssignmentsFilterValues,
  COMMON_ISSUES_OBSERVED,
  PENDING_SUBMISSIONS,
  RECENT_FEEDBACK_ACTIVITY,
  REVIEW_QUEUE_ITEMS,
  SUBMISSION_BREAKDOWN_DATA,
  TEACHER_ASSIGNMENTS_METRICS,
} from '../data/teacher-assignments.data';
import { AssignmentsFiltersComponent } from './assignments-filters/assignments-filters';
import { AssignmentsMetricsComponent } from './assignments-metrics/assignments-metrics';
import { AssignmentsQuickActionsComponent } from './assignments-quick-actions/assignments-quick-actions';
import { CommonIssuesObservedComponent } from './common-issues-observed/common-issues-observed';
import { PendingSubmissionsTableComponent } from './pending-submissions-table/pending-submissions-table';
import { RecentFeedbackActivityComponent } from './recent-feedback-activity/recent-feedback-activity';
import { ReviewQueueComponent } from './review-queue/review-queue';
import { ScoringWorkflowComponent } from './scoring-workflow/scoring-workflow';
import { SubmissionBreakdownComponent } from './submission-breakdown/submission-breakdown';

@Component({
  selector: 'school-hub-teacher-assignments',
  imports: [
    AssignmentsMetricsComponent,
    AssignmentsFiltersComponent,
    PendingSubmissionsTableComponent,
    SubmissionBreakdownComponent,
    RecentFeedbackActivityComponent,
    CommonIssuesObservedComponent,
    ReviewQueueComponent,
    AssignmentsQuickActionsComponent,
    ScoringWorkflowComponent,
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherAssignmentsComponent {
  readonly metrics = signal(TEACHER_ASSIGNMENTS_METRICS);
  readonly allSubmissions = signal(PENDING_SUBMISSIONS);
  readonly breakdownData = signal(SUBMISSION_BREAKDOWN_DATA);
  readonly feedbackList = signal(RECENT_FEEDBACK_ACTIVITY);
  readonly commonIssues = signal(COMMON_ISSUES_OBSERVED);
  readonly reviewQueue = signal(REVIEW_QUEUE_ITEMS);
  readonly quickActions = signal(ASSIGNMENTS_QUICK_ACTIONS);

  readonly filters = signal<AssignmentsFilterValues>({
    term: 'Term 1 2025/2026',
    className: 'All Classes',
    subject: 'English Language',
    submissionType: 'All Types',
    status: 'All Status',
    searchQuery: '',
  });

  readonly filteredSubmissions = computed(() => {
    const list = this.allSubmissions();
    const currentFilters = this.filters();
    const query = currentFilters.searchQuery.toLowerCase().trim();

    return list.filter((item) => {
      if (
        currentFilters.className !== 'All Classes' &&
        item.className !== currentFilters.className
      ) {
        return false;
      }

      if (
        currentFilters.submissionType !== 'All Types' &&
        item.submissionType !== currentFilters.submissionType
      ) {
        return false;
      }

      if (
        currentFilters.status !== 'All Status' &&
        item.status !== currentFilters.status
      ) {
        return false;
      }

      if (query) {
        const matchesName = item.learnerName.toLowerCase().includes(query);
        const matchesClass = item.className.toLowerCase().includes(query);
        const matchesTopic = item.topic.toLowerCase().includes(query);
        const matchesType = item.submissionType.toLowerCase().includes(query);
        if (!matchesName && !matchesClass && !matchesTopic && !matchesType) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: AssignmentsFilterValues): void {
    this.filters.set(newFilters);
  }

  onReviewSubmission(): void {
    // Handled in table component navigation
  }
}
