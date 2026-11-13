import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AssessmentPack,
  AssessmentStatus,
  AssessmentType,
} from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment-table.html',
  styleUrls: ['./assessment-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentTableComponent {
  readonly packs = input.required<AssessmentPack[]>();
  readonly searchQuery = input<string>('');
  readonly selectedSubject = input<string>('All');
  readonly selectedClass = input<string>('All');
  readonly selectedTerm = input<string>('All');
  readonly selectedType = input<string>('All');
  readonly selectedStatus = input<string>('All');
  readonly totalResultsCount = input<number>(248);

  readonly searchChange = output<string>();
  readonly subjectChange = output<string>();
  readonly classChange = output<string>();
  readonly termChange = output<string>();
  readonly typeChange = output<string>();
  readonly statusChange = output<string>();
  readonly resetFilters = output<void>();

  readonly viewPack = output<AssessmentPack>();
  readonly editPack = output<AssessmentPack>();
  readonly statusUpdate = output<{ id: string; status: AssessmentStatus }>();
  readonly deletePack = output<string>();

  readonly openActionMenuId = signal<string | null>(null);
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(10);

  readonly subjects = [
    'All',
    'Mathematics',
    'English Language',
    'Basic Science',
    'Physics',
    'Chemistry',
    'Biology',
    'Social Studies',
  ];

  readonly classLevels = [
    'All',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SS 1',
    'SS 2',
    'SS 3',
  ];

  readonly terms = ['All', 'First Term', 'Second Term', 'Third Term'];

  readonly assessmentTypes: (string | AssessmentType)[] = [
    'All',
    'Quiz',
    'Topic Test',
    'Assessment',
    'Term Assessment',
    'Practical Test',
    'Mock Exam',
  ];

  readonly statuses: (string | AssessmentStatus)[] = [
    'All',
    'Approved',
    'Pending Review',
    'Needs Update',
    'Draft',
  ];

  readonly totalPages = computed(() => {
    const total = this.packs().length;
    return Math.ceil(total / this.pageSize()) || 1;
  });

  readonly paginatedPacks = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.packs().slice(start, start + this.pageSize());
  });

  readonly showingStart = computed(() => {
    if (this.packs().length === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  readonly showingEnd = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.packs().length);
  });

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
    this.currentPage.set(1);
  }

  onSubjectChange(val: string): void {
    this.subjectChange.emit(val);
    this.currentPage.set(1);
  }

  onClassChange(val: string): void {
    this.classChange.emit(val);
    this.currentPage.set(1);
  }

  onTermChange(val: string): void {
    this.termChange.emit(val);
    this.currentPage.set(1);
  }

  onTypeChange(val: string): void {
    this.typeChange.emit(val);
    this.currentPage.set(1);
  }

  onStatusChange(val: string): void {
    this.statusChange.emit(val);
    this.currentPage.set(1);
  }

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.openActionMenuId.update((curr) => (curr === id ? null : id));
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onView(pack: AssessmentPack): void {
    this.closeActionMenu();
    this.viewPack.emit(pack);
  }

  onEdit(pack: AssessmentPack): void {
    this.closeActionMenu();
    this.editPack.emit(pack);
  }

  onUpdateStatus(id: string, status: AssessmentStatus): void {
    this.closeActionMenu();
    this.statusUpdate.emit({ id, status });
  }

  onDelete(id: string): void {
    this.closeActionMenu();
    this.deletePack.emit(id);
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }
}
