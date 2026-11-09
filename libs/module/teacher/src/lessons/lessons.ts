import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  TEACHER_LESSON_TIMELINE,
  TEACHER_LESSONS_METRICS,
  TEACHER_LESSONS_QUICK_ACTIONS,
  TEACHER_MISCONCEPTION_NOTES,
  TEACHER_PACK_COMPLETION_TIERS,
  TEACHER_SELECTED_PACK_OVERVIEW,
  TEACHER_TOPIC_DELIVERY_PACKS,
  TeacherMisconceptionNote,
  TeacherSelectedPackOverview,
  TeacherTopicDeliveryPack,
} from '../data/teacher-lessons.data';
import { LessonTimelineComponent } from './lesson-timeline/lesson-timeline';
import {
  LessonsFiltersComponent,
  LessonsFilterValues,
} from './lessons-filters/lessons-filters';
import { LessonsMetricsComponent } from './lessons-metrics/lessons-metrics';
import { LessonsQuickActionsComponent } from './lessons-quick-actions/lessons-quick-actions';
import { MisconceptionNotesComponent } from './misconception-notes/misconception-notes';
import { PackCompletionStatusComponent } from './pack-completion-status/pack-completion-status';
import { SelectedPackOverviewComponent } from './selected-pack-overview/selected-pack-overview';
import { TopicDeliveryPacksTableComponent } from './topic-delivery-packs-table/topic-delivery-packs-table';

@Component({
  selector: 'school-hub-teacher-lessons',
  standalone: true,
  imports: [
    RouterLink,
    LessonsMetricsComponent,
    LessonsFiltersComponent,
    TopicDeliveryPacksTableComponent,
    SelectedPackOverviewComponent,
    MisconceptionNotesComponent,
    LessonTimelineComponent,
    PackCompletionStatusComponent,
    LessonsQuickActionsComponent,
  ],
  templateUrl: './lessons.html',
  styleUrl: './lessons.scss',
})
export class TeacherLessonsComponent {
  private readonly router = inject(Router);

  readonly metrics = TEACHER_LESSONS_METRICS;
  readonly misconceptionNotes = TEACHER_MISCONCEPTION_NOTES;
  readonly lessonTimeline = TEACHER_LESSON_TIMELINE;
  readonly completionTiers = TEACHER_PACK_COMPLETION_TIERS;
  readonly quickActions = TEACHER_LESSONS_QUICK_ACTIONS;

  readonly allPacks = signal<TeacherTopicDeliveryPack[]>(
    TEACHER_TOPIC_DELIVERY_PACKS,
  );
  readonly selectedPack = signal<TeacherSelectedPackOverview>(
    TEACHER_SELECTED_PACK_OVERVIEW,
  );

  readonly filterValues = signal<LessonsFilterValues>({
    term: 'Term 1 2025/2026',
    classId: 'All Classes',
    subject: 'All Subjects',
    status: 'All Status',
    search: '',
  });

  readonly filteredPacks = computed(() => {
    const list = this.allPacks();
    const filter = this.filterValues();
    const query = filter.search.toLowerCase().trim();

    return list.filter((item) => {
      // Search query filter
      if (
        query &&
        !item.topic.toLowerCase().includes(query) &&
        !item.subject.toLowerCase().includes(query) &&
        !item.className.toLowerCase().includes(query)
      ) {
        return false;
      }

      // Subject filter
      if (
        filter.subject !== 'All Subjects' &&
        item.subject !== filter.subject
      ) {
        return false;
      }

      // Class filter
      if (
        filter.classId !== 'All Classes' &&
        item.className !== filter.classId
      ) {
        return false;
      }

      // Status filter
      if (filter.status !== 'All Status' && item.status !== filter.status) {
        return false;
      }

      return true;
    });
  });

  onFilterChange(values: LessonsFilterValues): void {
    this.filterValues.set(values);
  }

  onSelectPack(pack: TeacherTopicDeliveryPack): void {
    this.selectedPack.set({
      id: pack.id,
      title: `${pack.topic} – ${pack.week} Pack`,
      subject: pack.subject,
      className: pack.className,
      week: pack.week,
      readinessStatus: pack.status === 'Ready' ? 'Ready to Teach' : pack.status,
      checklist: TEACHER_SELECTED_PACK_OVERVIEW.checklist,
    });
  }

  onOpenPack(pack: TeacherSelectedPackOverview): void {
    void this.router.navigate(['/teacher/lessons'], {
      queryParams: { packId: pack.id },
    });
  }

  onEditPack(pack: TeacherSelectedPackOverview): void {
    void this.router.navigate(['/teacher/lessons'], {
      queryParams: { edit: pack.id },
    });
  }

  onViewMisconceptionNote(note: TeacherMisconceptionNote): void {
    void this.router.navigate(['/teacher/lessons'], {
      queryParams: { noteId: note.id },
    });
  }
}
