import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LearnersFilterValues } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-learners-filters',
  imports: [FormsModule],
  templateUrl: './learners-filters.html',
  styleUrl: './learners-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnersFiltersComponent {
  readonly selectedClass = signal('All Classes');
  readonly selectedSubject = signal('All Subjects');
  readonly selectedBand = signal('All Bands');
  readonly selectedAttendance = signal('All');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<LearnersFilterValues>();
  readonly toggleAdvancedFilters = output<void>();

  readonly classes = [
    'All Classes',
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'JSS 2B',
  ];

  readonly subjects = [
    'All Subjects',
    'English Language',
    'Mathematics',
    'Basic Science',
  ];

  readonly performanceBands = [
    'All Bands',
    'Excellent',
    'Very Good',
    'Good',
    'Average',
    'Below Average',
  ];

  readonly attendanceOptions = ['All', '90%+', '80-89%', '<80%'];

  onFilterChange(): void {
    this.filtersChanged.emit({
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      performanceBand: this.selectedBand(),
      attendance: this.selectedAttendance(),
      searchQuery: this.searchQuery(),
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.onFilterChange();
  }
}
