import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ASSESSMENT_WEIGHTS,
  GRADEBOOK_QUICK_ACTIONS,
  GRADEBOOK_RECORDS,
  GRADEBOOK_SUMMARY_SEGMENTS,
  GradebookFilterValues,
  LEARNERS_NEEDING_ATTENTION,
  LearnerGradeRecord,
  RECENT_SCORE_ACTIVITIES,
  TEACHER_GRADEBOOK_METRICS,
} from '../data/teacher-gradebook.data';
import { AssessmentWeightsComponent } from './assessment-weights/assessment-weights';
import { GradebookFiltersComponent } from './gradebook-filters/gradebook-filters';
import { GradebookHowItWorksComponent } from './gradebook-how-it-works/gradebook-how-it-works';
import { GradebookMetricsComponent } from './gradebook-metrics/gradebook-metrics';
import { GradebookQuickActionsComponent } from './gradebook-quick-actions/gradebook-quick-actions';
import { GradebookRecordsTableComponent } from './gradebook-records-table/gradebook-records-table';
import { GradebookSummaryComponent } from './gradebook-summary/gradebook-summary';
import { GradebookLearnersAttentionComponent } from './learners-attention/learners-attention';
import { RecentScoreActivityComponent } from './recent-score-activity/recent-score-activity';

@Component({
  selector: 'school-hub-teacher-gradebook',
  imports: [
    GradebookMetricsComponent,
    GradebookFiltersComponent,
    GradebookRecordsTableComponent,
    RecentScoreActivityComponent,
    AssessmentWeightsComponent,
    GradebookLearnersAttentionComponent,
    GradebookSummaryComponent,
    GradebookQuickActionsComponent,
    GradebookHowItWorksComponent,
  ],
  templateUrl: './gradebook.html',
  styleUrl: './gradebook.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherGradebookComponent {
  private readonly router = inject(Router);

  readonly metrics = signal(TEACHER_GRADEBOOK_METRICS);
  readonly allRecords = signal(GRADEBOOK_RECORDS);
  readonly segments = signal(GRADEBOOK_SUMMARY_SEGMENTS);
  readonly activities = signal(RECENT_SCORE_ACTIVITIES);
  readonly weights = signal(ASSESSMENT_WEIGHTS);
  readonly attentionLearners = signal(LEARNERS_NEEDING_ATTENTION);
  readonly quickActions = signal(GRADEBOOK_QUICK_ACTIONS);

  readonly filters = signal<GradebookFilterValues>({
    term: 'Term 1 2025/2026',
    className: 'JSS 1A',
    subject: 'English Language',
    assessmentGroup: 'All Assessments',
    searchQuery: '',
  });

  readonly filteredRecords = computed(() => {
    const list = this.allRecords();
    const currentFilters = this.filters();
    const query = currentFilters.searchQuery.toLowerCase().trim();

    return list.filter((item) => {
      if (
        currentFilters.className !== 'All Classes' &&
        item.className !== currentFilters.className
      ) {
        return false;
      }

      if (query) {
        const matchesName = item.learnerName.toLowerCase().includes(query);
        const matchesClass = item.className.toLowerCase().includes(query);
        if (!matchesName && !matchesClass) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: GradebookFilterValues): void {
    this.filters.set(newFilters);
  }

  onViewRecord(record: LearnerGradeRecord): void {
    // Navigate to student profile or details
    this.router.navigate(['/teacher/classes'], {
      queryParams: { student: record.id },
    });
  }

  onQuickAction(actionId: string): void {
    if (actionId === 'approve-pending') {
      this.router.navigate(['/teacher/assignments']);
    } else if (actionId === 'open-reports') {
      this.router.navigate(['/teacher/reports']);
    }
  }

  onViewAllActivity(): void {
    this.router.navigate(['/teacher/assignments']);
  }

  onViewAllAttention(): void {
    this.router.navigate(['/teacher/classes']);
  }
}
