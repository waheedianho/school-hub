import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-interventions-insights-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights-cards.html',
  styleUrls: ['./insights-cards.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterventionsInsightsCardsComponent {
  readonly store = inject(SchoolAdminStore);
  readonly insights = this.store.interventionsInsights;

  getStrokeDashoffset(percentage: number): number {
    const circumference = 2 * Math.PI * 30; // r = 30 -> 188.495
    return circumference - (percentage / 100) * circumference;
  }
}
