import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import {
  AssessmentRecord,
  AssessmentScheduleTab,
} from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-assessments-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessments-table.html',
  styleUrls: ['./assessments-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsTableComponent {
  readonly store = inject(SchoolAdminStore);

  readonly activeTab = this.store.activeAssessmentTab;
  readonly assessments = this.store.paginatedAssessments;
  readonly totalAssessments = this.store.totalFilteredAssessments;
  readonly currentPage = this.store.assessmentCurrentPage;
  readonly totalPages = this.store.assessmentTotalPages;
  readonly pageSize = this.store.assessmentPageSize;

  readonly classFilter = this.store.assessmentClassFilter;
  readonly subjectFilter = this.store.assessmentSubjectFilter;
  readonly teacherFilter = this.store.assessmentTeacherFilter;
  readonly typeFilter = this.store.assessmentTypeFilter;
  readonly searchQuery = this.store.assessmentSearchQuery;

  // Selected row IDs for bulk actions
  readonly selectedRowIds = signal<Set<string>>(new Set());

  readonly classOptions = [
    'All Classes',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SSS 1',
    'SSS 2',
    'SSS 3',
  ];

  readonly subjectOptions = [
    'All Subjects',
    'English Language',
    'Mathematics',
    'Basic Science',
    'Social Studies',
    'Civic Education',
    'Agricultural Science',
    'Chemistry',
    'Physics',
    'Biology',
  ];

  readonly teacherOptions = [
    'All Teachers',
    'Mrs. Funmi Yusuf',
    'Mr. Tunde Adewale',
    'Dr. Kelechi Nwosu',
    'Mrs. Amina Bello',
    'Mr. Segun Adeleke',
    'Mrs. Folashade Adeleke',
  ];

  readonly typeOptions = [
    'All Types',
    'Test',
    'Quiz',
    'Assignment',
    'Exam',
    'Project',
  ];

  onTabChange(tab: AssessmentScheduleTab): void {
    this.store.setActiveAssessmentTab(tab);
  }

  onClassFilterChange(value: string): void {
    this.store.setAssessmentClassFilter(value);
  }

  onSubjectFilterChange(value: string): void {
    this.store.setAssessmentSubjectFilter(value);
  }

  onTeacherFilterChange(value: string): void {
    this.store.setAssessmentTeacherFilter(value);
  }

  onTypeFilterChange(value: string): void {
    this.store.setAssessmentTypeFilter(value);
  }

  onSearchChange(query: string): void {
    this.store.setAssessmentSearchQuery(query);
  }

  onPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.store.setAssessmentCurrentPage(this.currentPage() - 1);
    }
  }

  onNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.store.setAssessmentCurrentPage(this.currentPage() + 1);
    }
  }

  onPageSelect(page: number): void {
    this.store.setAssessmentCurrentPage(page);
  }

  onRowSelect(assessment: AssessmentRecord): void {
    this.store.openAssessmentReview(assessment);
  }

  toggleRowSelection(id: string): void {
    this.selectedRowIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  toggleSelectAll(): void {
    const current = this.assessments();
    const set = this.selectedRowIds();
    const allSelected = current.every((a) => set.has(a.id));

    this.selectedRowIds.update((s) => {
      const next = new Set(s);
      if (allSelected) {
        current.forEach((a) => next.delete(a.id));
      } else {
        current.forEach((a) => next.add(a.id));
      }
      return next;
    });
  }

  isRowSelected(id: string): boolean {
    return this.selectedRowIds().has(id);
  }

  areAllSelected(): boolean {
    const list = this.assessments();
    return (
      list.length > 0 && list.every((a) => this.selectedRowIds().has(a.id))
    );
  }
}
