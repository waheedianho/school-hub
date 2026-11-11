import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { ResourceItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-resources-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-details-modal.html',
  styleUrls: ['./resource-details-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly selectedItem = this.store.selectedResourceItem;

  onClose(): void {
    this.store.closeResourceDetails();
  }

  onApprove(id: string): void {
    this.store.approveResource(id);
    this.store.closeResourceDetails();
  }

  onReject(id: string): void {
    this.store.rejectResource(id);
    this.store.closeResourceDetails();
  }

  onLinkDeliveryPack(item: ResourceItem): void {
    this.store.closeResourceDetails();
    this.store.openLinkDeliveryPackModal(item);
  }
}
