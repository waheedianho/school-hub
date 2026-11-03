import {
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'school-hub-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  // Button toggle state for dropdowns
  buttonStates: { [key: string]: boolean } = {
    notificationsMenuBtn: false,
    profileMenuBtn: false,
  };

  isFullscreen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
  ) {}

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
