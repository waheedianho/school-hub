export interface ThemeConfig {
  primaryColor: string;
  secondaryColor?: string;
  sidebarBackground?: string;
  sidebarTextColor?: string;
  headerBackground?: string;
  fontFamily?: string;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primaryColor: '#605DFF', // Trezo default primary
  secondaryColor: '#3584e4',
  fontFamily: 'Inter, sans-serif',
};
