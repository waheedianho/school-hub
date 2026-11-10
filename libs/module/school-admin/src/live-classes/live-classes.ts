import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { LiveClassTab } from '../data/school-admin.models';
import { LiveClassesSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { LiveClassesTableComponent } from './classes-table/classes-table';
import { LiveClassesSidebarComponent } from './live-classes-sidebar/live-classes-sidebar';
import { AttendanceRecordingsComponent } from './attendance-recordings/attendance-recordings';
import { LiveClassesQuickActionsComponent } from './quick-actions/quick-actions';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal';
import { ClassObserverModalComponent } from './class-observer-modal/class-observer-modal';

@Component({
  selector: 'school-hub-live-classes',
  standalone: true,
  imports: [
    CommonModule,
    LiveClassesSummaryMetricsComponent,
    LiveClassesTableComponent,
    LiveClassesSidebarComponent,
    AttendanceRecordingsComponent,
    LiveClassesQuickActionsComponent,
    ScheduleModalComponent,
    ClassObserverModalComponent,
  ],
  templateUrl: './live-classes.html',
  styleUrls: ['./live-classes.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesComponent {
  readonly store = inject(SchoolAdminStore);

  onTabChange(tab: LiveClassTab): void {
    this.store.setActiveLiveClassTab(tab);
  }
}
