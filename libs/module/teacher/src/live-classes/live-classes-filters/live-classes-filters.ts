import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LiveClassesFilterValues } from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-live-classes-filters',
  imports: [FormsModule],
  templateUrl: './live-classes-filters.html',
  styleUrl: './live-classes-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesFiltersComponent {
  readonly selectedTerm = signal('Term 1 2025/2026');
  readonly selectedClass = signal('All Classes');
  readonly selectedSubject = signal('All Subjects');
  readonly selectedStatus = signal('All Status');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<LiveClassesFilterValues>();

  readonly terms = ['Term 1 2025/2026', 'Term 2 2025/2026', 'Term 3 2025/2026'];

  readonly classes = [
    'All Classes',
    'JSS 1A',
    'JSS 1B',
    'JSS 2A',
    'JSS 2B',
    'SS 1A',
  ];

  readonly subjects = [
    'All Subjects',
    'English Language',
    'Mathematics',
    'Basic Science',
    'Literature in English',
  ];

  readonly statuses = [
    'All Status',
    'Live Now',
    'Upcoming',
    'Completed',
    'Needs Follow-up',
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      term: this.selectedTerm(),
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      status: this.selectedStatus(),
      searchQuery: this.searchQuery(),
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.onFilterChange();
  }
}
