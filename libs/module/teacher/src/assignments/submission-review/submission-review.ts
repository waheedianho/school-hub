import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MARYAM_SUBMISSION_DETAIL,
  SubmissionReviewDetail,
} from '../../data/teacher-assignments.data';
import { RubricMarkingGuideComponent } from './rubric-marking-guide/rubric-marking-guide';
import { ScoringFeedbackPanelComponent } from './scoring-feedback-panel/scoring-feedback-panel';
import { SubmissionWorksheetViewerComponent } from './submission-worksheet-viewer/submission-worksheet-viewer';

@Component({
  selector: 'school-hub-submission-review',
  imports: [
    SubmissionWorksheetViewerComponent,
    RubricMarkingGuideComponent,
    ScoringFeedbackPanelComponent,
  ],
  templateUrl: './submission-review.html',
  styleUrl: './submission-review.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionReviewComponent {
  private readonly router = inject(Router);

  readonly detail = signal<SubmissionReviewDetail>(MARYAM_SUBMISSION_DETAIL);

  onBack(): void {
    void this.router.navigate(['/teacher/assignments']);
  }

  onScoreSubmitted(): void {
    void this.router.navigate(['/teacher/assignments']);
  }
}
