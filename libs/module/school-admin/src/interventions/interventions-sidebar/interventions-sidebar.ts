import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { InterventionAttentionItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-interventions-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interventions-sidebar.html',
  styleUrls: ['./interventions-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterventionsSidebarComponent {
  readonly store = inject(SchoolAdminStore);
  readonly summary = this.store.interventionsSidebarSummary;
  readonly attentionItems = this.store.interventionsAttentionItems;
  readonly selectedItem = this.store.selectedInterventionAttentionItem;

  onSelectAttentionItem(item: InterventionAttentionItem): void {
    this.store.selectInterventionAttentionItem(item);
  }

  onCreatePlan(): void {
    this.store.openCreateInterventionModal();
  }

  onAssignFollowUp(): void {
    this.store.openAssignFollowUpModal();
  }

  onScheduleParentMeeting(): void {
    this.store.openScheduleParentMeetingModal();
  }

  onExportReport(): void {
    this.store.openExportInterventionModal();
  }
}
