import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemHealthItem } from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-system-health-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-health-modal.html',
  styleUrl: './system-health-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemHealthModalComponent {
  readonly isOpen = input<boolean>(false);
  readonly healthItems = input.required<SystemHealthItem[]>();

  readonly closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
