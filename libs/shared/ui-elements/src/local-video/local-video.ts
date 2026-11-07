import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
@Component({
  selector: 'school-hub-local-video',
  template:
    '<video #video autoplay muted playsinline [attr.aria-label]="label()"></video>',
  styles: [
    ':host { display: block; width: 100%; height: 100%; background: #253244; } video { display: block; width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalVideoComponent {
  readonly stream = input<MediaStream | null>(null);
  readonly label = input('Your local camera preview');
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  constructor() {
    effect(() => {
      const video = this.video()?.nativeElement;
      const stream = this.stream();
      if (this.browser && video) {
        video.srcObject = stream;
        if (stream) void video.play().catch(() => undefined);
      }
    });
  }
}
