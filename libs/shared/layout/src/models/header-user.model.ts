export interface HeaderUser {
  name: string;
  role: string;
  avatarUrl: string;
  profileRoute: string;
  settingsRoute: string;
}

export const DEFAULT_HEADER_USER: HeaderUser = {
  name: 'User',
  role: 'Role',
  avatarUrl: 'images/admin.png',
  profileRoute: '/profile',
  settingsRoute: '/settings',
};
