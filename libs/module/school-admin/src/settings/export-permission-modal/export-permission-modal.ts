import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-export-permission-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-permission-modal.html',
  styleUrls: ['./export-permission-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportPermissionModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isExportPermissionModalOpen;

  readonly selectedFormat = signal<'PDF' | 'CSV'>('PDF');

  selectFormat(format: 'PDF' | 'CSV'): void {
    this.selectedFormat.set(format);
  }

  onClose(): void {
    this.store.closeExportPermissionModal();
  }

  onExport(): void {
    this.store.exportPermissionReport(this.selectedFormat());
  }
}
