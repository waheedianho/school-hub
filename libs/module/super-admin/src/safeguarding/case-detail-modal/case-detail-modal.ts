import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SafeguardingCase,
  SafeguardingCaseStatus,
} from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-case-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-detail-modal.html',
  styleUrl: './case-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseDetailModalComponent {
  readonly safeguardingCase = input.required<SafeguardingCase>();

  readonly closeModal = output<void>();
  readonly statusChange = output<{
    caseId: string;
    newStatus: SafeguardingCaseStatus;
  }>();
  readonly reassign = output<string>();

  onUpdateStatus(status: SafeguardingCaseStatus): void {
    this.statusChange.emit({
      caseId: this.safeguardingCase().id,
      newStatus: status,
    });
  }
}
