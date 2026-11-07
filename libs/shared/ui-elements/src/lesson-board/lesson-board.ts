import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
export interface PresentationSlide {
  id: string;
  title: string;
  definition: string;
  bullets: readonly string[];
  examples: readonly {
    lead: string;
    rest: string;
    note: string;
    leadLabel?: string;
    restLabel?: string;
  }[];
}
@Component({
  selector: 'school-hub-lesson-board',
  templateUrl: './lesson-board.html',
  styleUrl: './lesson-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonBoardComponent {
  readonly slides = input.required<readonly PresentationSlide[]>();
  readonly index = input(0);
  readonly changed = output<number>();
  readonly notice = output<string>();
  protected readonly zoom = signal(100);
  protected readonly slide = computed(() => this.slides()[this.index()]);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  protected resize(amount: number): void {
    this.zoom.update((value) => Math.max(75, Math.min(150, value + amount)));
  }
  protected async fullscreen(): Promise<void> {
    try {
      if (this.element.nativeElement.ownerDocument.fullscreenElement)
        await this.element.nativeElement.ownerDocument.exitFullscreen();
      else await this.element.nativeElement.requestFullscreen();
    } catch {
      this.notice.emit('Fullscreen is unavailable in this browser.');
    }
  }
}
