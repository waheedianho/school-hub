import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { AssignFollowUpFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-interventions-assign-followup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-followup-modal.html',
  styleUrls: ['./assign-followup-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignFollowupModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isAssignFollowUpModalOpen;
  readonly interventions = this.store.interventions;

  readonly formData = signal<AssignFollowUpFormData>({
    caseId: 'case-001',
    learnerName: 'Adebayo, Oluwatobi',
    assignedStaff: 'Mr. Adekunle J.',
    assignedStaffRole: 'Maths Teacher',
    dueDate: '28 May 2025',
    followUpFrequency: 'Weekly',
    instructions:
      'Review learner quiz progress and worksheet submissions every Thursday.',
  });

  onClose(): void {
    this.store.closeAssignFollowUpModal();
  }

  onCaseChange(caseId: string): void {
    const found = this.interventions().find((c) => c.id === caseId);
    this.formData.update((prev) => ({
      ...prev,
      caseId,
      learnerName: found ? found.learnerName : prev.learnerName,
    }));
  }

  updateField<K extends keyof AssignFollowUpFormData>(
    field: K,
    value: AssignFollowUpFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.caseId || !data.assignedStaff || !data.dueDate) {
      return;
    }
    this.store.assignFollowUp(data);
  }
}
