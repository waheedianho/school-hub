import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PermissionTemplate,
  RolePermissionMatrixItem,
} from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-roles-permissions-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-permissions-view.html',
  styleUrl: './roles-permissions-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesPermissionsViewComponent {
  readonly templates = input.required<PermissionTemplate[]>();
  readonly matrix = input.required<RolePermissionMatrixItem[]>();

  readonly createRole = output<void>();
  readonly editTemplate = output<PermissionTemplate>();

  getRoleToneBg(tone: string): string {
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
}
