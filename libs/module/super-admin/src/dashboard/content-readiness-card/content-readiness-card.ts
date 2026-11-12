import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentReadinessSummary } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-content-readiness-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-readiness-card.html',
  styleUrl: './content-readiness-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentReadinessCardComponent {
  readonly data = input.required<ContentReadinessSummary>();
}
