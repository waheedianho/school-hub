import {
  DestroyRef,
  Injectable,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClassMedia {
  readonly audio = signal<MediaStream | null>(null);
  readonly video = signal<MediaStream | null>(null);
  readonly audioBusy = signal(false);
  readonly videoBusy = signal(false);
  readonly error = signal('');
  readonly online = signal<boolean | undefined>(undefined);
  readonly supported = signal(false);
  readonly secure = signal(false);
  readonly callSupported = signal(false);
  private audioVersion = 0;
  private videoVersion = 0;
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.check();
      const check = () => this.check();
      const stop = () => this.stop();
      window.addEventListener('online', check);
      window.addEventListener('offline', check);
      window.addEventListener('pagehide', stop);
      destroy.onDestroy(() => {
        this.stop();
        window.removeEventListener('online', check);
        window.removeEventListener('offline', check);
        window.removeEventListener('pagehide', stop);
      });
    });
  }
  check(): void {
    this.online.set(navigator.onLine);
    this.secure.set(window.isSecureContext);
    this.supported.set(!!navigator.mediaDevices?.getUserMedia);
    this.callSupported.set(typeof RTCPeerConnection !== 'undefined');
  }
  async toggle(kind: 'audio' | 'video'): Promise<void> {
    const stream = kind === 'audio' ? this.audio : this.video;
    const busy = kind === 'audio' ? this.audioBusy : this.videoBusy;
    if (busy()) return;
    this.error.set('');
    if (stream()) {
      stream()
        ?.getTracks()
        .forEach((track) => track.stop());
      stream.set(null);
      return;
    }
    if (!this.supported()) {
      this.error.set(
        'Camera and microphone preview are unavailable in this browser.',
      );
      return;
    }
    const version =
      kind === 'audio' ? ++this.audioVersion : ++this.videoVersion;
    busy.set(true);
    try {
      const result = await navigator.mediaDevices.getUserMedia({
        audio: kind === 'audio',
        video: kind === 'video',
      });
      if (
        version !== (kind === 'audio' ? this.audioVersion : this.videoVersion)
      )
        result.getTracks().forEach((track) => track.stop());
      else stream.set(result);
    } catch {
      if (
        version === (kind === 'audio' ? this.audioVersion : this.videoVersion)
      )
        this.error.set(
          `${kind === 'audio' ? 'Microphone' : 'Camera'} preview could not start. Check your browser permission and device settings.`,
        );
    } finally {
      if (
        version === (kind === 'audio' ? this.audioVersion : this.videoVersion)
      )
        busy.set(false);
    }
  }
  stop(): void {
    ++this.audioVersion;
    ++this.videoVersion;
    for (const stream of [this.audio(), this.video()])
      stream?.getTracks().forEach((track) => track.stop());
    this.audio.set(null);
    this.video.set(null);
    this.audioBusy.set(false);
    this.videoBusy.set(false);
  }
}
