import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-feedback-note',
  templateUrl: './feedback-note.html',
  styleUrl: './feedback-note.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackNoteComponent {
  readonly title = input.required<string>();
  readonly icon = input.required<string>();
  readonly tone = input<UiTone>('blue');
  readonly body = input('');
  readonly items = input<readonly string[]>([]);
  protected readonly colors = computed(() => UI_TONES[this.tone()]);
}
