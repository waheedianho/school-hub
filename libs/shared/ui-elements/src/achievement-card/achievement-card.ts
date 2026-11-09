import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  computed,
} from '@angular/core';
import { UI_TONES, UiTone } from '../models/ui-tone.model';
export interface AchievementCardData {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
  tone: UiTone;
  earned: boolean;
}
@Component({
  selector: 'school-hub-achievement-card',
  templateUrl: './achievement-card.html',
  styleUrl: './achievement-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--award-color]': 'palette().color',
    '[style.--award-soft]': 'palette().soft',
  },
})
export class AchievementCardComponent {
  readonly achievement = input.required<AchievementCardData>();
  readonly selected = output<string>();
  protected readonly palette = computed(
    () => UI_TONES[this.achievement().tone],
  );
}
