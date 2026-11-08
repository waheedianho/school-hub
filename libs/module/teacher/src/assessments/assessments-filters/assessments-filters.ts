import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentsFilterValues } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-assessments-filters',
  imports: [FormsModule],
  templateUrl: './assessments-filters.html',
  styleUrl: './assessments-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsFiltersComponent {
  readonly selectedTerm = signal('Term 1 2025/2026');
  readonly selectedClass = signal('All Classes');
  readonly selectedSubject = signal('English Language');
  readonly selectedType = signal('All Types');
  readonly selectedStatus = signal('All Status');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<AssessmentsFilterValues>();

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

  readonly assessmentTypes = ['All Types', 'Quiz', 'Test', 'Essay', 'Mixed'];

  readonly statuses = [
    'All Status',
    'Scheduled',
    'Open',
    'Pending Review',
    'Completed',
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      term: this.selectedTerm(),
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      assessmentType: this.selectedType(),
      status: this.selectedStatus(),
      searchQuery: this.searchQuery(),
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.onFilterChange();
  }
}
