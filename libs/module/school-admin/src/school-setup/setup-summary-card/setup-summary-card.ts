import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolProfile } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-setup-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup-summary-card.html',
  styleUrls: ['./setup-summary-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupSummaryCardComponent {
  readonly profile = input.required<SchoolProfile>();

  // Circular gauge calculations
  readonly radius = 45;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly strokeDashoffset = computed(() => {
    const pct = this.profile().setupCompletionPercentage;
    return this.circumference - (pct / 100) * this.circumference;
  });
}
