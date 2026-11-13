import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccessActivity,
  PermissionTemplate,
  RoleDistribution,
} from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-users-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-sidebar.html',
  styleUrl: './users-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersSidebarComponent {
  readonly roleDistribution = input.required<RoleDistribution>();
  readonly permissionTemplates = input.required<PermissionTemplate[]>();
  readonly recentActivities = input.required<AccessActivity[]>();

  readonly manageRolePermissions = output<void>();
  readonly viewAllActivity = output<void>();
  readonly templateSelected = output<PermissionTemplate>();

  getTemplateToneBg(tone: string): string {
    switch (tone) {
      case 'primary':
        return 'bg-blue-50 text-blue-600';
      case 'warning':
        return 'bg-amber-50 text-amber-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'success':
        return 'bg-emerald-50 text-emerald-600';
      case 'danger':
        return 'bg-rose-50 text-rose-600';
      default:
        return 'bg-slate-50 text-slate-600';
    }
  }

  onSelectTemplate(tpl: PermissionTemplate): void {
    this.templateSelected.emit(tpl);
  }
}
