import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';

@Component({
  selector: 'school-hub-settings-support-card',
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './support-card.html',
  styleUrl: './support-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class SupportCardComponent {
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly modalRequested = output<'help' | 'report'>();
}
