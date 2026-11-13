import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeatmapCell } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-engagement-heatmap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './engagement-heatmap.html',
  styleUrls: ['./engagement-heatmap.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngagementHeatmapComponent {
  readonly cells = input.required<HeatmapCell[]>();
  readonly period = input<string>('Last 30 Days');
  readonly periodChange = output<string>();

  readonly periods = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Term',
  ];

  readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  readonly weeks = [
    { key: 'Week 1', label: 'Apr 21 – Apr 27' },
    { key: 'Week 2', label: 'Apr 28 – May 4' },
    { key: 'Week 3', label: 'May 5 – May 11' },
    { key: 'Week 4', label: 'May 12 – May 18' },
  ];

  readonly cellsMap = computed(() => {
    const map = new Map<string, HeatmapCell>();
    for (const cell of this.cells()) {
      map.set(`${cell.week}-${cell.day}`, cell);
    }
    return map;
  });

  getCell(week: string, day: string): HeatmapCell | undefined {
    return this.cellsMap().get(`${week}-${day}`);
  }

  onPeriodChange(val: string): void {
    this.periodChange.emit(val);
  }
}
