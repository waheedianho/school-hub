import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'school-hub-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
})
export class HeaderComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

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
