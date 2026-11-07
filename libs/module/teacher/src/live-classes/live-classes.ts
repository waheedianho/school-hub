import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  ATTENDANCE_SNAPSHOT_DATA,
  CLASS_MATERIALS_RECORDINGS,
  LIVE_CLASSES_QUICK_ACTIONS,
  LiveClassesFilterValues,
  SCHEDULED_LIVE_CLASSES,
  TEACHER_LIVE_CLASSES_METRICS,
  TODAY_LIVE_CLASS_SCHEDULE,
} from '../data/teacher-live-classes.data';
import { ClassMaterialsRecordingsComponent } from './class-materials-recordings/class-materials-recordings';
import { LiveAttendanceSnapshotComponent } from './live-attendance-snapshot/live-attendance-snapshot';
import { LiveClassScheduleComponent } from './live-class-schedule/live-class-schedule';
import { LiveClassesFiltersComponent } from './live-classes-filters/live-classes-filters';
import { LiveClassesMetricsComponent } from './live-classes-metrics/live-classes-metrics';
import { LiveClassesQuickActionsComponent } from './live-classes-quick-actions/live-classes-quick-actions';
import { ScheduledLiveClassesTableComponent } from './scheduled-live-classes-table/scheduled-live-classes-table';

@Component({
  selector: 'school-hub-teacher-live-classes',
  imports: [
    LiveClassesMetricsComponent,
    LiveClassesFiltersComponent,
    ScheduledLiveClassesTableComponent,
    LiveAttendanceSnapshotComponent,
    ClassMaterialsRecordingsComponent,
    LiveClassScheduleComponent,
    LiveClassesQuickActionsComponent,
  ],
  templateUrl: './live-classes.html',
  styleUrl: './live-classes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherLiveClassesComponent {
  readonly metrics = signal(TEACHER_LIVE_CLASSES_METRICS);
  readonly allScheduledClasses = signal(SCHEDULED_LIVE_CLASSES);
  readonly attendanceSnapshot = signal(ATTENDANCE_SNAPSHOT_DATA);
  readonly materialsRecordings = signal(CLASS_MATERIALS_RECORDINGS);
  readonly todaySchedule = signal(TODAY_LIVE_CLASS_SCHEDULE);
  readonly quickActions = signal(LIVE_CLASSES_QUICK_ACTIONS);

  readonly filters = signal<LiveClassesFilterValues>({
    term: 'Term 1 2025/2026',
    className: 'All Classes',
    subject: 'All Subjects',
    status: 'All Status',
    searchQuery: '',
  });

  readonly filteredScheduledClasses = computed(() => {
    const list = this.allScheduledClasses();
    const currentFilters = this.filters();
    const query = currentFilters.searchQuery.toLowerCase().trim();

    return list.filter((item) => {
      if (
        currentFilters.className !== 'All Classes' &&
        item.className !== currentFilters.className
      ) {
        return false;
      }

      if (
        currentFilters.subject !== 'All Subjects' &&
        item.subject !== currentFilters.subject
      ) {
        return false;
      }

      if (
        currentFilters.status !== 'All Status' &&
        item.status !== currentFilters.status
      ) {
        return false;
      }

      if (query) {
        const matchesClass = item.className.toLowerCase().includes(query);
        const matchesSubject = item.subject.toLowerCase().includes(query);
        const matchesTopic = item.topic.toLowerCase().includes(query);
        const matchesDate = item.date.toLowerCase().includes(query);
        if (!matchesClass && !matchesSubject && !matchesTopic && !matchesDate) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: LiveClassesFilterValues): void {
    this.filters.set(newFilters);
  }

  onJoinClass(): void {
    // Handled in table component navigation
  }
}
