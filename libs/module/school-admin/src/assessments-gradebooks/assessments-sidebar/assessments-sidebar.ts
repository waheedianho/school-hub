import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { AssessmentAttentionItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-assessments-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessments-sidebar.html',
  styleUrls: ['./assessments-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsSidebarComponent {
  readonly store = inject(SchoolAdminStore);
  readonly summary = this.store.assessmentSidebarSummary;
  readonly attentionItems = this.store.assessmentAttentionItems;
  readonly activeAttentionKey = this.store.assessmentAttentionFilterKey;

  toggleAttention(item: AssessmentAttentionItem): void {
    this.store.toggleAssessmentAttentionFilter(item.filterKey);
  }

  onCreateAssessment(): void {
    this.store.openCreateAssessmentModal();
  }

  onReviewGradebooks(): void {
    this.store.setActiveAssessmentTab('gradebooks');
  }

  onModerateScores(): void {
    this.store.setActiveAssessmentTab('moderation');
  }

  onExportReport(): void {
    this.store.exportAssessmentReport();
  }
}
