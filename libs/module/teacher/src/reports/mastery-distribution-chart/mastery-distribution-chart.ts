import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MasteryDistributionItem } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-mastery-distribution-chart',
  imports: [],
  templateUrl: './mastery-distribution-chart.html',
  styleUrl: './mastery-distribution-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasteryDistributionChartComponent {
  readonly items = input.required<MasteryDistributionItem[]>();
  readonly totalLearners = input<number>(112);
}
