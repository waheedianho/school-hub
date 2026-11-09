import {
  SCHOOL_ADMIN_PAGES,
  getSchoolAdminPage,
} from './school-admin-pages.config';
import { schoolAdminRoutes } from './school-admin.routes';

describe('SchoolAdmin Pages & Routes Configuration', () => {
  it('should define exactly 14 official portal pages', () => {
    expect(SCHOOL_ADMIN_PAGES.length).toBe(14);
  });

  it('should have unique paths for all pages', () => {
    const paths = SCHOOL_ADMIN_PAGES.map((p) => p.path);
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(paths.length);
  });

  it('should have labels, icons, and descriptions for every page', () => {
    for (const page of SCHOOL_ADMIN_PAGES) {
      expect(page.path).toBeTruthy();
      expect(page.label).toBeTruthy();
      expect(page.icon).toBeTruthy();
      expect(page.description).toBeTruthy();
    }
  });

  it('should correctly retrieve pages using getSchoolAdminPage', () => {
    const dashboard = getSchoolAdminPage('dashboard');
    expect(dashboard).toBeDefined();
    expect(dashboard?.label).toBe('Dashboard');

    const nonExistent = getSchoolAdminPage('unknown-page');
    expect(nonExistent).toBeUndefined();
  });

  it('should register routes for all 14 pages and necessary aliases', () => {
    const layoutRoute = schoolAdminRoutes[0];
    expect(layoutRoute).toBeDefined();
    expect(layoutRoute.children).toBeDefined();

    const registeredPaths = layoutRoute.children?.map((r) => r.path) ?? [];
    for (const page of SCHOOL_ADMIN_PAGES) {
      expect(registeredPaths).toContain(page.path);
    }
    // Verify aliases
    expect(registeredPaths).toContain('classes');
    expect(registeredPaths).toContain('teachers');
    expect(registeredPaths).toContain('curriculum');
    expect(registeredPaths).toContain('gradebook');
  });
});
