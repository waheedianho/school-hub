import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionSpread } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-region-spread-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './region-spread-card.html',
  styleUrls: ['./region-spread-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionSpreadCardComponent {
  readonly regions = input.required<RegionSpread[]>();
}
