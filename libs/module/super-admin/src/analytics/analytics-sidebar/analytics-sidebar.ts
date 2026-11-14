import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AdoptionInsight,
  AttentionSchool,
  PlatformActivityItem,
} from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-analytics-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-sidebar.html',
  styleUrls: ['./analytics-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsSidebarComponent {
  readonly attentionSchools = input.required<AttentionSchool[]>();
  readonly adoptionInsights = input.required<AdoptionInsight[]>();
  readonly activities = input.required<PlatformActivityItem[]>();

  readonly viewAllSchools = output<void>();
  readonly viewFullInsights = output<void>();
  readonly viewAllActivities = output<void>();
  readonly selectSchool = output<AttentionSchool>();
}
