import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SidebarSection } from './sidebar-menu.model';

@Component({
  selector: 'school-hub-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
})
export class ShellComponent {
  /** Menu sections passed down to sidebar */
  @Input() sidebarSections: SidebarSection[] = [];

  /** Logo text for white-labelling */
  @Input() logoText = 'SchoolHub';

  /** Logo icon path */
  @Input() logoIcon = 'images/logo-icon.svg';

  /** Sidebar theme variant */
  @Input() sidebarTheme: 'light' | 'dark' = 'light';

  isSidebarHidden = false;

  onToggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
