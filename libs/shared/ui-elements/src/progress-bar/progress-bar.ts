import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  readonly value = input.required<number>();
  readonly label = input.required<string>();
  readonly tone = input<UiTone>('blue');
  protected readonly percentage = computed(() =>
    Number.isFinite(this.value())
      ? Math.min(100, Math.max(0, this.value()))
      : 0,
  );
  protected readonly color = computed(() => UI_TONES[this.tone()].color);
}
