import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface LessonsFilterValues {
  term: string;
  classId: string;
  subject: string;
  status: string;
  search: string;
}

@Component({
  selector: 'school-hub-lessons-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lessons-filters.html',
  styleUrl: './lessons-filters.scss',
})
export class LessonsFiltersComponent {
  selectedTerm = 'Term 1 2025/2026';
  selectedClass = 'All Classes';
  selectedSubject = 'All Subjects';
  selectedStatus = 'All Status';
  searchQuery = '';

  readonly filterChange = output<LessonsFilterValues>();

  onFilterUpdated(): void {
    this.filterChange.emit({
      term: this.selectedTerm,
      classId: this.selectedClass,
      subject: this.selectedSubject,
      status: this.selectedStatus,
      search: this.searchQuery,
    });
  }
}
