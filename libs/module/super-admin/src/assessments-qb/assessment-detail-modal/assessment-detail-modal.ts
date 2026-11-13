import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AssessmentPack,
  AssessmentStatus,
} from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-detail-modal.html',
  styleUrls: ['./assessment-detail-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentDetailModalComponent {
  readonly pack = input.required<AssessmentPack>();

  readonly modalClose = output<void>();
  readonly edit = output<AssessmentPack>();
  readonly statusChange = output<{ id: string; status: AssessmentStatus }>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.modalClose.emit();
  }

  onUpdateStatus(status: AssessmentStatus): void {
    this.statusChange.emit({ id: this.pack().id, status });
  }

  onEdit(): void {
    this.edit.emit(this.pack());
  }
}
