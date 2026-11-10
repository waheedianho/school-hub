import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LessonReadinessAlert } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-readiness-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './readiness-alerts.html',
  styleUrls: ['./readiness-alerts.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadinessAlertsComponent {
  readonly store = inject(SchoolAdminStore);

  readonly severityFilter = signal<string>('All');

  readonly filteredAlerts = computed(() => {
    const list = this.store.filteredLessonAlerts();
    const filter = this.severityFilter();
    if (filter === 'All') return list;
    return list.filter((a) => a.severity === filter.toLowerCase());
  });

  setFilter(filter: string): void {
    this.severityFilter.set(filter);
  }

  onAction(alert: LessonReadinessAlert): void {
    this.store.setupSaveStatus.set(
      `Triggered action "${alert.actionLabel}" for alert: ${alert.title}.`,
    );
  }

  onResolve(alert: LessonReadinessAlert): void {
    this.store.resolveReadinessAlert(alert.id);
  }
}
