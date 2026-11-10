import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LiveClassRecord } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-live-classes-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes-table.html',
  styleUrls: ['./classes-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesTableComponent {
  readonly store = inject(SchoolAdminStore);

  readonly openActionMenuId = signal<string | null>(null);

  readonly classLevelOptions = [
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
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
    'Civic Education',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'French',
  ];

  readonly teacherOptions = [
    'All Teachers',
    'Mr. Tunde Adewale',
    'Mrs. Funmi Yusuf',
    'Mrs. Nkechi Okoro',
    'Mr. Joseph Anayo',
    'Mrs. Funke Yusuf',
    'Mrs. Aisha Bello',
    'Mr. Chinedu Obi',
    'Mrs. Grace Eze',
    'Dr. Kelechi Nwosu',
    'Mrs. Sandra Okafor',
  ];

  readonly statusOptions = [
    'All Status',
    'Upcoming',
    'Live Now',
    'Completed',
    'Missed',
  ];

  onClassFilterChange(value: string): void {
    this.store.setLiveClassLevelFilter(value);
  }

  onSubjectFilterChange(value: string): void {
    this.store.setLiveClassSubjectFilter(value);
  }

  onTeacherFilterChange(value: string): void {
    this.store.setLiveClassTeacherFilter(value);
  }

  onStatusFilterChange(value: string): void {
    this.store.setLiveClassStatusFilter(value);
  }

  onSearchChange(value: string): void {
    this.store.setLiveClassSearchQuery(value);
  }

  toggleActionMenu(event: Event, classId: string): void {
    event.stopPropagation();
    if (this.openActionMenuId() === classId) {
      this.openActionMenuId.set(null);
    } else {
      this.openActionMenuId.set(classId);
    }
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onObserveClass(cls: LiveClassRecord): void {
    this.closeActionMenu();
    this.store.openLiveClassObserver(cls);
  }

  onViewDetails(cls: LiveClassRecord): void {
    this.closeActionMenu();
    this.store.selectLiveClass(cls);
  }

  onSelectPage(page: number): void {
    if (page >= 1 && page <= this.store.liveClassTotalPages()) {
      this.store.setLiveClassCurrentPage(page);
    }
  }

  getPageNumbers(): number[] {
    const total = this.store.liveClassTotalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getShowingStart(): number {
    const total = this.store.totalFilteredLiveClasses();
    if (total === 0) return 0;
    return (
      (this.store.liveClassCurrentPage() - 1) * this.store.liveClassPageSize() +
      1
    );
  }

  getShowingEnd(): number {
    const total = this.store.totalFilteredLiveClasses();
    const end =
      this.store.liveClassCurrentPage() * this.store.liveClassPageSize();
    return Math.min(end, total);
  }
}
