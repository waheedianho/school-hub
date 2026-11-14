import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ResourceItem,
  ResourceStatus,
} from '../../data/super-admin-resources.models';

@Component({
  selector: 'school-hub-resource-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-detail-modal.html',
  styleUrl: './resource-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailModalComponent {
  readonly resource = input.required<ResourceItem>();

  readonly closeModal = output<void>();
  readonly statusChanged = output<{
    resourceId: string;
    newStatus: ResourceStatus;
  }>();
  readonly downloadRequested = output<string>();

  onApprove(): void {
    this.statusChanged.emit({
      resourceId: this.resource().id,
      newStatus: 'Approved',
    });
    this.closeModal.emit();
  }

  onReject(): void {
    this.statusChanged.emit({
      resourceId: this.resource().id,
      newStatus: 'Rejected',
    });
    this.closeModal.emit();
  }

  onDownload(): void {
    this.downloadRequested.emit(this.resource().id);
  }
}
