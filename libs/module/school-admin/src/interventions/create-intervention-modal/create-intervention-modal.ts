import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { NewInterventionPlanFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-interventions-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-intervention-modal.html',
  styleUrls: ['./create-intervention-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInterventionModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isCreateInterventionModalOpen;

  readonly formData = signal<NewInterventionPlanFormData>({
    learnerName: '',
    admissionNo: '',
    className: 'JSS 1A',
    concernArea: 'Mathematics Weak Performance',
    interventionType: 'Small Group Remediation',
    assignedStaff: 'Mr. Adekunle J.',
    assignedStaffRole: 'Maths Teacher',
    priority: 'High',
    nextReviewDate: '30 May 2025',
    notes: '',
  });

  onClose(): void {
    this.store.closeCreateInterventionModal();
  }

  updateField<K extends keyof NewInterventionPlanFormData>(
    field: K,
    value: NewInterventionPlanFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.learnerName || !data.admissionNo) return;
    this.store.createInterventionPlan(data);
  }
}
