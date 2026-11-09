import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LearnerNeedingAttentionItem } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-learners-directory-attention',
  imports: [],
  templateUrl: './learners-needing-attention.html',
  styleUrl: './learners-needing-attention.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnersDirectoryAttentionComponent {
  readonly learners = input.required<LearnerNeedingAttentionItem[]>();
  readonly viewAll = output<void>();
}
