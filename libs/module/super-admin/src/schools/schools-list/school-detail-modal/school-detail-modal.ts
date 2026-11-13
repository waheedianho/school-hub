import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolInstitution } from '../../../data/super-admin-schools.models';

@Component({
  selector: 'school-hub-school-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-detail-modal.html',
  styleUrl: './school-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolDetailModalComponent {
  readonly school = input.required<SchoolInstitution>();
  readonly closeModal = output<void>();
  readonly editSchool = output<SchoolInstitution>();
  readonly manageSubscription = output<SchoolInstitution>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onEdit(): void {
    this.editSchool.emit(this.school());
  }

  onManageSubscription(): void {
    this.manageSubscription.emit(this.school());
  }
}
