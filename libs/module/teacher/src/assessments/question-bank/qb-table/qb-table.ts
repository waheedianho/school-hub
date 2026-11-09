import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { QuestionBankItem } from '../../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-qb-table',
  imports: [],
  templateUrl: './qb-table.html',
  styleUrl: './qb-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QBTableComponent {
  readonly questions = input.required<QuestionBankItem[]>();
  readonly selectedId = input<string>('qb-1');

  readonly selectQuestion = output<QuestionBankItem>();
  readonly editQuestion = output<QuestionBankItem>();
  readonly duplicateQuestion = output<QuestionBankItem>();

  onRowClick(item: QuestionBankItem): void {
    this.selectQuestion.emit(item);
  }

  getDifficultyClass(diff: string): string {
    switch (diff) {
      case 'Easy':
        return 'diff-easy';
      case 'Medium':
        return 'diff-medium';
      case 'Hard':
        return 'diff-hard';
      default:
        return 'diff-default';
    }
  }
}
