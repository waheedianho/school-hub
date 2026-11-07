import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { SidebarSection } from '../models/sidebar-menu.model';
import { DEFAULT_HEADER_USER, HeaderUser } from '../models/header-user.model';

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
  styleUrl: './shell.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShellComponent {
  @Input() variant: 'default' | 'learner' = 'learner';
  @Input() user: HeaderUser = DEFAULT_HEADER_USER;
  /** Menu sections passed down to sidebar */
  @Input() sidebarSections: SidebarSection[] = [];

  /** Logo text for white-labelling */
  @Input() logoText = 'SchoolHub';

  /** Logo icon path */
  @Input() logoIcon = 'images/learner-logo.svg';

  /** Sidebar theme variant */
  @Input() sidebarTheme: 'light' | 'dark' = 'light';

  /** Show encouragement widget in sidebar */
  @Input() encouragement = false;

  isSidebarHidden = false;

  onToggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
