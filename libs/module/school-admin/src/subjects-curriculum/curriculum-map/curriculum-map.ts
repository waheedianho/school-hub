import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { CurriculumMapEntry } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-curriculum-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curriculum-map.html',
  styleUrls: ['./curriculum-map.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumMapComponent {
  readonly store = inject(SchoolAdminStore);

  readonly classLevels = [
    'All Classes',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SS 1',
    'SS 2',
    'SS 3',
  ];

  readonly subjectsList = [
    'All Subjects',
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
    'Cultural & Creative Arts',
  ];

  readonly terms = ['Third Term', 'Second Term', 'First Term'];

  readonly statusOptions = [
    'All Status',
    'Active',
    'Needs Review',
    'Draft',
    'Missing Pack',
  ];

  readonly selectedMapId = signal<string>('cmap-1');

  onClassChange(cls: string): void {
    this.store.setCurriculumClassFilter(cls);
  }

  onSubjectChange(subj: string): void {
    this.store.setCurriculumSubjectFilter(subj);
  }

  onTermChange(term: string): void {
    this.store.setCurriculumTermFilter(term);
  }

  onStatusChange(status: string): void {
    this.store.setCurriculumStatusFilter(status);
  }

  onSearch(query: string): void {
    this.store.setSubjectSearchQuery(query);
  }

  selectMapEntry(entry: CurriculumMapEntry): void {
    this.selectedMapId.set(entry.id);
  }

  onCreateMap(): void {
    this.store.setupSaveStatus.set(
      'New Curriculum Map wizard opened. Select target class, subject, and syllabus scope.',
    );
  }

  onAssignTeacher(): void {
    this.store.setupSaveStatus.set(
      'Teacher assignment dialog opened for selected curriculum map.',
    );
  }

  onUploadScheme(): void {
    this.store.setActiveCurriculumTab('scheme-of-work');
    this.store.setupSaveStatus.set('Scheme upload dialog ready.');
  }

  onReviewPacks(): void {
    this.store.setActiveCurriculumTab('topic-delivery-packs');
  }
}
