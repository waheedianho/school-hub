import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
export type ClassroomAction =
  | 'mic'
  | 'camera'
  | 'hand'
  | 'reactions'
  | 'chat'
  | 'participants'
  | 'more'
  | 'leave';
@Component({
  selector: 'school-hub-classroom-toolbar',
  templateUrl: './classroom-toolbar.html',
  styleUrl: './classroom-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomToolbarComponent {
  readonly micOn = input(false);
  readonly cameraOn = input(false);
  readonly handRaised = input(false);
  readonly chatVisible = input(true);
  readonly count = input(0);
  readonly disabled = input(false);
  readonly mediaBusy = input(false);
  readonly action = output<ClassroomAction>();
}
