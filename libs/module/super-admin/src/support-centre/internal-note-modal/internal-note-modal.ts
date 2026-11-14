import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'school-hub-internal-note-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './internal-note-modal.html',
  styleUrl: './internal-note-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalNoteModalComponent {
  readonly ticketId = input.required<string>();

  readonly closeModal = output<void>();
  readonly noteAdded = output<{
    ticketId: string;
    note: string;
  }>();

  readonly noteText = signal<string>('');

  onSubmit(): void {
    const text = this.noteText().trim();
    if (!text) return;

    this.noteAdded.emit({
      ticketId: this.ticketId(),
      note: text,
    });
    this.closeModal.emit();
  }
}
