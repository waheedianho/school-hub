import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { QBSummaryItem } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-question-bank-summary',
  imports: [],
  templateUrl: './question-bank-summary.html',
  styleUrl: './question-bank-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBankSummaryComponent {
  readonly summaryItems = input.required<QBSummaryItem[]>();
  readonly openQuestionBank = output<void>();

  readonly totalQuestions = computed(() =>
    this.summaryItems().reduce((acc, curr) => acc + curr.count, 0),
  );
}
