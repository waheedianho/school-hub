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
} from '@school-hub/ui-elements';
import {
  DASHBOARD_PROGRESS,
  DASHBOARD_TASKS,
  LEARNER_DASHBOARD,
  RECENT_SUBJECTS,
} from './dashboard.data';
import { AssessmentStore } from '../assessments/assessment-store';

@Component({
  selector: 'school-hub-student-dashboard',
  imports: [
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
  private readonly assessments = inject(AssessmentStore);
  protected readonly dashboard = LEARNER_DASHBOARD;
  protected readonly tasks = DASHBOARD_TASKS;
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
        : metric,
    ),
  );
  protected readonly subjects = RECENT_SUBJECTS;
}
