import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHealthStatus } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-platform-health-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './platform-health-bar.html',
  styleUrl: './platform-health-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformHealthBarComponent {
  readonly health = input.required<PlatformHealthStatus>();
  readonly viewStatusPage = output<void>();

  onViewStatus(): void {
    this.viewStatusPage.emit();
  }
}
