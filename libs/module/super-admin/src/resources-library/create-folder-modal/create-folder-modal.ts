import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'school-hub-create-folder-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-folder-modal.html',
  styleUrl: './create-folder-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFolderModalComponent {
  readonly closeModal = output<void>();
  readonly folderCreated = output<{
    folderName: string;
    category: string;
    classLevel: string;
    description?: string;
  }>();

  readonly folderName = signal<string>('');
  readonly category = signal<string>('Lesson Notes');
  readonly classLevel = signal<string>('JSS1');
  readonly description = signal<string>('');

  onSubmit(): void {
    const name = this.folderName().trim();
    if (!name) return;

    this.folderCreated.emit({
      folderName: name,
      category: this.category(),
      classLevel: this.classLevel(),
      description: this.description().trim(),
    });
    this.closeModal.emit();
  }
}
