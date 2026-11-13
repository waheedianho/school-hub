import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccessLogEntry } from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-access-logs-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-logs-view.html',
  styleUrl: './access-logs-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessLogsViewComponent {
  readonly logs = input.required<AccessLogEntry[]>();
  readonly exportLogs = output<void>();

  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<string>('All');

  readonly statusOptions = ['All', 'Success', 'Warning', 'Failed'];

  readonly filteredLogs = computed(() => {
    const list = this.logs();
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();

    return list.filter((log) => {
      if (status !== 'All' && log.status !== status) {
        return false;
      }
      if (query) {
        const matchName = log.userName.toLowerCase().includes(query);
        const matchEmail = log.userEmail.toLowerCase().includes(query);
        const matchAction = log.action.toLowerCase().includes(query);
        const matchIp = log.ipAddress.toLowerCase().includes(query);
        if (!matchName && !matchEmail && !matchAction && !matchIp) {
          return false;
        }
      }
      return true;
    });
  });

  onSearch(val: string): void {
    this.searchQuery.set(val);
  }

  onStatusChange(val: string): void {
    this.statusFilter.set(val);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Success':
        return 'status-success';
      case 'Warning':
        return 'status-warning';
      case 'Failed':
        return 'status-failed';
      default:
        return 'status-default';
    }
  }
}
