import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {
  LocalVideoComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { ClassMedia } from '../class-media';
@Component({
  selector: 'school-hub-class-connection-check',
  imports: [LocalVideoComponent, StatusBadgeComponent],
  templateUrl: './connection-check.html',
  styleUrl: './connection-check.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConnectionCheckComponent {
  protected readonly media = inject(ClassMedia);
  constructor() {
    inject(DestroyRef).onDestroy(() => this.media.stop());
  }
}
