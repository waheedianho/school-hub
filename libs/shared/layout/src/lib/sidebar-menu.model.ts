/**
 * Sidebar menu model — data-driven structure for white-labelling.
 * Each portal (student, teacher, school-admin, super-admin) provides
 * its own SidebarMenuItem[] to the SidebarComponent via input.
 */
export interface SidebarMenuItem {
  /** Display label */
  label: string;
  /** Material Symbols icon name */
  icon?: string;
  /** Router link (leaf items) */
  route?: string;
  /** Children items (accordion parent) */
  children?: SidebarMenuItem[];
  /** Optional badge (e.g. "3", "New", "Hot") */
  badge?: string;
  /** Badge color class (e.g. 'text-orange-500 bg-orange-100') */
  badgeClass?: string;
}

export interface SidebarSection {
  /** Section heading (e.g. "Main", "Apps & Pages") */
  heading: string;
  /** Items in this section */
  items: SidebarMenuItem[];
}
