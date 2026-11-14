import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubjectConsumption } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-subject-consumption-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-consumption-chart.html',
  styleUrls: ['./subject-consumption-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectConsumptionChartComponent {
  readonly items = input.required<SubjectConsumption[]>();
  readonly period = input<string>('Last 30 Days');
  readonly periodChange = output<string>();

  readonly periods = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Academic Year',
  ];

  onPeriodChange(val: string): void {
    this.periodChange.emit(val);
  }
}
