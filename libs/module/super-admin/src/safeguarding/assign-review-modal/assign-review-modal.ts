import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeguardingCase } from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-assign-review-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-review-modal.html',
  styleUrl: './assign-review-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignReviewModalComponent implements OnInit {
  readonly cases = input.required<SafeguardingCase[]>();
  readonly preselectedCaseId = input<string | null>(null);

  readonly closeModal = output<void>();
  readonly assigned = output<{
    caseId: string;
    reviewerName: string;
    reviewerRole: string;
    notes?: string;
  }>();

  readonly selectedCaseId = signal<string>('');
  readonly selectedReviewer = signal<string>('Rahul Mehta');
  readonly selectedRole = signal<string>('Safeguarding Lead');
  readonly assignmentNotes = signal<string>('');

  ngOnInit(): void {
    const preId = this.preselectedCaseId();
    if (preId) {
      this.selectedCaseId.set(preId);
    } else if (this.cases().length > 0) {
      this.selectedCaseId.set(this.cases()[0].id);
    }
  }

  onReviewerChange(event: Event): void {
    const name = (event.target as HTMLSelectElement).value;
    this.selectedReviewer.set(name);
    if (name === 'Rahul Mehta' || name === 'Arjun Kapoor') {
      this.selectedRole.set('Safeguarding Lead');
    } else {
      this.selectedRole.set('Compliance Officer');
    }
  }

  onSubmit(): void {
    if (!this.selectedCaseId() || !this.selectedReviewer()) return;

    this.assigned.emit({
      caseId: this.selectedCaseId(),
      reviewerName: this.selectedReviewer(),
      reviewerRole: this.selectedRole(),
      notes: this.assignmentNotes(),
    });
    this.closeModal.emit();
  }
}
