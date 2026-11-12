import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SafeguardingAlert } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-safeguarding-alerts-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './safeguarding-alerts-card.html',
  styleUrl: './safeguarding-alerts-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingAlertsCardComponent {
  readonly alerts = input.required<SafeguardingAlert[]>();
  readonly dismiss = output<string>();

  getSeverityBadgeClass(severity: string): string {
    switch (severity) {
      case 'High':
      case 'Critical':
        return 'badge-high';
      case 'Medium':
        return 'badge-medium';
      case 'Low':
        return 'badge-low';
      default:
        return 'badge-neutral';
    }
  }

  getIconClass(severity: string): string {
    switch (severity) {
      case 'High':
      case 'Critical':
        return 'icon-high';
      case 'Medium':
        return 'icon-medium';
      case 'Low':
        return 'icon-low';
      default:
        return 'icon-neutral';
    }
  }
}
