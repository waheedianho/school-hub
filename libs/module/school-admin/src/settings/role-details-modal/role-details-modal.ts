import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-role-details-modal',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './role-details-modal.html',
  styleUrls: ['./role-details-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDetailsModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly role = this.store.selectedRole;

  onClose(): void {
    this.store.closeRoleDetails();
  }
}
