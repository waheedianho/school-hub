import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LessonReviewRecord } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-lesson-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-reviews.html',
  styleUrls: ['./lesson-reviews.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonReviewsComponent {
  readonly store = inject(SchoolAdminStore);

  onApprove(rev: LessonReviewRecord): void {
    this.store.approveLessonPlan(rev.id);
  }

  onRequestRevision(rev: LessonReviewRecord): void {
    this.store.requestLessonRevision(rev.id);
  }

  onPreviewMaterials(rev: LessonReviewRecord): void {
    this.store.setupSaveStatus.set(
      `Previewing ${rev.materialsCount} lesson materials for ${rev.topic}.`,
    );
  }
}
