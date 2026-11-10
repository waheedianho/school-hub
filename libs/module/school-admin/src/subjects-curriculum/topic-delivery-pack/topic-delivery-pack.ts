import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { TopicDeliveryMaterial } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-topic-delivery-pack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topic-delivery-pack.html',
  styleUrls: ['./topic-delivery-pack.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicDeliveryPackComponent {
  readonly store = inject(SchoolAdminStore);

  onBack(): void {
    this.store.setActiveCurriculumTab('curriculum-map');
  }

  onDownloadPack(): void {
    this.store.setupSaveStatus.set(
      'Packaging and downloading complete Whole Numbers delivery pack archive (.zip).',
    );
  }

  onShareWithTeacher(): void {
    this.store.setupSaveStatus.set(
      'Delivery pack shared with Mr. Tunde Adewale and assigned subject teachers.',
    );
  }

  onEditPack(): void {
    this.store.setupSaveStatus.set(
      'Edit Topic Delivery Pack opened. Manage materials and lesson sequences.',
    );
  }

  onMaterialAction(item: TopicDeliveryMaterial): void {
    this.store.setupSaveStatus.set(
      `Action triggered for material: ${item.material} (${item.status}).`,
    );
  }

  onApprovePack(): void {
    this.store.setupSaveStatus.set(
      'Topic Delivery Pack approved for classroom and tutor instruction.',
    );
  }
}
