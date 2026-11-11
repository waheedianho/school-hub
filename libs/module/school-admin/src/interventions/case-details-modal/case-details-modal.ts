import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-interventions-case-details-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './case-details-modal.html',
  styleUrls: ['./case-details-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseDetailsModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly selectedCase = this.store.selectedInterventionCase;

  readonly progressValue = signal<number>(0);

  constructor() {
    effect(() => {
      const current = this.selectedCase();
      if (current) {
        this.progressValue.set(current.progress);
      }
    });
  }

  onClose(): void {
    this.store.closeInterventionDetails();
  }

  onProgressChange(value: number | string): void {
    const num = Math.min(100, Math.max(0, Number(value) || 0));
    this.progressValue.set(num);
  }

  onSaveProgress(): void {
    const current = this.selectedCase();
    if (!current) return;
    this.store.updateInterventionProgress(current.id, this.progressValue());
  }

  onResolve(): void {
    const current = this.selectedCase();
    if (!current) return;
    this.store.resolveInterventionCase(current.id);
  }
}
