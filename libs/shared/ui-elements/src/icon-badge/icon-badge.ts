import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';

@Component({
  selector: 'school-hub-icon-badge',
  template: '<i [class]="icon()" aria-hidden="true"></i>',
  styleUrl: './icon-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--badge-color]': 'palette().color',
    '[style.--badge-soft]': 'palette().soft',
    '[class.soft]': 'soft()',
    '[class.large]': 'large()',
  },
})
export class IconBadgeComponent {
  readonly icon = input.required<string>();
  readonly tone = input<UiTone>('blue');
  readonly soft = input(false);
  readonly large = input(false);
  protected readonly palette = computed(() => UI_TONES[this.tone()]);
}
