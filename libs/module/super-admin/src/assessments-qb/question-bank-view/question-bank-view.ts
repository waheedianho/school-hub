import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  QuestionBankItem,
  QuestionDifficulty,
  QuestionType,
} from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-question-bank-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-bank-view.html',
  styleUrls: ['./question-bank-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBankViewComponent {
  readonly questions = input.required<QuestionBankItem[]>();
  readonly searchQuery = input<string>('');

  readonly searchChange = output<string>();
  readonly addQuestion = output<void>();
  readonly flagQuestion = output<string>();
  readonly approveQuestion = output<string>();

  readonly selectedType = signal<string>('All');
  readonly selectedDifficulty = signal<string>('All');
  readonly selectedSubject = signal<string>('All');

  readonly subjects = [
    'All',
    'Mathematics',
    'English Language',
    'Basic Science',
    'Physics',
    'Chemistry',
    'Biology',
  ];

  readonly questionTypes: (string | QuestionType)[] = [
    'All',
    'Multiple Choice (MCQ)',
    'Short Answer',
    'Essay / Theory',
    'Word Problems',
  ];

  readonly difficulties: (string | QuestionDifficulty)[] = [
    'All',
    'Easy',
    'Medium',
    'Hard',
  ];

  readonly filteredQuestions = computed(() => {
    const list = this.questions();
    const query = this.searchQuery().toLowerCase().trim();
    const type = this.selectedType();
    const diff = this.selectedDifficulty();
    const subj = this.selectedSubject();

    return list.filter((q) => {
      if (type !== 'All' && q.type !== type) return false;
      if (diff !== 'All' && q.difficulty !== diff) return false;
      if (subj !== 'All' && q.subject !== subj) return false;
      if (query) {
        const textMatch = q.questionText.toLowerCase().includes(query);
        const codeMatch = q.code.toLowerCase().includes(query);
        const topicMatch = q.topic.toLowerCase().includes(query);
        const tagMatch =
          q.misconceptionTag?.toLowerCase().includes(query) ?? false;
        if (!textMatch && !codeMatch && !topicMatch && !tagMatch) return false;
      }
      return true;
    });
  });

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchChange.emit(val);
  }

  onFlag(id: string): void {
    this.flagQuestion.emit(id);
  }

  onApprove(id: string): void {
    this.approveQuestion.emit(id);
  }

  onAddQuestion(): void {
    this.addQuestion.emit();
  }
}
