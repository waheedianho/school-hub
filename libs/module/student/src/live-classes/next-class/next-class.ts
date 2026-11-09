import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  CountdownComponent,
  IconBadgeComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { LiveClass } from '../live-class.model';
import { classDate, classStatus, classTime } from '../live-class-engine';
@Component({
  selector: 'school-hub-next-class',
  imports: [CountdownComponent, IconBadgeComponent, StatusBadgeComponent],
  templateUrl: './next-class.html',
  styleUrl: './next-class.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextClassComponent {
  readonly session = input.required<LiveClass>();
  readonly now = input.required<number>();
  readonly disabled = input(false);
  readonly selected = output<string>();
  protected readonly date = classDate;
  protected readonly time = classTime;
  protected readonly status = classStatus;
  protected timestamp(value: string): number {
    return Date.parse(value);
  }
}
