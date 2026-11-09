import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchoolAlert } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-admin-alerts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-alerts.html',
  styleUrl: './admin-alerts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAlertsComponent {
  readonly alerts = input.required<SchoolAlert[]>();
  readonly dismiss = output<string>();

  get totalCount(): number {
    return this.alerts().reduce((acc, a) => acc + (a.count > 0 ? 1 : 0), 0);
  }
}
