import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeguardingNotice } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-safeguarding-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './safeguarding-banner.html',
  styleUrl: './safeguarding-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingBannerComponent {
  readonly notice = input.required<SafeguardingNotice>();
}
