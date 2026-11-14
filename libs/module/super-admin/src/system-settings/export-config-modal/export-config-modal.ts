import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ExportConfigOptions,
  SystemSettingsState,
} from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-export-config-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './export-config-modal.html',
  styleUrl: './export-config-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportConfigModalComponent {
  readonly isOpen = input<boolean>(false);
  readonly settings = input<SystemSettingsState | null>(null);

  readonly closeModal = output<void>();
  readonly exportExecuted = output<ExportConfigOptions>();

  selectedFormat: 'json' | 'yaml' | 'csv' = 'json';
  maskSecrets = true;
  includeAuditHash = true;
  prettyPrint = true;
  copiedToClipboard = false;

  get previewJson(): string {
    if (!this.settings()) return '{}';
    const copy = JSON.parse(JSON.stringify(this.settings()));
    if (this.maskSecrets) {
      if (copy.integrations) {
        copy.integrations.apiKey = '••••••••••••••••';
      }
    }
    return JSON.stringify(copy, null, 2);
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onDownload(): void {
    this.exportExecuted.emit({
      format: this.selectedFormat,
      maskSecrets: this.maskSecrets,
      includeAuditHash: this.includeAuditHash,
      prettyPrint: this.prettyPrint,
    });
    this.onClose();
  }

  copyPreview(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.previewJson).then(() => {
        this.copiedToClipboard = true;
        setTimeout(() => (this.copiedToClipboard = false), 2000);
      });
    }
  }
}
