import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';

@Component({
  selector: 'school-hub-settings-language-card',
  imports: [DashboardCardComponent],
  templateUrl: './language-card.html',
  styleUrl: './language-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class LanguageCardComponent {
  readonly appLanguage = input<string>('en');
  readonly contentLanguage = input<string>('en');
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly languageChanged = output<{
    key: 'appLanguage' | 'contentLanguage';
    value: string;
  }>();

  onChange(key: 'appLanguage' | 'contentLanguage', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.languageChanged.emit({ key, value });
  }
}
