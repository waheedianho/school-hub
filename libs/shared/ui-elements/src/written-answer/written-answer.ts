import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'school-hub-written-answer',
  templateUrl: './written-answer.html',
  styleUrl: './written-answer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrittenAnswerComponent {
  readonly label = input.required<string>();
  readonly value = input('');
  readonly kind = input<'number' | 'text' | 'long'>('text');
  readonly rows = input(3);
  readonly maxLength = input(500);
  readonly placeholder = input<string>();
  readonly fullWidth = input(false);
  readonly readonly = input(false);
  readonly review = input(false);
  readonly correct = input(false);
  readonly expected = input('');
  readonly explanation = input('');
  readonly changed = output<string>();
  readonly focused = output<void>();
  protected change(event: Event): void {
    this.changed.emit((event.target as HTMLInputElement).value);
  }
}
