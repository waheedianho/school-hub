import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignmentsFilterValues } from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-assignments-filters',
  imports: [FormsModule],
  templateUrl: './assignments-filters.html',
  styleUrl: './assignments-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsFiltersComponent {
  readonly selectedTerm = signal('Term 1 2025/2026');
  readonly selectedClass = signal('All Classes');
  readonly selectedSubject = signal('English Language');
  readonly selectedSubmissionType = signal('All Types');
  readonly selectedStatus = signal('All Status');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<AssignmentsFilterValues>();

  readonly terms = ['Term 1 2025/2026', 'Term 2 2025/2026', 'Term 3 2025/2026'];

  readonly classes = [
    'All Classes',
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'SS 1A',
  ];

  readonly subjects = [
    'All Subjects',
    'English Language',
    'Mathematics',
    'Basic Science',
    'Literature in English',
  ];

  readonly submissionTypes = [
    'All Types',
    'Worksheet',
    'Portfolio Task',
    'Essay / Theory',
    'Homework',
    'Quiz Response Upload',
    'Objective Quiz',
  ];

  readonly statuses = [
    'All Status',
    'Pending Review',
    'Needs Scoring',
    'Approved',
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      term: this.selectedTerm(),
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      submissionType: this.selectedSubmissionType(),
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
