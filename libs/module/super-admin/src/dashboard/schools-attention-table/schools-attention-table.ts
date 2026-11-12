import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SchoolAttentionItem } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-schools-attention-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './schools-attention-table.html',
  styleUrl: './schools-attention-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsAttentionTableComponent {
  readonly schools = input.required<SchoolAttentionItem[]>();
  readonly count = input<number>(6);

  getUsageDotClass(level: string): string {
    switch (level) {
      case 'High':
        return 'bg-emerald-500';
      case 'Medium':
        return 'bg-amber-500';
      case 'Low':
        return 'bg-rose-500';
      default:
        return 'bg-gray-400';
    }
  }

  getSubscriptionPillClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'pill-success';
      case 'Expiring Soon':
        return 'pill-warning';
      case 'Suspended':
        return 'pill-danger';
      case 'Trial':
        return 'pill-info';
      default:
        return 'pill-neutral';
    }
  }

  getStatusPillClass(status: string): string {
    return status === 'Action Needed' ? 'pill-action-needed' : 'pill-monitor';
  }
}
