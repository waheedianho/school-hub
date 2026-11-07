import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'school-hub-session-controls-bar',
  templateUrl: './session-controls-bar.html',
  styleUrl: './session-controls-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionControlsBarComponent {
  readonly micOn = signal(true);
  readonly cameraOn = signal(false);
  readonly screenSharing = signal(false);
  readonly whiteboardActive = signal(true);
  readonly handRaised = signal(false);

  readonly toggleAction = output<string>();

  toggleMic(): void {
    this.micOn.update((m) => !m);
    this.toggleAction.emit(this.micOn() ? 'mic-on' : 'mic-off');
  }

  toggleCamera(): void {
    this.cameraOn.update((c) => !c);
    this.toggleAction.emit(this.cameraOn() ? 'camera-on' : 'camera-off');
  }

  toggleScreenShare(): void {
    this.screenSharing.update((s) => !s);
    this.toggleAction.emit(
      this.screenSharing() ? 'screen-share-on' : 'screen-share-off',
    );
  }

  toggleWhiteboard(): void {
    this.whiteboardActive.update((w) => !w);
    this.toggleAction.emit(
      this.whiteboardActive() ? 'whiteboard-on' : 'whiteboard-off',
    );
  }

  toggleHand(): void {
    this.handRaised.update((h) => !h);
    this.toggleAction.emit(this.handRaised() ? 'hand-up' : 'hand-down');
  }

  stopSharing(): void {
    this.screenSharing.set(false);
    this.whiteboardActive.set(false);
    this.toggleAction.emit('stop-sharing');
  }
}
