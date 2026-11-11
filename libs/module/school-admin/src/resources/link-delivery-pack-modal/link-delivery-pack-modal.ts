import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LinkDeliveryPackFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-resources-link-delivery-pack-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './link-delivery-pack-modal.html',
  styleUrls: ['./link-delivery-pack-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkDeliveryPackModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isLinkDeliveryPackModalOpen;
  readonly resources = this.store.resources;
  readonly selectedItem = this.store.selectedResourceItem;

  readonly formData = signal<LinkDeliveryPackFormData>({
    resourceId: 'res-007',
    deliveryPackId: 'JSS 1C - Sci W2',
    className: 'JSS 1C',
    subject: 'Basic Science',
    week: 'Week 2',
  });

  constructor() {
    effect(() => {
      const current = this.selectedItem();
      if (current) {
        this.formData.set({
          resourceId: current.id,
          deliveryPackId:
            current.linkedDeliveryPack ||
            `${current.className} - ${current.subject.slice(0, 3)} ${current.week}`,
          className: current.className,
          subject: current.subject,
          week: current.week,
        });
      }
    });
  }

  onClose(): void {
    this.store.closeLinkDeliveryPackModal();
  }

  onResourceChange(resourceId: string): void {
    const found = this.resources().find((r) => r.id === resourceId);
    if (found) {
      this.formData.set({
        resourceId: found.id,
        deliveryPackId:
          found.linkedDeliveryPack ||
          `${found.className} - ${found.subject.slice(0, 3)} ${found.week}`,
        className: found.className,
        subject: found.subject,
        week: found.week,
      });
    }
  }

  updateField<K extends keyof LinkDeliveryPackFormData>(
    field: K,
    value: LinkDeliveryPackFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.resourceId || !data.deliveryPackId) return;
    this.store.linkResourceToDeliveryPack(data);
  }
}
