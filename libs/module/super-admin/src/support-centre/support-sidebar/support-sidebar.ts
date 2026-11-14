import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RecentSupportActivity,
  SLAQueueBreakdown,
  SupportHealthCategory,
  SupportUrgentEscalation,
} from '../../data/super-admin-support.models';

@Component({
  selector: 'school-hub-support-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-sidebar.html',
  styleUrl: './support-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportSidebarComponent {
  readonly healthCategories = input.required<SupportHealthCategory[]>();
  readonly urgentEscalations = input.required<SupportUrgentEscalation[]>();
  readonly slaQueue = input.required<SLAQueueBreakdown>();
  readonly recentActivities = input.required<RecentSupportActivity[]>();

  readonly viewEscalations = output<void>();
  readonly viewSlaQueue = output<void>();
  readonly createTicketAction = output<void>();
  readonly assignReviewerAction = output<void>();
  readonly downloadLogsAction = output<void>();
  readonly contactSchoolAction = output<void>();
  readonly viewKnowledgeBaseAction = output<void>();
  readonly selectTicket = output<string>();
}
