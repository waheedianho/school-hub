import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
  inject,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export interface MediaSeek {
  seconds: number;
  token: number;
}
@Component({
  selector: 'school-hub-media-player',
  templateUrl: './media-player.html',
  styleUrl: './media-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerComponent {
  readonly src = input.required<string>();
  readonly poster = input.required<string>();
  readonly captions = input.required<string>();
  readonly title = input.required<string>();
  readonly initialPosition = input(0);
  readonly seek = input<MediaSeek | null>(null);
  readonly progressed = output<number>();
  protected readonly loaded = signal(false);
  protected readonly failed = signal(false);
  protected readonly rate = signal(1);
  protected readonly captionId = computed(
    () => 'captions-' + this.src().split('/').pop(),
  );
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  constructor() {
    const browser = isPlatformBrowser(inject(PLATFORM_ID));
    inject(DestroyRef).onDestroy(() => {
      const video = this.video()?.nativeElement;
      if (browser && video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    });
    effect(() => {
      const seek = this.seek(),
        video = this.video()?.nativeElement;
      if (seek && video && video.readyState >= 1) this.jump(seek.seconds);
    });
    effect(() => {
      this.src();
      this.loaded.set(false);
      this.failed.set(false);
      this.rate.set(1);
    });
  }
  protected metadata(): void {
    this.loaded.set(true);
    const video = this.video()?.nativeElement;
    if (video) video.playbackRate = 1;
    if (this.seek() || this.initialPosition() > 0)
      this.jump(this.seek()?.seconds ?? this.initialPosition());
  }
  protected progress(): void {
    const video = this.video()?.nativeElement;
    if (video && this.loaded()) this.progressed.emit(video.currentTime);
  }
  protected speed(event: Event): void {
    const rate = Number((event.target as HTMLSelectElement).value),
      video = this.video()?.nativeElement;
    if (video && [0.75, 1, 1.25, 1.5, 2].includes(rate)) {
      video.playbackRate = rate;
      this.rate.set(rate);
    }
  }
  private jump(seconds: number): void {
    const video = this.video()?.nativeElement;
    if (video && Number.isFinite(video.duration) && Number.isFinite(seconds))
      video.currentTime = Math.min(Math.max(0, seconds), video.duration);
  }
}
