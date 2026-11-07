import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}
@Component({
  selector: 'school-hub-checklist',
  templateUrl: './checklist.html',
  styleUrl: './checklist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent {
  readonly items = input.required<readonly ChecklistItem[]>();
  readonly disabled = input(false);
  readonly changed = output<{ id: string; checked: boolean }>();
  protected change(id: string, event: Event): void {
    this.changed.emit({
      id,
      checked: (event.target as HTMLInputElement).checked,
    });
  }
}
