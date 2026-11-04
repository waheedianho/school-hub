import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SubjectIcon = 'mathematics' | 'english' | 'science';

@Component({
  selector: 'school-hub-subject-icon',
  templateUrl: './subject-icon.html',
  styleUrl: './subject-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class SubjectIconComponent {
  readonly subject = input.required<SubjectIcon>();
}
