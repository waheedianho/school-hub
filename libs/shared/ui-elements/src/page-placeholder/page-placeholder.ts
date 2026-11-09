import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-hub-page-placeholder',
  templateUrl: './page-placeholder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePlaceholderComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input('construction');
}
