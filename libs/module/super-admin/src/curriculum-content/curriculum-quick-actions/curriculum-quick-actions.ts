import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-hub-curriculum-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-quick-actions.html',
  styleUrls: ['./curriculum-quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumQuickActionsComponent {
  readonly pendingReviewCount = input<number>(214);
  readonly missingAssetsCount = input<number>(96);

  readonly createPack = output<void>();
  readonly assignTemplate = output<void>();
  readonly reviewQueue = output<void>();
  readonly missingAssets = output<void>();
}
