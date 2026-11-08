import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceFilterValues } from '../../data/teacher-resources.data';

@Component({
  selector: 'school-hub-resources-filters',
  imports: [FormsModule],
  templateUrl: './resources-filters.html',
  styleUrl: './resources-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesFiltersComponent {
  readonly selectedClass = signal('All Classes');
  readonly selectedSubject = signal('All Subjects');
  readonly selectedType = signal('All Types');
  readonly selectedTopic = signal('All Topics');
  readonly searchQuery = signal('');

  readonly filtersChanged = output<ResourceFilterValues>();
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
    'Mathematics',
    'English Language',
    'Basic Science',
    'Civic Education',
  ];
  readonly types = [
    'All Types',
    'PDF Note',
    'Worksheet',
    'Slides',
    'Video',
    'Answer Guide',
  ];
  readonly topics = [
    'All Topics',
    'Whole Numbers',
    'Fractions',
    'Parts of Speech',
    'Comprehension',
    'Rights & Duties',
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      className: this.selectedClass(),
      subject: this.selectedSubject(),
      resourceType: this.selectedType(),
      topic: this.selectedTopic(),
      searchQuery: this.searchQuery(),
    });
  }

  onSearchInput(query: string): void {
    this.searchQuery.set(query);
    this.onFilterChange();
  }
}
