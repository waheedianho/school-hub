import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { SuperAdmin } from './super-admin';
import { SuperAdminLayoutComponent } from './super-admin-layout';
import { SUPER_ADMIN_PAGES } from './super-admin-pages.config';

describe('SuperAdmin', () => {
  let component: SuperAdmin;
  let fixture: ComponentFixture<SuperAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdmin],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ page: SUPER_ADMIN_PAGES[0] }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('SuperAdminLayoutComponent', () => {
  let component: SuperAdminLayoutComponent;
  let fixture: ComponentFixture<SuperAdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperAdminLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create layout component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 13 official navigation items configured in sidebar', () => {
    expect(component.sidebarSections.length).toBeGreaterThan(0);
    const totalItems = component.sidebarSections.reduce(
      (sum, s) => sum + s.items.length,
      0,
    );
    expect(totalItems).toBe(13);
  });
});
