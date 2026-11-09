import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
export interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  max: number;
}
@Component({
  selector: 'school-hub-rubric-table',
  templateUrl: './rubric-table.html',
  styleUrl: './rubric-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubricTableComponent {
  readonly criteria = input.required<readonly RubricCriterion[]>();
  readonly scores = input<readonly number[]>();
  readonly label = input('Task rubric');
  protected readonly total = computed(() =>
    this.criteria().reduce((sum, criterion) => sum + criterion.max, 0),
  );
  protected readonly obtained = computed(() =>
    this.scores()?.reduce((sum, score) => sum + score, 0),
  );
}
