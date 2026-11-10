import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { SchemeOfWorkEntry } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-scheme-of-work',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheme-of-work.html',
  styleUrls: ['./scheme-of-work.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemeOfWorkComponent {
  readonly store = inject(SchoolAdminStore);

  readonly classLevels = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
  readonly subjects = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
  ];
  readonly terms = ['Third Term', 'Second Term', 'First Term'];
  readonly statuses = [
    'All Status',
    'Approved',
    'Needs Review',
    'In Progress',
    'Draft',
  ];

  readonly selectedClass = signal<string>('JSS 1');
  readonly selectedSubject = signal<string>('Mathematics');
  readonly selectedTerm = signal<string>('Third Term');
  readonly activeActionWeekId = signal<string | null>(null);

  onSearch(query: string): void {
    this.store.setSubjectSearchQuery(query);
  }

  onStatusChange(status: string): void {
    this.store.setCurriculumStatusFilter(status);
  }

  onSelectWeek(scheme: SchemeOfWorkEntry): void {
    this.store.viewSchemeWeekDetail(scheme.week);
  }

  onAddScheme(): void {
    this.store.setupSaveStatus.set(
      'Add Scheme of Work wizard opened. Define weekly topic units and objectives.',
    );
  }

  onBulkImport(): void {
    this.store.setupSaveStatus.set(
      'Bulk Scheme Import opened. Download the scheme template.',
    );
  }

  onExport(): void {
    this.store.setupSaveStatus.set('Exporting complete scheme of work as PDF.');
  }

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    if (this.activeActionWeekId() === id) {
      this.activeActionWeekId.set(null);
    } else {
      this.activeActionWeekId.set(id);
    }
  }

  closeActionMenu(): void {
    this.activeActionWeekId.set(null);
  }
}
