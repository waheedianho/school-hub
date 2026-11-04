import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-progress-ring',
  templateUrl: './progress-ring.html',
  styleUrl: './progress-ring.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressRingComponent {
  readonly value = input.required<number>();
  readonly label = input.required<string>();
  readonly tone = input<UiTone>('blue');
  readonly caption = input('Complete');
  protected readonly percentage = computed(() =>
    Number.isFinite(this.value())
      ? Math.min(100, Math.max(0, this.value()))
      : 0,
  );
  protected readonly background = computed(
    () =>
      `conic-gradient(${UI_TONES[this.tone()].color} ${this.percentage() * 3.6}deg, #dbe5fc 0deg)`,
  );
}
