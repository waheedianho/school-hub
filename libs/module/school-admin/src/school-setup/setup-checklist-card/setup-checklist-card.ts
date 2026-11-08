import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupChecklistItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-setup-checklist-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup-checklist-card.html',
  styleUrls: ['./setup-checklist-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupChecklistCardComponent {
  readonly checklist = input.required<SetupChecklistItem[]>();
  readonly itemToggle = output<string>();

  onItemClick(id: string): void {
    this.itemToggle.emit(id);
  }
}
