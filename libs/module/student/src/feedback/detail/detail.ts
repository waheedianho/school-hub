import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import {
  FeedbackNoteComponent,
  IconBadgeComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { FeedbackRecord } from '../feedback.model';
import { FEEDBACK_KINDS, feedbackDate } from '../feedback-presentation';

@Component({
  selector: 'school-hub-feedback-detail',
  imports: [
    RouterLink,
    FeedbackNoteComponent,
    IconBadgeComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDetailComponent {
  readonly entry = input.required<FeedbackRecord>();
  readonly workQuery = input<Params>({});
  readonly tutorQuery = input<Params>({});
  readonly reviewedChanged = output<boolean>();
  protected readonly kinds = FEEDBACK_KINDS;
  protected readonly date = feedbackDate;
}
