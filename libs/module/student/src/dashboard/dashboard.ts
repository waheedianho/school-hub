import { FeedbackReviewStore } from '../feedback/feedback-review-store';
import { LearnerProfileStore } from '../data/learner-profile-store';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  ProgressBarComponent,
  ProgressStatComponent,
  SubjectCardComponent,
  SubjectIconComponent,
  TaskListComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import {
  DASHBOARD_PROGRESS,
  DASHBOARD_TASKS,
  LEARNER_DASHBOARD,
  RECENT_SUBJECTS,
} from './dashboard.data';
import { AssessmentStore } from '../assessments/assessment-store';
import { WorksheetStore } from '../worksheets/worksheet-store';
import { PortfolioStore } from '../portfolio/portfolio-store';
import { PORTFOLIO_STATUS } from '../portfolio/portfolio.data';

@Component({
  selector: 'school-hub-student-dashboard',
  imports: [
    StatusBadgeComponent,
    RouterLink,
    DashboardCardComponent,
    ProgressBarComponent,
    ProgressStatComponent,
    SubjectCardComponent,
    SubjectIconComponent,
    TaskListComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDashboardComponent {
  protected readonly profile = inject(LearnerProfileStore);
  private readonly assessments = inject(AssessmentStore);
  private readonly worksheets = inject(WorksheetStore);
  private readonly portfolios = inject(PortfolioStore);
  protected readonly dashboard = LEARNER_DASHBOARD;
  protected readonly feedbackReviews = inject(FeedbackReviewStore);
  protected readonly tasks = computed(() =>
    DASHBOARD_TASKS.filter(
      (task) =>
        (task.id !== 'whole-numbers-worksheet' ||
          this.worksheets.record(task.id)?.status !== 'completed') &&
        (task.id !== 'market-price-comparison' ||
          !['submitted', 'completed'].includes(
            this.portfolios.record(task.id)?.status ?? '',
          )),
    ),
  );
  protected readonly portfolio = computed(() => {
    const record = this.portfolios.record(this.dashboard.portfolio.id);
    return {
      ...this.dashboard.portfolio,
      status: record
        ? PORTFOLIO_STATUS[record.status].label
        : this.dashboard.portfolio.status,
      action:
        record?.status === 'completed'
          ? 'View Feedback'
          : record?.status === 'submitted'
            ? 'View Submission'
            : record?.status === 'needs-revision'
              ? 'Revise Work'
              : 'Submit Work',
      tab:
        record?.status === 'completed' || record?.status === 'needs-revision'
          ? 'feedback'
          : 'submission',
    };
  });
  protected readonly quiz = computed(() => {
    const result = this.assessments.latestResult(this.dashboard.quiz.id);
    const percentage = result?.percentage ?? 70;
    return {
      ...this.dashboard.quiz,
      score: result?.correctCount ?? this.dashboard.quiz.score,
      mastery:
        percentage >= 85
          ? 'Strong'
          : percentage >= 70
            ? 'Developing'
            : 'Needs Practice',
    };
  });
  protected readonly progressMetrics = computed(() =>
    DASHBOARD_PROGRESS.map((metric) =>
      metric.id === 'quizzes'
        ? {
            ...metric,
            value: `${this.assessments.quizAverage()}%`,
            percentage: this.assessments.quizAverage(),
            detail:
              this.assessments.quizAverage() >= 85
                ? 'Strong'
                : this.assessments.quizAverage() >= 70
                  ? 'Developing'
                  : 'Needs Practice',
          }
        : metric.id === 'worksheets'
          ? {
              ...metric,
              value: `${this.worksheets.completion()}%`,
              percentage: this.worksheets.completion(),
              detail: `${this.worksheets.completedCount()} / ${this.worksheets.records().length} completed`,
            }
          : metric.id === 'portfolio'
            ? {
                ...metric,
                value: `${this.portfolios.completion()}%`,
                percentage: this.portfolios.completion(),
                detail: `${this.portfolios.handedInCount()} / ${this.portfolios.records().length} handed in`,
              }
            : metric,
    ),
  );
  protected readonly subjects = RECENT_SUBJECTS;
}
