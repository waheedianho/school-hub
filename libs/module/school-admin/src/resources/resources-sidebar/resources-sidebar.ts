import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { ResourceAttentionItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-resources-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources-sidebar.html',
  styleUrls: ['./resources-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesSidebarComponent {
  readonly store = inject(SchoolAdminStore);

  readonly summary = this.store.resourcesSidebarSummary;
  readonly attentionItems = this.store.resourceAttentionItems;
  readonly selectedAttention = this.store.selectedResourceAttentionItem;

  onSelectAttention(item: ResourceAttentionItem): void {
    this.store.selectResourceAttentionItem(item);
  }

  onUploadResource(): void {
    this.store.openUploadResourceModal();
  }

  onReviewApprovalQueue(): void {
    this.store.setActiveResourcesTab('queue');
  }

  onLinkDeliveryPack(): void {
    this.store.openLinkDeliveryPackModal();
  }

  onExportResourceReport(): void {
    this.store.openExportResourceModal();
  }
}
