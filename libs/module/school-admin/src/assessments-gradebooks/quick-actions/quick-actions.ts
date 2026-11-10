import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-assessments-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsQuickActionsComponent {
  readonly store = inject(SchoolAdminStore);

  onReviewGradebooks(): void {
    this.store.setActiveAssessmentTab('gradebooks');
  }

  onCheckSubmissions(): void {
    this.store.setActiveAssessmentTab('submissions');
  }

  onViewModerationLog(): void {
    this.store.setActiveAssessmentTab('moderation');
  }

  onGenerateReport(): void {
    this.store.exportAssessmentReport();
  }
}
