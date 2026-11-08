import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ReportLearnerAttentionItem } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-reports-attention-panel',
  imports: [],
  templateUrl: './reports-attention-panel.html',
  styleUrl: './reports-attention-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsAttentionPanelComponent {
  readonly learners = input.required<ReportLearnerAttentionItem[]>();
  readonly viewLearner = output<ReportLearnerAttentionItem>();
  readonly viewAll = output<void>();

  getStatusBadgeClass(status: string): string {
    return status === 'Below Mastery' ? 'badge-below' : 'badge-developing';
  }
}
