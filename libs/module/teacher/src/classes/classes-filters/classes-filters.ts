import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ClassesFilterValues {
  term: string;
  subject: string;
  status: string;
  search: string;
}

@Component({
  selector: 'school-hub-classes-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classes-filters.html',
  styleUrl: './classes-filters.scss',
})
export class ClassesFiltersComponent {
  selectedTerm = 'Term 1 2025/2026';
  selectedSubject = 'English Language';
  selectedStatus = 'All Status';
  searchQuery = '';

  readonly filterChange = output<{
    term: string;
    subject: string;
    status: string;
    search: string;
  }>();

  onFilterUpdated(): void {
    this.filterChange.emit({
      term: this.selectedTerm,
      subject: this.selectedSubject,
      status: this.selectedStatus,
      search: this.searchQuery,
    });
  }
}
