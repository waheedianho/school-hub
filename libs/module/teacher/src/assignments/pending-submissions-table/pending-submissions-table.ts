import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { PendingSubmissionItem } from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-pending-submissions-table',
  templateUrl: './pending-submissions-table.html',
  styleUrl: './pending-submissions-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingSubmissionsTableComponent {
  private readonly router = inject(Router);

  readonly submissions = input.required<PendingSubmissionItem[]>();
  readonly reviewSubmission = output<PendingSubmissionItem>();

  onAction(submission: PendingSubmissionItem): void {
    this.reviewSubmission.emit(submission);
    void this.router.navigate(['/teacher/assignments/review']);
  }
}
