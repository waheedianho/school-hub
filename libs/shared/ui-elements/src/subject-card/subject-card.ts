import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar';
import {
  SubjectIconComponent,
  SubjectIcon,
} from '../subject-icon/subject-icon';
import { UI_TONES, UiTone } from '../models/ui-tone.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';

export interface SubjectCardData {
  id: string;
  name: string;
  lastLesson: string;
  progress: number;
  icon: SubjectIcon;
  tone: UiTone;
}

export interface SubjectCardSummary {
  description: string;
  completedLessons: number;
  totalLessons: number;
  nextLesson: string;
  statusLabel: string;
  statusTone: UiTone;
}

@Component({
  selector: 'school-hub-subject-card',
  imports: [
    RouterLink,
    ProgressBarComponent,
    SubjectIconComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './subject-card.html',
  styleUrl: './subject-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--subject-color]': 'palette().color',
    '[style.--subject-soft]': 'palette().soft',
  },
})
export class SubjectCardComponent {
  readonly subject = input.required<SubjectCardData>();
  readonly summary = input<SubjectCardSummary>();
  readonly route = input.required<string>();
  readonly queryParams = input<Params>();
  protected readonly palette = computed(() => UI_TONES[this.subject().tone]);
}
