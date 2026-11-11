import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { CreateRoleFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-create-role-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-role-modal.html',
  styleUrls: ['./create-role-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoleModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isCreateRoleModalOpen;

  readonly formData = signal<CreateRoleFormData>({
    name: '',
    description: '',
    accessScope: 'All School',
    permissionLevel: 'Moderate Access',
    usersAssigned: 1,
    status: 'Active',
  });

  onClose(): void {
    this.store.closeCreateRoleModal();
  }

  updateField<K extends keyof CreateRoleFormData>(
    field: K,
    value: CreateRoleFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.name.trim() || !data.description.trim()) {
      return;
    }
    this.store.createRole(data);
    this.formData.set({
      name: '',
      description: '',
      accessScope: 'All School',
      permissionLevel: 'Moderate Access',
      usersAssigned: 1,
      status: 'Active',
    });
  }
}
