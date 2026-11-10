import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

export interface LessonQuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: 'purple' | 'green' | 'blue' | 'orange';
}

@Component({
  selector: 'school-hub-lessons-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsQuickActionsComponent {
  readonly store = inject(SchoolAdminStore);

  @Output() actionClick = new EventEmitter<string>();

  readonly actions: LessonQuickActionItem[] = [
    {
      id: 'review-plans',
      title: 'Review Lesson Plans',
      description: 'Review and approve lesson plans and objectives',
      icon: 'ri-file-shield-line',
      tone: 'purple',
    },
    {
      id: 'monitor-coverage',
      title: 'Monitor Coverage',
      description: 'Track curriculum coverage and topic progress',
      icon: 'ri-pie-chart-line',
      tone: 'green',
    },
    {
      id: 'teacher-activity',
      title: 'View Teacher Activity',
      description: 'See teacher updates and lesson activity',
      icon: 'ri-group-line',
      tone: 'blue',
    },
    {
      id: 'oversight-report',
      title: 'Generate Oversight Report',
      description: 'Download comprehensive lesson delivery oversight analytics',
      icon: 'ri-bar-chart-grouped-line',
      tone: 'orange',
    },
  ];

  triggerAction(id: string): void {
    this.actionClick.emit(id);
    switch (id) {
      case 'review-plans':
        this.store.setActiveLessonsTab('lesson-reviews');
        break;
      case 'monitor-coverage':
        this.store.setActiveLessonsTab('delivery-oversight');
        break;
      case 'teacher-activity':
        this.store.setActiveLessonsTab('active-lessons');
        break;
      case 'oversight-report':
        this.store.setupSaveStatus.set(
          'Generating comprehensive lesson delivery and pacing oversight report.',
        );
        break;
    }
  }
}
