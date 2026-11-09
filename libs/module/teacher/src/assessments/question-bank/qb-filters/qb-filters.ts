import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface QBFilterValues {
  term: string;
  className: string;
  subject: string;
  topic: string;
  questionType: string;
  difficulty: string;
  searchQuery: string;
}

@Component({
  selector: 'school-hub-qb-filters',
  imports: [FormsModule],
  templateUrl: './qb-filters.html',
  styleUrl: './qb-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QBFiltersComponent {
  readonly selectedTerm = signal('Term 1 2025/2026');
  readonly selectedClass = signal('All Classes');
  readonly selectedSubject = signal('English Language');
  readonly selectedTopic = signal('All Topics');
  readonly selectedType = signal('All Types');
  readonly selectedDifficulty = signal('All Difficulties');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<QBFilterValues>();

  readonly terms = ['Term 1 2025/2026', 'Term 2 2025/2026', 'Term 3 2025/2026'];

  readonly classes = [
    'All Classes',
    'JSS 1A',
    'JSS 1B',
    'JSS 2A',
    'JSS 2B',
    'JSS 3A',
  ];

  readonly subjects = [
    'All Subjects',
    'English Language',
    'Mathematics',
    'Basic Science',
  ];

  readonly topics = [
    'All Topics',
    'Parts of Speech',
    'Sentence Structure',
    'Comprehension Skills',
    'Descriptive Writing',
    'Grammar - Tenses',
    'Word Problems',
    'Portfolio Tasks',
  ];

  readonly questionTypes = [
    'All Types',
    'Multiple Choice',
    'Short Answer',
    'Essay / Theory',
    'Word Problem / Application',
    'Portfolio-linked Prompt',
  ];

  readonly difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

  onFilterChange(): void {
    this.filtersChanged.emit({
      term: this.selectedTerm(),
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      topic: this.selectedTopic(),
      questionType: this.selectedType(),
      difficulty: this.selectedDifficulty(),
      searchQuery: this.searchQuery(),
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.onFilterChange();
  }
}
