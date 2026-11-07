import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogPanelComponent } from '@school-hub/ui-elements';
import { ResourceStore } from '../resource-store';
@Component({
  selector: 'school-hub-resource-download-connection',
  imports: [RouterLink, DialogPanelComponent],
  templateUrl: './download-connection.html',
  styleUrl: './download-connection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDownloadConnectionComponent {
  protected readonly store = inject(ResourceStore);
  constructor() {
    inject(DestroyRef).onDestroy(() => this.store.connectionPrompt.set(null));
  }
}
