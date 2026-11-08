import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { SupportHelpItem } from '../../data/teacher-settings.data';

@Component({
  selector: 'school-hub-support-help-card',
  imports: [],
  templateUrl: './support-help-card.html',
  styleUrl: './support-help-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportHelpCardComponent {
  readonly items = input.required<SupportHelpItem[]>();
  readonly itemSelected = output<SupportHelpItem>();

  readonly activeModal = signal<string | null>(null);

  onItemClick(item: SupportHelpItem): void {
    this.activeModal.set(item.id);
    this.itemSelected.emit(item);
  }

  closeModal(): void {
    this.activeModal.set(null);
  }
}
