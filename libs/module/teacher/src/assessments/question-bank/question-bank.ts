import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  QB_SUMMARY_ITEMS,
  QUESTION_BANK_ITEMS,
  QUESTION_BANK_METRICS,
  QuestionBankItem,
  SELECTED_QUESTION_PREVIEW,
  SelectedQuestionDetail,
} from '../../data/teacher-assessments.data';
import { QuestionBankCoverageComponent } from '../question-bank-coverage/question-bank-coverage';
import { QBFiltersComponent, QBFilterValues } from './qb-filters/qb-filters';
import { QBHowItWorksComponent } from './qb-how-it-works/qb-how-it-works';
import { QBMetricsComponent } from './qb-metrics/qb-metrics';
import { QBTableComponent } from './qb-table/qb-table';
import { SelectedQuestionPreviewComponent } from './selected-question-preview/selected-question-preview';

@Component({
  selector: 'school-hub-teacher-question-bank',
  imports: [
    QBMetricsComponent,
    QBFiltersComponent,
    QBTableComponent,
    SelectedQuestionPreviewComponent,
    QuestionBankCoverageComponent,
    QBHowItWorksComponent,
  ],
  templateUrl: './question-bank.html',
  styleUrl: './question-bank.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherQuestionBankComponent {
  private readonly router = inject(Router);

  readonly metrics = signal(QUESTION_BANK_METRICS);
  readonly allQuestions = signal(QUESTION_BANK_ITEMS);
  readonly selectedId = signal<string>('qb-1');
  readonly selectedQuestion = signal<SelectedQuestionDetail>(
    SELECTED_QUESTION_PREVIEW,
  );
  readonly qbSummary = signal(QB_SUMMARY_ITEMS);

  readonly filters = signal<QBFilterValues>({
    term: 'Term 1 2025/2026',
    className: 'All Classes',
    subject: 'English Language',
    topic: 'All Topics',
    questionType: 'All Types',
    difficulty: 'All Difficulties',
    searchQuery: '',
  });

  readonly filteredQuestions = computed(() => {
    const list = this.allQuestions();
    const currentFilters = this.filters();
    const query = currentFilters.searchQuery.toLowerCase().trim();

    return list.filter((item) => {
      if (
        currentFilters.className !== 'All Classes' &&
        item.className !== currentFilters.className
      ) {
        return false;
      }

      if (
        currentFilters.topic !== 'All Topics' &&
        item.topic !== currentFilters.topic
      ) {
        return false;
      }

      if (
        currentFilters.questionType !== 'All Types' &&
        item.questionType !== currentFilters.questionType
      ) {
        return false;
      }

      if (
        currentFilters.difficulty !== 'All Difficulties' &&
        item.difficulty !== currentFilters.difficulty
      ) {
        return false;
      }

      if (query) {
        const matchesPreview = item.titlePreview.toLowerCase().includes(query);
        const matchesTopic = item.topic.toLowerCase().includes(query);
        const matchesTag = item.misconceptionTag.toLowerCase().includes(query);
        if (!matchesPreview && !matchesTopic && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: QBFilterValues): void {
    this.filters.set(newFilters);
  }

  onSelectQuestion(item: QuestionBankItem): void {
    this.selectedId.set(item.id);
    // In our rich fixture, SELECTED_QUESTION_PREVIEW corresponds to qb-1, but we dynamically update title/metadata
    this.selectedQuestion.set({
      ...SELECTED_QUESTION_PREVIEW,
      id: item.id,
      className: item.className,
      difficulty: item.difficulty,
      marks: item.marks,
      weekTopic: item.topic,
      misconceptionTag: item.misconceptionTag,
      scoringType: item.scoring === 'Auto' ? 'Auto-marked' : 'Teacher Review',
    });
  }

  goBack(): void {
    this.router.navigate(['/teacher/assessments']);
  }
}
