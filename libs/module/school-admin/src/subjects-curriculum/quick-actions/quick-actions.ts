import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

export interface CurriculumQuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: 'purple' | 'blue' | 'green' | 'violet';
}

@Component({
  selector: 'school-hub-curriculum-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumQuickActionsComponent {
  readonly store = inject(SchoolAdminStore);

  @Output() actionClick = new EventEmitter<string>();

  readonly actions: CurriculumQuickActionItem[] = [
    {
      id: 'manage-scheme',
      title: 'Manage Scheme of Work',
      description:
        'Review and update weekly topics, objectives, and teaching timelines.',
      icon: 'ri-calendar-event-line',
      tone: 'purple',
    },
    {
      id: 'curriculum-map',
      title: 'View Curriculum Map',
      description:
        'Track full term progression, lesson objectives, and subject coverage.',
      icon: 'ri-map-pin-range-line',
      tone: 'blue',
    },
    {
      id: 'delivery-packs',
      title: 'Review Delivery Packs',
      description:
        'Inspect topic resources, teacher guides, slides, and learner worksheets.',
      icon: 'ri-folder-zip-line',
      tone: 'green',
    },
    {
      id: 'curriculum-report',
      title: 'Generate Curriculum Report',
      description:
        'Export term coverage, readiness percentages, and compliance audits as PDF/Excel.',
      icon: 'ri-file-chart-line',
      tone: 'violet',
    },
  ];

  triggerAction(id: string): void {
    this.actionClick.emit(id);
    switch (id) {
      case 'manage-scheme':
        this.store.setActiveCurriculumTab('scheme-of-work');
        break;
      case 'curriculum-map':
        this.store.setActiveCurriculumTab('curriculum-map');
        break;
      case 'delivery-packs':
        this.store.setActiveCurriculumTab('topic-delivery-packs');
        break;
      case 'curriculum-report':
        this.store.setupSaveStatus.set(
          'Generating comprehensive curriculum readiness and coverage audit report.',
        );
        break;
    }
  }
}
