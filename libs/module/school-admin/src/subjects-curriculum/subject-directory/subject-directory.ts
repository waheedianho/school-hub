import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { SubjectRecord } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-subject-directory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-directory.html',
  styleUrls: ['./subject-directory.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectDirectoryComponent {
  readonly store = inject(SchoolAdminStore);

  readonly statusOptions = ['All Status', 'Active', 'Needs Review', 'Draft'];
  readonly activeActionSubjectId = signal<string | null>(null);

  onSearch(query: string): void {
    this.store.setSubjectSearchQuery(query);
  }

  onStatusChange(status: string): void {
    this.store.setSubjectStatusFilter(status);
  }

  onSelectSubject(subj: SubjectRecord): void {
    this.store.selectSubject(subj.id);
  }

  toggleActionMenu(subjectId: string, event: Event): void {
    event.stopPropagation();
    if (this.activeActionSubjectId() === subjectId) {
      this.activeActionSubjectId.set(null);
    } else {
      this.activeActionSubjectId.set(subjectId);
    }
  }

  closeActionMenu(): void {
    this.activeActionSubjectId.set(null);
  }

  onAddSubject(): void {
    this.store.setupSaveStatus.set(
      'New Subject Creation wizard opened. Enter subject title, code, and class allocations.',
    );
  }

  onBulkImport(): void {
    this.store.setupSaveStatus.set(
      'Bulk Subject Import opened. Download the curriculum CSV template to proceed.',
    );
  }

  onQuickAction(action: string): void {
    if (action === 'create-subject') {
      this.onAddSubject();
    } else if (action === 'map-curriculum') {
      this.store.setActiveCurriculumTab('curriculum-map');
    } else if (action === 'upload-scheme') {
      this.store.setActiveCurriculumTab('scheme-of-work');
      this.store.setupSaveStatus.set('Scheme upload dialog ready.');
    } else if (action === 'review-packs') {
      this.store.setActiveCurriculumTab('topic-delivery-packs');
    }
  }

  onAlertClick(type: string): void {
    if (type === 'approval') {
      this.store.setActiveCurriculumTab('approval-queue');
    } else if (type === 'packs') {
      this.store.setActiveCurriculumTab('topic-delivery-packs');
    } else if (type === 'behind') {
      this.store.setActiveCurriculumTab('scheme-of-work');
      this.store.setupSaveStatus.set('Showing classes behind schedule.');
    }
  }
}
