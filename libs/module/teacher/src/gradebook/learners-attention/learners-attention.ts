import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LearnerAttentionItem } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-gradebook-learners-attention',
  imports: [],
  templateUrl: './learners-attention.html',
  styleUrl: './learners-attention.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookLearnersAttentionComponent {
  readonly learners = input.required<LearnerAttentionItem[]>();
  readonly viewAll = output<void>();
}
