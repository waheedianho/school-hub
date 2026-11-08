import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssessmentWeightItem } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-assessment-weights',
  imports: [],
  templateUrl: './assessment-weights.html',
  styleUrl: './assessment-weights.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentWeightsComponent {
  readonly weights = input.required<AssessmentWeightItem[]>();
}
