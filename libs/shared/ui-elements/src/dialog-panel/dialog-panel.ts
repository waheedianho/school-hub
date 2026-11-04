import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'school-hub-dialog-panel',
  templateUrl: './dialog-panel.html',
  styleUrl: './dialog-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPanelComponent {
  readonly title = input.required<string>();
  readonly open = input(false);
  readonly dismissed = output<void>();
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect(() => {
      const dialog = this.dialog()?.nativeElement;
      const open = this.open();
      if (!this.browser || !dialog) return;
      if (open && !dialog.open) dialog.showModal();
      if (!open && dialog.open) dialog.close();
    });
  }

  protected onCancel(event: Event): void {
    event.preventDefault();
    this.dismissed.emit();
  }
}
