import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  DashboardCardComponent,
  IconBadgeComponent,
} from '@school-hub/ui-elements';

@Component({
  selector: 'school-hub-settings-about-card',
  imports: [DashboardCardComponent, IconBadgeComponent],
  templateUrl: './about-card.html',
  styleUrl: './about-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class AboutCardComponent {
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly detailsRequested = output<void>();
}
