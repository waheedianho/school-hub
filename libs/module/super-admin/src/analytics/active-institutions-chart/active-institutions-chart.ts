import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveInstitution } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-active-institutions-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './active-institutions-chart.html',
  styleUrls: ['./active-institutions-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveInstitutionsChartComponent {
  readonly institutions = input.required<ActiveInstitution[]>();
  readonly period = input<string>('Last 30 Days');
  readonly periodChange = output<string>();

  readonly periods = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Term',
  ];

  onPeriodChange(val: string): void {
    this.periodChange.emit(val);
  }
}
