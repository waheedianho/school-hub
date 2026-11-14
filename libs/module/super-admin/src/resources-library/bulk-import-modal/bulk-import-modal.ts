import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'school-hub-bulk-import-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-import-modal.html',
  styleUrl: './bulk-import-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkImportModalComponent {
  readonly closeModal = output<void>();
  readonly imported = output<{
    packName: string;
    targetSubject: string;
    fileCount: number;
    autoApprove: boolean;
  }>();

  readonly packName = signal<string>('JSS1 Mathematics Pack');
  readonly targetSubject = signal<string>('Mathematics');
  readonly selectedFile = signal<string>('curriculum_assets_batch_v2.zip');
  readonly autoApprove = signal<boolean>(false);
  readonly fileCount = signal<number>(18);

  onSubmit(): void {
    this.imported.emit({
      packName: this.packName(),
      targetSubject: this.targetSubject(),
      fileCount: this.fileCount(),
      autoApprove: this.autoApprove(),
    });
    this.closeModal.emit();
  }
}
