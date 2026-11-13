import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  QuickReportTemplate,
  RecentReportActivity,
  ReportHealthCategory,
  ScheduledReportQueueItem,
} from '../../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-reports-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-sidebar.html',
  styleUrls: ['./reports-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSidebarComponent {
  readonly healthCategories = input.required<ReportHealthCategory[]>();
  readonly scheduledQueue = input.required<ScheduledReportQueueItem[]>();
  readonly recentActivity = input.required<RecentReportActivity[]>();
  readonly quickTemplates = input.required<QuickReportTemplate[]>();
  readonly selectedPeriod = input.required<string>();

  readonly periodChange = output<string>();
  readonly viewAllScheduled = output<void>();
  readonly viewAllActivity = output<void>();
  readonly viewAllTemplates = output<void>();
  readonly templateSelected = output<QuickReportTemplate>();

  readonly periodsList = [
    'This Month',
    'Last Month',
    'This Quarter',
    'Year to Date',
  ];

  get totalHealthCount(): number {
    return this.healthCategories().reduce((sum, item) => sum + item.count, 0);
  }

  getStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 38; // r=38 -> ~238.76
    const stroke = (percentage / 100) * circumference;
    const gap = circumference - stroke;
    return `${stroke.toFixed(1)} ${gap.toFixed(1)}`;
  }

  getStrokeOffset(index: number): number {
    const circumference = 2 * Math.PI * 38;
    let accumulated = 0;
    for (let i = 0; i < index; i++) {
      accumulated += this.healthCategories()[i].percentage;
    }
    return -(accumulated / 100) * circumference;
  }

  onPeriodSelect(period: string): void {
    this.periodChange.emit(period);
  }

  onSelectTemplate(tmpl: QuickReportTemplate): void {
    this.templateSelected.emit(tmpl);
  }
}
