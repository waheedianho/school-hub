import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { UploadResourceFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-resources-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-resource-modal.html',
  styleUrls: ['./upload-resource-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadResourceModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isUploadResourceModalOpen;

  readonly formData = signal<UploadResourceFormData>({
    title: '',
    className: 'JSS 1A',
    subject: 'Mathematics',
    week: 'Week 1',
    topic: '',
    resourceType: 'Lesson Note',
    audience: 'Learners',
    format: 'PDF',
    linkedDeliveryPack: 'JSS 1A - Math W1',
    isLowDataVersion: true,
    description: '',
  });

  onClose(): void {
    this.store.closeUploadResourceModal();
  }

  updateField<K extends keyof UploadResourceFormData>(
    field: K,
    value: UploadResourceFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.title || !data.className || !data.subject) return;
    this.store.uploadResource(data);
  }
}
