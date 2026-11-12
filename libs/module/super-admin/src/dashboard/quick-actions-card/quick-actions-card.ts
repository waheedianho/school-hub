import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuickActionItem } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-quick-actions-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quick-actions-card.html',
  styleUrl: './quick-actions-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsCardComponent {
  readonly actions = input.required<QuickActionItem[]>();
}
