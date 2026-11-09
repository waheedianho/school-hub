import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-status-badge',
  template:
    '@if (icon()) { <i [class]="icon()" aria-hidden="true"></i> } {{ label() }}',
  styleUrl: './status-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.color]': 'palette().color',
    '[style.background]': 'palette().soft',
  },
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly tone = input<UiTone>('blue');
  readonly icon = input('');
  protected readonly palette = computed(() => UI_TONES[this.tone()]);
}
