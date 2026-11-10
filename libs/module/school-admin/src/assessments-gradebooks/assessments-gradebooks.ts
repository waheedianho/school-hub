import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { AssessmentsSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { AssessmentsTableComponent } from './assessments-table/assessments-table';
import { AssessmentsSidebarComponent } from './assessments-sidebar/assessments-sidebar';
import { AssessmentsQuickActionsComponent } from './quick-actions/quick-actions';
import { SubmissionReviewComponent } from './submission-review/submission-review';
import { CreateAssessmentModalComponent } from './create-assessment-modal/create-assessment-modal';
import { ModerationModalComponent } from './moderation-modal/moderation-modal';

@Component({
  selector: 'school-hub-assessments-gradebooks',
  standalone: true,
  imports: [
    CommonModule,
    AssessmentsSummaryMetricsComponent,
    AssessmentsTableComponent,
    AssessmentsSidebarComponent,
    AssessmentsQuickActionsComponent,
    SubmissionReviewComponent,
    CreateAssessmentModalComponent,
    ModerationModalComponent,
  ],
  templateUrl: './assessments-gradebooks.html',
  styleUrls: ['./assessments-gradebooks.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsGradebooksComponent {
  readonly store = inject(SchoolAdminStore);
  readonly selectedAssessment = this.store.selectedAssessmentForReview;
  readonly statusMessage = this.store.setupSaveStatus;
}
