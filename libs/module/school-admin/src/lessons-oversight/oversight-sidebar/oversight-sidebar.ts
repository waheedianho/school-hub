import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-oversight-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oversight-sidebar.html',
  styleUrls: ['./oversight-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OversightSidebarComponent {
  readonly store = inject(SchoolAdminStore);

  onReviewLessons(): void {
    this.store.setActiveLessonsTab('lesson-reviews');
  }

  onCheckDeliveryPacks(): void {
    this.store.setActiveLessonsTab('delivery-oversight');
  }

  onAssignFollowUp(): void {
    this.store.setupSaveStatus.set(
      'Assign follow-up task modal opened for delayed lesson topics.',
    );
  }

  onExportReport(): void {
    this.store.setupSaveStatus.set(
      'Exporting comprehensive school lesson delivery audit report as PDF.',
    );
  }

  onAttentionClick(itemText: string): void {
    this.store.setupSaveStatus.set(
      `Filtered oversight views for: ${itemText}.`,
    );
  }
}
