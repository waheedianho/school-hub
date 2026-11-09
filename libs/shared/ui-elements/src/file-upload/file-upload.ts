import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

export interface UploadFileItem {
  id: string;
  name: string;
  size: number;
}
@Component({
  selector: 'school-hub-file-upload',
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  readonly files = input<readonly UploadFileItem[]>([]);
  readonly accept = input('');
  readonly disabled = input(false);
  readonly errors = input<readonly string[]>([]);
  readonly help = input('Choose files or drag them here.');
  readonly label = input('Attach portfolio files');
  readonly emptyMessage = input(
    'No files attached. You can also submit written work.',
  );
  readonly added = output<readonly File[]>();
  readonly removed = output<string>();
  readonly previewed = output<string>();
  readonly downloaded = output<string>();
  protected change(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!this.disabled()) this.added.emit(Array.from(input.files ?? []));
    input.value = '';
  }
  protected drag(event: DragEvent): void {
    event.preventDefault();
  }
  protected drop(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled())
      this.added.emit(Array.from(event.dataTransfer?.files ?? []));
  }
  protected size(size: number): string {
    return size < 1024
      ? `${size} B`
      : size < 1048576
        ? `${(size / 1024).toFixed(1)} KB`
        : `${(size / 1048576).toFixed(1)} MB`;
  }
}
