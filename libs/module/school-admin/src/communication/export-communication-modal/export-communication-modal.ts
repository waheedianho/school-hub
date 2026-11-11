import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-export-communication-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './export-communication-modal.html',
  styleUrls: ['./export-communication-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportCommunicationModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isExportCommunicationModalOpen;

  readonly selectedFormat = signal<'PDF' | 'CSV' | 'Excel'>('PDF');
  readonly dateRange = signal<string>('This Term');
  readonly includeDeliveryLogs = signal<boolean>(true);

  onClose(): void {
    this.store.closeExportCommunicationModal();
  }

  onSubmit(): void {
    this.store.exportCommunicationReport(this.selectedFormat());
  }
}
