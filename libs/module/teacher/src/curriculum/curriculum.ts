import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  TEACHER_ASSIGNED_SUBJECTS,
  TEACHER_CURRICULUM_METRICS,
  TEACHER_CURRICULUM_QUICK_ACTIONS,
  TEACHER_TOPIC_OBJECTIVE,
  TEACHER_UPCOMING_TOPICS,
  TEACHER_WEEKLY_FOCUS_ITEMS,
  TEACHER_WEEKS_COVERAGE,
  TeacherAssignedSubject,
} from '../data/teacher-curriculum.data';
import { AssignedSubjectsTableComponent } from './assigned-subjects-table/assigned-subjects-table';
import {
  CurriculumFiltersComponent,
  CurriculumFilterValues,
} from './curriculum-filters/curriculum-filters';
import { CurriculumMetricsComponent } from './curriculum-metrics/curriculum-metrics';
import { CurriculumProgressComponent } from './curriculum-progress/curriculum-progress';
import { CurriculumQuickActionsComponent } from './curriculum-quick-actions/curriculum-quick-actions';
import { CurrentTopicObjectivesComponent } from './current-topic-objectives/current-topic-objectives';
import { UpcomingTopicsComponent } from './upcoming-topics/upcoming-topics';
import { WeeklyCurriculumFocusComponent } from './weekly-curriculum-focus/weekly-curriculum-focus';

@Component({
  selector: 'school-hub-teacher-curriculum',
  standalone: true,
  imports: [
    CurriculumMetricsComponent,
    CurriculumFiltersComponent,
    AssignedSubjectsTableComponent,
    WeeklyCurriculumFocusComponent,
    CurriculumProgressComponent,
    CurrentTopicObjectivesComponent,
    UpcomingTopicsComponent,
    CurriculumQuickActionsComponent,
  ],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss',
})
export class TeacherCurriculumComponent {
  private readonly router = inject(Router);

  readonly metrics = TEACHER_CURRICULUM_METRICS;
  readonly weeklyFocusItems = TEACHER_WEEKLY_FOCUS_ITEMS;
  readonly weeksCoverage = TEACHER_WEEKS_COVERAGE;
  readonly topicObjective = TEACHER_TOPIC_OBJECTIVE;
  readonly upcomingTopics = TEACHER_UPCOMING_TOPICS;
  readonly quickActions = TEACHER_CURRICULUM_QUICK_ACTIONS;

  readonly allSubjects = signal<TeacherAssignedSubject[]>(
    TEACHER_ASSIGNED_SUBJECTS,
  );
  readonly filterValues = signal<CurriculumFilterValues>({
    term: 'Term 1 2025/2026',
    classId: 'All Classes',
    subject: 'All Subjects',
    search: '',
  });

  readonly filteredSubjects = computed(() => {
    const list = this.allSubjects();
    const filter = this.filterValues();
    const query = filter.search.toLowerCase().trim();

    return list.filter((item) => {
      // Search text query
      if (
        query &&
        !item.subject.toLowerCase().includes(query) &&
        !item.currentTopic.toLowerCase().includes(query) &&
        !item.classesList.toLowerCase().includes(query)
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
        !item.classesList.includes(filter.classId)
      ) {
        return false;
      }

      return true;
    });
  });

  onFilterChange(values: CurriculumFilterValues): void {
    this.filterValues.set(values);
  }

  onSelectSubject(subject: TeacherAssignedSubject): void {
    void this.router.navigate(['/teacher/curriculum'], {
      queryParams: { subject: subject.id },
    });
  }
}
