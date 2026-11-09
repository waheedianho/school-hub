import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
export interface ActivityDay {
  date: string;
  label: string;
  description: string;
  state: 'complete' | 'today' | 'missing' | 'future';
}
@Component({
  selector: 'school-hub-activity-week',
  templateUrl: './activity-week.html',
  styleUrl: './activity-week.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityWeekComponent {
  readonly days = input.required<readonly ActivityDay[]>();
  readonly selected = output<string>();
}
