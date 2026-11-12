import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevenueSummary } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-revenue-summary-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './revenue-summary-card.html',
  styleUrl: './revenue-summary-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenueSummaryCardComponent {
  readonly data = input.required<RevenueSummary>();
}
