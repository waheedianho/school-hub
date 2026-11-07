import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  DashboardCardComponent,
  ProgressBarComponent,
} from '@school-hub/ui-elements';
import {
  calculateStoragePercentage,
  formatStorageSize,
} from '../settings-engine';

@Component({
  selector: 'school-hub-settings-storage-card',
  imports: [DashboardCardComponent, ProgressBarComponent],
  templateUrl: './storage-card.html',
  styleUrl: './storage-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class StorageCardComponent {
  readonly storageUsedBytes = input<number>(0);
  readonly storageTotalBytes = input<number>(0);
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly manageRequested = output<void>();

  readonly storageFormatted = computed(() =>
    formatStorageSize(this.storageUsedBytes()),
  );
  readonly totalStorageFormatted = computed(() =>
    formatStorageSize(this.storageTotalBytes()),
  );
  readonly storagePct = computed(() =>
    calculateStoragePercentage(
      this.storageUsedBytes(),
      this.storageTotalBytes(),
    ),
  );
}
