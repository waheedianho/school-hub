import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchoolAdminLayoutComponent } from './school-admin-layout';
import { SCHOOL_ADMIN_PAGES } from './school-admin-pages.config';

describe('SchoolAdminLayoutComponent', () => {
  let component: SchoolAdminLayoutComponent;
  let fixture: ComponentFixture<SchoolAdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAdminLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolAdminLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide all 14 official sidebar items matching the design', () => {
    expect(component.sidebarSections.length).toBe(1);
    expect(component.sidebarSections[0].items.length).toBe(14);
    expect(component.sidebarSections[0].heading).toBe('School Admin');
  });

  it('should configure admin user profile correctly', () => {
    expect(component.adminUser.name).toBe('School Admin');
    expect(component.adminUser.role).toBe('Super Admin');
    expect(component.adminUser.profileRoute).toBe('/school-admin/settings');
  });

  it('should have all sidebar routes properly prefixed with /school-admin/', () => {
    component.sidebarSections[0].items.forEach((item, index) => {
      expect(item.route).toBe(
        `/school-admin/${SCHOOL_ADMIN_PAGES[index].path}`,
      );
    });
  });
});
