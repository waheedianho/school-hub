import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import {
  WeekResourceItem,
  SchemeLessonItem,
} from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-scheme-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheme-detail.html',
  styleUrls: ['./scheme-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemeDetailComponent {
  readonly store = inject(SchoolAdminStore);

  readonly activeSubTab = signal<'lessons' | 'resources'>('lessons');
  readonly resourceFilter = signal<string>('All');
  readonly resourceSearch = signal<string>('');

  readonly filteredResources = computed(() => {
    const list = this.store.weekResources();
    const filter = this.resourceFilter();
    const query = this.resourceSearch().toLowerCase().trim();

    return list.filter((item) => {
      let matchesAudience = true;
      if (filter === 'Teacher') {
        matchesAudience = item.audience.includes('Teacher');
      } else if (filter === 'Learner') {
        matchesAudience = item.audience.includes('Learner');
      } else if (filter === 'Assessments') {
        matchesAudience =
          item.type.includes('Assessment') ||
          item.type.includes('Answer Key') ||
          item.type.includes('Portfolio');
      }

      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.linkedLesson.toLowerCase().includes(query);

      return matchesAudience && matchesQuery;
    });
  });

  setSubTab(tab: 'lessons' | 'resources'): void {
    this.activeSubTab.set(tab);
  }

  setResourceFilter(filter: string): void {
    this.resourceFilter.set(filter);
  }

  onBackToScheme(): void {
    this.store.setActiveCurriculumTab('scheme-of-work');
  }

  onViewDeliveryPack(): void {
    this.store.viewTopicDeliveryPack();
  }

  onEditScheme(): void {
    this.store.setupSaveStatus.set(
      'Edit Week Scheme modal opened. You can adjust objectives and periods.',
    );
  }

  onUploadResource(): void {
    this.store.setupSaveStatus.set(
      'Upload Resource wizard opened. Select material file or link.',
    );
  }

  onSubmitForReview(): void {
    this.store.setupSaveStatus.set(
      'Week 4 scheme submitted for HOD curriculum approval.',
    );
  }

  onLessonAction(lesson: SchemeLessonItem): void {
    this.store.setupSaveStatus.set(
      `Lesson ${lesson.lessonNumber}: ${lesson.title} details opened.`,
    );
  }

  onResourceAction(res: WeekResourceItem): void {
    this.store.setupSaveStatus.set(`${res.action} triggered for ${res.name}.`);
  }
}
