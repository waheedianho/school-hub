import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportsFilterValues } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-reports-filters',
  imports: [FormsModule],
  templateUrl: './reports-filters.html',
  styleUrl: './reports-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsFiltersComponent {
  readonly selectedClass = signal('JSS 1A');
  readonly selectedSubject = signal('All Subjects');
  readonly selectedTerm = signal('Third Term');
  readonly selectedDateRange = signal('Apr 14 – May 12, 2025');

  readonly filtersChanged = output<ReportsFilterValues>();
  readonly generateReport = output<void>();

  readonly classes = ['JSS 1A', 'JSS 1B', 'JSS 1C', 'All Classes'];
  readonly subjects = [
    'All Subjects',
    'English Language',
    'Mathematics',
    'Basic Science',
    'Civic Education',
    'Igbo Language',
  ];
  readonly terms = ['Third Term', 'Second Term', 'First Term'];
  readonly dateRanges = [
    'Apr 14 – May 12, 2025',
    'Mar 1 – Mar 31, 2025',
    'Jan 15 – Feb 28, 2025',
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      term: this.selectedTerm(),
      dateRange: this.selectedDateRange(),
    });
  }
}
