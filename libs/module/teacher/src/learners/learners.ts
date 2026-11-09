import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  LEARNERS_NEEDING_ATTENTION_DATA,
  LEARNERS_QUICK_ACTIONS,
  LearnerNeedingAttentionItem,
  LearnerProfileItem,
  LearnersFilterValues,
  LearnersMetric,
  LearnersQuickAction,
  PendingSubmissionReviewItem,
  RECENT_SUBMISSIONS_PENDING_REVIEW,
  TEACHER_LEARNERS_LIST,
  TEACHER_LEARNERS_METRICS,
  TOP_PERFORMERS_THIS_WEEK,
  TopPerformerItem,
} from '../data/teacher-learners.data';
import { LearnersFiltersComponent } from './learners-filters/learners-filters';
import { LearnersListTableComponent } from './learners-list-table/learners-list-table';
import { LearnersMetricsComponent } from './learners-metrics/learners-metrics';
import { LearnersDirectoryAttentionComponent } from './learners-needing-attention/learners-needing-attention';
import { LearnersQuickActionsComponent } from './learners-quick-actions/learners-quick-actions';
import { RecentPendingSubmissionsComponent } from './recent-pending-submissions/recent-pending-submissions';
import { TopPerformersComponent } from './top-performers/top-performers';

@Component({
  selector: 'school-hub-teacher-learners',
  imports: [
    LearnersMetricsComponent,
    LearnersFiltersComponent,
    LearnersListTableComponent,
    LearnersDirectoryAttentionComponent,
    RecentPendingSubmissionsComponent,
    TopPerformersComponent,
    LearnersQuickActionsComponent,
  ],
  templateUrl: './learners.html',
  styleUrl: './learners.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherLearnersComponent {
  private readonly router = inject(Router);

  readonly metrics = signal<LearnersMetric[]>(TEACHER_LEARNERS_METRICS);
  readonly allLearners = signal<LearnerProfileItem[]>(TEACHER_LEARNERS_LIST);
  readonly attentionLearners = signal<LearnerNeedingAttentionItem[]>(
    LEARNERS_NEEDING_ATTENTION_DATA,
  );
  readonly pendingSubmissions = signal<PendingSubmissionReviewItem[]>(
    RECENT_SUBMISSIONS_PENDING_REVIEW,
  );
  readonly topPerformers = signal<TopPerformerItem[]>(TOP_PERFORMERS_THIS_WEEK);
  readonly quickActions = signal<LearnersQuickAction[]>(LEARNERS_QUICK_ACTIONS);

  readonly filters = signal<LearnersFilterValues>({
    className: 'All Classes',
    subject: 'All Subjects',
    performanceBand: 'All Bands',
    attendance: 'All',
    searchQuery: '',
  });

  readonly filteredLearners = computed(() => {
    const list = this.allLearners();
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
        currentFilters.performanceBand !== 'All Bands' &&
        item.performanceBand !== currentFilters.performanceBand
      ) {
        return false;
      }

      if (currentFilters.attendance !== 'All') {
        if (currentFilters.attendance === '90%+' && item.attendanceRate < 90) {
          return false;
        }
        if (
          currentFilters.attendance === '80-89%' &&
          (item.attendanceRate < 80 || item.attendanceRate >= 90)
        ) {
          return false;
        }
        if (currentFilters.attendance === '<80%' && item.attendanceRate >= 80) {
          return false;
        }
      }

      if (query) {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesId = item.learnerId.toLowerCase().includes(query);
        if (!matchesName && !matchesId) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: LearnersFilterValues): void {
    this.filters.set(newFilters);
  }

  onViewLearner(learner: LearnerProfileItem): void {
    this.router.navigate(['/teacher/classes'], {
      queryParams: { learnerId: learner.id },
    });
  }

  onOpenMenu(): void {
    // Menu interaction placeholder
  }

  onViewAllAttention(): void {
    this.filters.update((f) => ({ ...f, performanceBand: 'Below Average' }));
  }

  onViewAllSubmissions(): void {
    this.router.navigate(['/teacher/assignments']);
  }

  onViewAllPerformers(): void {
    this.filters.update((f) => ({ ...f, performanceBand: 'Excellent' }));
  }

  onQuickAction(actionId: string): void {
    switch (actionId) {
      case 'message-parent':
      case 'schedule-intervention':
        this.router.navigate(['/teacher/live-classes']);
        break;
      case 'assign-remediation':
        this.router.navigate(['/teacher/assignments']);
        break;
      case 'view-full-profile':
        this.router.navigate(['/teacher/classes']);
        break;
      default:
        break;
    }
  }

  onMessageClass(): void {
    this.router.navigate(['/teacher/live-classes']);
  }

  onExport(): void {
    // Export data handler
  }

  onViewGroups(): void {
    this.router.navigate(['/teacher/classes']);
  }
}
