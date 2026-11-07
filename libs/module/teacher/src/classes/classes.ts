import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  TEACHER_ANNOUNCEMENTS_DATA,
  TEACHER_CLASS_SCHEDULE_DATA,
  TEACHER_CLASSES_DATA,
  TEACHER_CLASSES_METRICS,
  TEACHER_CLASSES_PENDING_REVIEWS,
  TEACHER_CLASSES_QUICK_ACTIONS,
  TEACHER_LEARNERS_ATTENTION_DATA,
  TEACHER_PERFORMANCE_TIERS,
  TeacherClassItem,
} from '../data/teacher-classes.data';
import {
  ClassesFiltersComponent,
  ClassesFilterValues,
} from './classes-filters/classes-filters';
import { ClassesMetricsComponent } from './classes-metrics/classes-metrics';
import { ClassesPendingReviewComponent } from './classes-pending-review/classes-pending-review';
import { ClassesPerformanceOverviewComponent } from './classes-performance-overview/classes-performance-overview';
import { ClassesQuickActionsComponent } from './classes-quick-actions/classes-quick-actions';
import { ClassesTableComponent } from './classes-table/classes-table';
import { ClassesTodayScheduleComponent } from './classes-today-schedule/classes-today-schedule';
import { LearnersAttentionComponent } from './learners-attention/learners-attention';
import { RecentAnnouncementsComponent } from './recent-announcements/recent-announcements';

@Component({
  selector: 'school-hub-teacher-classes',
  standalone: true,
  imports: [
    RouterLink,
    ClassesMetricsComponent,
    ClassesFiltersComponent,
    ClassesTableComponent,
    ClassesPendingReviewComponent,
    LearnersAttentionComponent,
    RecentAnnouncementsComponent,
    ClassesTodayScheduleComponent,
    ClassesPerformanceOverviewComponent,
    ClassesQuickActionsComponent,
  ],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class TeacherClassesComponent {
  readonly metrics = TEACHER_CLASSES_METRICS;
  readonly pendingReviews = TEACHER_CLASSES_PENDING_REVIEWS;
  readonly learnersAttention = TEACHER_LEARNERS_ATTENTION_DATA;
  readonly announcements = TEACHER_ANNOUNCEMENTS_DATA;
  readonly todaySchedule = TEACHER_CLASS_SCHEDULE_DATA;
  readonly performanceTiers = TEACHER_PERFORMANCE_TIERS;
  readonly quickActions = TEACHER_CLASSES_QUICK_ACTIONS;

  readonly allClasses = signal<TeacherClassItem[]>(TEACHER_CLASSES_DATA);
  readonly filterValues = signal<ClassesFilterValues>({
    term: 'Term 1 2025/2026',
    subject: 'All Subjects',
    status: 'All Status',
    search: '',
  });

  readonly filteredClasses = computed(() => {
    const list = this.allClasses();
    const filter = this.filterValues();
    const query = filter.search.toLowerCase().trim();

    return list.filter((cls) => {
      // Search query filter
      if (
        query &&
        !cls.name.toLowerCase().includes(query) &&
        !cls.subject.toLowerCase().includes(query)
      ) {
        return false;
      }

      // Status filter
      if (filter.status !== 'All Status' && cls.status !== filter.status) {
        return false;
      }

      // Subject filter
      if (filter.subject !== 'All Subjects' && cls.subject !== filter.subject) {
        return false;
      }

      return true;
    });
  });

  private readonly router = inject(Router);

  onFilterChange(values: ClassesFilterValues): void {
    this.filterValues.set(values);
  }

  onViewClass(cls: TeacherClassItem): void {
    // Navigate to class detail or subject overview
    void this.router.navigate(['/teacher/classes'], {
      queryParams: { classId: cls.id },
    });
  }
}
