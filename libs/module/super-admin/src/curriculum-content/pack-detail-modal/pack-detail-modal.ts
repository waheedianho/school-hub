import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CurriculumPack,
  CurriculumStatus,
} from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-pack-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pack-detail-modal.html',
  styleUrls: ['./pack-detail-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackDetailModalComponent {
  readonly pack = input.required<CurriculumPack>();

  readonly modalClose = output<void>();
  readonly edit = output<CurriculumPack>();
  readonly statusChange = output<{ id: string; status: CurriculumStatus }>();
  readonly delete = output<string>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.modalClose.emit();
  }
}
