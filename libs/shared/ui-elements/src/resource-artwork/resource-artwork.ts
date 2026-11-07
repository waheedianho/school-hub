import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';
@Component({
  selector: 'school-hub-resource-artwork',
  templateUrl: './resource-artwork.html',
  styleUrl: './resource-artwork.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--art-color]': 'palette().color',
    '[style.--art-soft]': 'palette().soft',
  },
})
export class ResourceArtworkComponent {
  readonly title = input.required<string>();
  readonly symbol = input('Aa');
  readonly icon = input('ri-book-open-line');
  readonly tone = input<UiTone>('purple');
  protected readonly palette = computed(() => UI_TONES[this.tone()]);
}
