import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssessmentBestPracticeItem } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-assessment-best-practices',
  imports: [],
  templateUrl: './assessment-best-practices.html',
  styleUrl: './assessment-best-practices.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentBestPracticesComponent {
  readonly practices = input.required<AssessmentBestPracticeItem[]>();
}
