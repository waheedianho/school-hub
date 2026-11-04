import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChildren,
} from '@angular/core';

export interface FilterTab {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

@Component({
  selector: 'school-hub-filter-tabs',
  templateUrl: './filter-tabs.html',
  styleUrl: './filter-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTabsComponent {
  readonly tabs = input.required<readonly FilterTab[]>();
  readonly active = input.required<string>();
  readonly panelId = input.required<string>();
  readonly label = input('Filter results');
  readonly changed = output<string>();
  private readonly buttons =
    viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.tabs().length - 1;
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % (last + 1),
      ArrowLeft: (index + last) % (last + 1),
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    this.changed.emit(this.tabs()[next].id);
    this.buttons()[next].nativeElement.focus();
  }
}
