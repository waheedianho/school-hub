import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

export interface LearningStep {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'school-hub-learning-steps',
  templateUrl: './learning-steps.html',
  styleUrl: './learning-steps.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningStepsComponent {
  readonly steps = input.required<readonly LearningStep[]>();
  readonly selected = output<string>();
}
