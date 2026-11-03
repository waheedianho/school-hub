import { Injectable, Inject, DOCUMENT } from '@angular/core';
import { ThemeConfig, DEFAULT_THEME_CONFIG } from './theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentConfig: ThemeConfig = { ...DEFAULT_THEME_CONFIG };

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Set the entire theme configuration.
   * Useful for white-labelling when a school logs in.
   */
  setTheme(config: Partial<ThemeConfig>) {
    this.currentConfig = { ...this.currentConfig, ...config };
    this.applyTheme();
  }

  /**
   * Update a specific CSS variable
   */
  setVariable(name: string, value: string) {
    this.document.documentElement.style.setProperty(name, value);
  }

  /**
   * Applies the current configuration to the DOM as CSS variables.
   */
  private applyTheme() {
    const root = this.document.documentElement;

    if (this.currentConfig.primaryColor) {
      root.style.setProperty(
        '--primary-color',
        this.currentConfig.primaryColor,
      );
    }
    if (this.currentConfig.secondaryColor) {
      root.style.setProperty(
        '--secondary-color',
        this.currentConfig.secondaryColor,
      );
    }
    if (this.currentConfig.sidebarBackground) {
      root.style.setProperty(
        '--sidebar-bg',
        this.currentConfig.sidebarBackground,
      );
    }
    if (this.currentConfig.sidebarTextColor) {
      root.style.setProperty(
        '--sidebar-text',
        this.currentConfig.sidebarTextColor,
      );
    }
    if (this.currentConfig.headerBackground) {
      root.style.setProperty(
        '--header-bg',
        this.currentConfig.headerBackground,
      );
    }
    if (this.currentConfig.fontFamily) {
      root.style.setProperty('--font-family', this.currentConfig.fontFamily);
    }
  }

  /**
   * Enable dark mode globally (if applicable)
   */
  toggleDarkMode(isDark: boolean) {
    const root = this.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
