import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ProgressBarComponent,
  StatusBadgeComponent,
  SubjectIconComponent,
} from '@school-hub/ui-elements';
import { ProgressSubject } from '../progress.model';

@Component({
  selector: 'school-hub-progress-subject-table',
  imports: [
    RouterLink,
    ProgressBarComponent,
    StatusBadgeComponent,
    SubjectIconComponent,
  ],
  templateUrl: './subject-table.html',
  styleUrl: './subject-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSubjectTableComponent {
  readonly rows = input.required<readonly ProgressSubject[]>();
  readonly term = input('all');
  readonly returnUrl = input<string>();
}
