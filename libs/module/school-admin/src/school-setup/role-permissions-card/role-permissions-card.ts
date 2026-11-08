import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionRow } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-role-permissions-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-permissions-card.html',
  styleUrls: ['./role-permissions-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolePermissionsCardComponent {
  readonly permissions = input.required<RolePermissionRow[]>();
  readonly togglePermission = output<{
    role: string;
    field: keyof Omit<RolePermissionRow, 'role'>;
  }>();

  onToggle(role: string, field: keyof Omit<RolePermissionRow, 'role'>): void {
    this.togglePermission.emit({ role, field });
  }
}
