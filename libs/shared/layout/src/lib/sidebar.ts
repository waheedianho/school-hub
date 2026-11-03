import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarSection, SidebarMenuItem } from './sidebar-menu.model';

@Component({
  selector: 'school-hub-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent {
  /** Menu sections driven by the portal that uses this component */
  @Input() sections: SidebarSection[] = [];

  /** Logo text — configurable per school via white-labelling */
  @Input() logoText = 'SchoolHub';

  /** Logo icon path */
  @Input() logoIcon = 'images/logo-icon.svg';

  /** Sidebar theme variant: 'light' (student) or 'dark' (admin/teacher) */
  @Input() theme: 'light' | 'dark' = 'light';

  // Accordion state — supports 3 nesting levels (matches Trezo template)
  openSectionIndex = -1;
  openSectionIndex2 = -1;

  toggleSection(index: number): void {
    this.openSectionIndex = this.openSectionIndex === index ? -1 : index;
    // reset child accordion
    this.openSectionIndex2 = -1;
  }

  isSectionOpen(index: number): boolean {
    return this.openSectionIndex === index;
  }

  toggleSection2(index: number): void {
    this.openSectionIndex2 = this.openSectionIndex2 === index ? -1 : index;
  }

  isSectionOpen2(index: number): boolean {
    return this.openSectionIndex2 === index;
  }
}
