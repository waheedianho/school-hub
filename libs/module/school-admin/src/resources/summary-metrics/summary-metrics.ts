import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-resources-summary-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-metrics.html',
  styleUrls: ['./summary-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesSummaryMetricsComponent {
  readonly store = inject(SchoolAdminStore);
  readonly metrics = this.store.resourcesSummaryMetrics;
}
