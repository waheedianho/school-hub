import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { GradebookSummarySegment } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-gradebook-summary',
  imports: [],
  templateUrl: './gradebook-summary.html',
  styleUrl: './gradebook-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookSummaryComponent {
  readonly segments = input.required<GradebookSummarySegment[]>();
  readonly classAverage = input<string>('72%');

  readonly totalLearners = computed(() =>
    this.segments().reduce((acc, seg) => acc + seg.count, 0),
  );
}
