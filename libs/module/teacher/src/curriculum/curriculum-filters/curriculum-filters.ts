import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CurriculumFilterValues {
  term: string;
  classId: string;
  subject: string;
  search: string;
}

@Component({
  selector: 'school-hub-curriculum-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './curriculum-filters.html',
  styleUrl: './curriculum-filters.scss',
})
export class CurriculumFiltersComponent {
  selectedTerm = 'Term 1 2025/2026';
  selectedClass = 'All Classes';
  selectedSubject = 'All Subjects';
  searchQuery = '';

  readonly filterChange = output<CurriculumFilterValues>();

  onFilterUpdated(): void {
    this.filterChange.emit({
      term: this.selectedTerm,
      classId: this.selectedClass,
      subject: this.selectedSubject,
      search: this.searchQuery,
    });
  }
}
