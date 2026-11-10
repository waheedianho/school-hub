import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { CurriculumSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { SubjectDirectoryComponent } from './subject-directory/subject-directory';
import { CurriculumMapComponent } from './curriculum-map/curriculum-map';
import { SchemeOfWorkComponent } from './scheme-of-work/scheme-of-work';
import { SchemeDetailComponent } from './scheme-detail/scheme-detail';
import { TopicDeliveryPackComponent } from './topic-delivery-pack/topic-delivery-pack';
import { CurriculumQuickActionsComponent } from './quick-actions/quick-actions';

@Component({
  selector: 'school-hub-subjects-curriculum',
  standalone: true,
  imports: [
    CommonModule,
    CurriculumSummaryMetricsComponent,
    SubjectDirectoryComponent,
    CurriculumMapComponent,
    SchemeOfWorkComponent,
    SchemeDetailComponent,
    TopicDeliveryPackComponent,
    CurriculumQuickActionsComponent,
  ],
  templateUrl: './subjects-curriculum.html',
  styleUrls: ['./subjects-curriculum.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsCurriculumComponent {
  readonly store = inject(SchoolAdminStore);

  readonly tabs: Array<{
    id:
      | 'subjects'
      | 'curriculum-map'
      | 'scheme-of-work'
      | 'topic-delivery-packs'
      | 'approval-queue';
    label: string;
    count: number;
  }> = [
    { id: 'subjects', label: 'Subjects', count: 24 },
    { id: 'curriculum-map', label: 'Curriculum Map', count: 48 },
    { id: 'scheme-of-work', label: 'Scheme of Work', count: 16 },
    { id: 'topic-delivery-packs', label: 'Topic Delivery Packs', count: 12 },
    { id: 'approval-queue', label: 'Approval Queue', count: 5 },
  ];

  setTab(
    tab:
      | 'subjects'
      | 'curriculum-map'
      | 'scheme-of-work'
      | 'topic-delivery-packs'
      | 'approval-queue',
  ): void {
    this.store.setActiveCurriculumTab(tab);
  }

  onAddSubject(): void {
    this.store.setupSaveStatus.set(
      'Add Subject modal opened. Enter subject title, department, and code.',
    );
  }

  onCreateScheme(): void {
    this.store.setupSaveStatus.set(
      'Create Scheme of Work wizard opened. Define weekly topic units and objectives.',
    );
  }

  onBulkImport(): void {
    this.store.setupSaveStatus.set(
      'Bulk Curriculum Import wizard opened. Select national curriculum framework (NERDC/WAEC/Cambridge).',
    );
  }

  dismissNotification(): void {
    this.store.setupSaveStatus.set(null);
  }
}
