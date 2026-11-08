import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradebookFilterValues } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-gradebook-filters',
  imports: [FormsModule],
  templateUrl: './gradebook-filters.html',
  styleUrl: './gradebook-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookFiltersComponent {
  readonly selectedTerm = signal('Term 1 2025/2026');
  readonly selectedClass = signal('JSS 1A');
  readonly selectedSubject = signal('English Language');
  readonly selectedGroup = signal('All Assessments');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<GradebookFilterValues>();

  readonly terms = ['Term 1 2025/2026', 'Term 2 2025/2026', 'Term 3 2025/2026'];

  readonly classes = [
    'JSS 1A',
    'All Classes',
    'JSS 1B',
    'JSS 2A',
    'JSS 2B',
    'JSS 3A',
  ];

  readonly subjects = [
    'English Language',
    'All Subjects',
    'Mathematics',
    'Basic Science',
  ];

  readonly assessmentGroups = [
    'All Assessments',
    'Quizzes',
    'Worksheets',
    'Essays / Theory',
    'Portfolio Tasks',
    'Continuous Assessment (CA)',
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      term: this.selectedTerm(),
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      assessmentGroup: this.selectedGroup(),
      searchQuery: this.searchQuery(),
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.onFilterChange();
  }
}
