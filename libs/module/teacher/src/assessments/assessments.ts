import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ASSESSMENT_BEST_PRACTICES,
  ASSESSMENTS_LIST,
  ASSESSMENTS_QUICK_ACTIONS,
  AssessmentItem,
  AssessmentsFilterValues,
  QB_SUMMARY_ITEMS,
  RECENT_QB_ACTIVITY,
  TEACHER_ASSESSMENTS_METRICS,
} from '../data/teacher-assessments.data';
import { AssessmentBestPracticesComponent } from './assessment-best-practices/assessment-best-practices';
import { AssessmentDesignWorkflowComponent } from './assessment-design-workflow/assessment-design-workflow';
import { AssessmentsFiltersComponent } from './assessments-filters/assessments-filters';
import { AssessmentsListTableComponent } from './assessments-list-table/assessments-list-table';
import { AssessmentsMetricsComponent } from './assessments-metrics/assessments-metrics';
import { AssessmentsQuickActionsComponent } from './assessments-quick-actions/assessments-quick-actions';
import { QuestionBankCoverageComponent } from './question-bank-coverage/question-bank-coverage';
import { QuestionBankSummaryComponent } from './question-bank-summary/question-bank-summary';
import { RecentQBActivityComponent } from './recent-qb-activity/recent-qb-activity';

@Component({
  selector: 'school-hub-teacher-assessments',
  imports: [
    AssessmentsMetricsComponent,
    AssessmentsFiltersComponent,
    AssessmentsListTableComponent,
    QuestionBankCoverageComponent,
    RecentQBActivityComponent,
    AssessmentBestPracticesComponent,
    QuestionBankSummaryComponent,
    AssessmentsQuickActionsComponent,
    AssessmentDesignWorkflowComponent,
  ],
  templateUrl: './assessments.html',
  styleUrl: './assessments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherAssessmentsComponent {
  private readonly router = inject(Router);

  readonly metrics = signal(TEACHER_ASSESSMENTS_METRICS);
  readonly allAssessments = signal(ASSESSMENTS_LIST);
  readonly qbSummary = signal(QB_SUMMARY_ITEMS);
  readonly recentActivity = signal(RECENT_QB_ACTIVITY);
  readonly bestPractices = signal(ASSESSMENT_BEST_PRACTICES);
  readonly quickActions = signal(ASSESSMENTS_QUICK_ACTIONS);

  readonly filters = signal<AssessmentsFilterValues>({
    term: 'Term 1 2025/2026',
    className: 'All Classes',
    subject: 'English Language',
    assessmentType: 'All Types',
    status: 'All Status',
    searchQuery: '',
  });

  readonly filteredAssessments = computed(() => {
    const list = this.allAssessments();
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
        currentFilters.assessmentType !== 'All Types' &&
        item.type !== currentFilters.assessmentType
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
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesTopic = item.topic.toLowerCase().includes(query);
        const matchesClass = item.className.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTopic && !matchesClass) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: AssessmentsFilterValues): void {
    this.filters.set(newFilters);
  }

  navigateToQuestionBank(): void {
    this.router.navigate(['/teacher/assessments/question-bank']);
  }

  onQuickAction(actionId: string): void {
    if (actionId === 'open-qb') {
      this.navigateToQuestionBank();
    }
  }

  onOpenAssessment(item: AssessmentItem): void {
    // Navigate or view assessment
    if (item.status === 'Pending Review') {
      this.router.navigate(['/teacher/assignments/review']);
    }
  }

  onReviewAssessment(_item: AssessmentItem): void {
    this.router.navigate(['/teacher/assignments/review']);
  }
}
