import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-resources-bottom-action-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-action-cards.html',
  styleUrls: ['./bottom-action-cards.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesBottomActionCardsComponent {
  readonly store = inject(SchoolAdminStore);

  onUploadNewResource(): void {
    this.store.openUploadResourceModal();
  }

  onReviewApprovalQueue(): void {
    this.store.setActiveResourcesTab('queue');
  }

  onManageSharedTemplates(): void {
    this.store.setActiveResourcesTab('templates');
  }

  onGenerateResourceReport(): void {
    this.store.openExportResourceModal();
  }
}
