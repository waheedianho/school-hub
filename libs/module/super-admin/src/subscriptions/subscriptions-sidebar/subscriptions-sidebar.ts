import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BillingHealth,
  PlanDistributionItem,
  RecentBillingActivity,
  RenewalQueueItem,
  RevenueOverviewCategory,
} from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-subscriptions-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions-sidebar.html',
  styleUrls: ['./subscriptions-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsSidebarComponent {
  readonly revenueOverview = input.required<RevenueOverviewCategory[]>();
  readonly renewalQueue = input.required<RenewalQueueItem[]>();
  readonly recentActivity = input.required<RecentBillingActivity[]>();
  readonly planDistribution = input.required<PlanDistributionItem[]>();
  readonly billingHealth = input.required<BillingHealth>();

  readonly viewAllRenewals = output<void>();
  readonly viewAllActivity = output<void>();

  get totalRevenueFormatted(): string {
    const total = this.revenueOverview().reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    return `$${total.toLocaleString()}`;
  }

  get totalPlansCount(): number {
    return this.planDistribution().reduce((sum, item) => sum + item.count, 0);
  }

  // SVG Donut calculation helper for Revenue Overview
  getRevenueStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 40; // r=40 -> ~251.32
    const stroke = (percentage / 100) * circumference;
    const gap = circumference - stroke;
    return `${stroke.toFixed(1)} ${gap.toFixed(1)}`;
  }

  getRevenueStrokeOffset(categoryIndex: number): number {
    const circumference = 2 * Math.PI * 40;
    let accumulatedPercentage = 0;
    for (let i = 0; i < categoryIndex; i++) {
      accumulatedPercentage += this.revenueOverview()[i].percentage;
    }
    return -(accumulatedPercentage / 100) * circumference;
  }

  // SVG Donut calculation helper for Plan Distribution
  getPlanStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 34; // r=34 -> ~213.6
    const stroke = (percentage / 100) * circumference;
    const gap = circumference - stroke;
    return `${stroke.toFixed(1)} ${gap.toFixed(1)}`;
  }

  getPlanStrokeOffset(planIndex: number): number {
    const circumference = 2 * Math.PI * 34;
    let accumulatedPercentage = 0;
    for (let i = 0; i < planIndex; i++) {
      accumulatedPercentage += this.planDistribution()[i].percentage;
    }
    return -(accumulatedPercentage / 100) * circumference;
  }

  // Gauge calculation helper for Billing Health (semi-circle gauge)
  getHealthGaugeDasharray(percentage: number): string {
    const halfCircumference = Math.PI * 45; // ~141.37
    const stroke = (percentage / 100) * halfCircumference;
    return `${stroke.toFixed(1)} 200`;
  }
}
