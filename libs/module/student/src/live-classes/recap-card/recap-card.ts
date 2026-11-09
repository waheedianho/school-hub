import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { StatusBadgeComponent } from '@school-hub/ui-elements';
import { LiveClass } from '../live-class.model';
import { classDate } from '../live-class-engine';
@Component({
  selector: 'school-hub-class-recap-card',
  imports: [StatusBadgeComponent],
  templateUrl: './recap-card.html',
  styleUrl: './recap-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassRecapCardComponent {
  readonly item = input.required<LiveClass>();
  readonly disabled = input(false);
  readonly selected = output<string>();
  protected readonly date = classDate;
}
