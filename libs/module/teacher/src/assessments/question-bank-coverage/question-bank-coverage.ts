import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { QBSummaryItem } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-question-bank-coverage',
  imports: [],
  templateUrl: './question-bank-coverage.html',
  styleUrl: './question-bank-coverage.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBankCoverageComponent {
  readonly summaryItems = input.required<QBSummaryItem[]>();
  readonly viewAll = output<void>();

  readonly totalQuestions = computed(() =>
    this.summaryItems().reduce((acc, curr) => acc + curr.count, 0),
  );
}
