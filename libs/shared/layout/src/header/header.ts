import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DEFAULT_HEADER_USER, HeaderUser } from '../models/header-user.model';

@Component({
  selector: 'school-hub-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
})
export class HeaderComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  @Input() user: HeaderUser = DEFAULT_HEADER_USER;
  @Input() compact = false;

  @Output() toggleSidebar = new EventEmitter<void>();

  // Button toggle state for dropdowns
  buttonStates: { [key: string]: boolean } = {
    notificationsMenuBtn: false,
    profileMenuBtn: false,
  };

  isFullscreen = false;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener(
        'fullscreenchange',
        this.onFullscreenChange.bind(this),
      );
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleClass(buttonId: string): void {
    const isCurrentlyActive = this.buttonStates[buttonId];
    for (const key in this.buttonStates) {
      this.buttonStates[key] = false;
    }
    this.buttonStates[buttonId] = !isCurrentlyActive;
  }

  toggleFullscreen(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isFullscreen) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
  }

  onFullscreenChange(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isFullscreen = !!document.fullscreenElement;
    }
  }
}
