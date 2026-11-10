import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TeachersStaffComponent } from './teachers-staff';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('TeachersStaffComponent', () => {
  let component: TeachersStaffComponent;
  let fixture: ComponentFixture<TeachersStaffComponent>;
  let router: Router;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersStaffComponent],
      providers: [
        SchoolAdminStore,
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersStaffComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render header, metrics, tabs, directory, sidebar, and actions', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Teachers & Staff',
    );
    expect(
      compiled.querySelector('school-hub-teachers-summary-metrics'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-teacher-directory')).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-staff-overview-sidebar'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-staff-quick-actions'),
    ).toBeTruthy();
    expect(compiled.querySelector('.footer-banner')).toBeTruthy();
  });

  it('should switch tabs', () => {
    component.setTab('support');
    expect(store.activeStaffTab()).toBe('support');

    component.setTab('permissions');
    expect(store.activeStaffTab()).toBe('permissions');
  });

  it('should navigate to add staff view', () => {
    component.navigateToAddStaff();
    expect(router.navigate).toHaveBeenCalledWith([
      '/school-admin/teachers-staff/add',
    ]);
  });

  it('should handle bulk import and dismiss notification', () => {
    component.onBulkImport();
    expect(store.setupSaveStatus()).toContain('Bulk Staff Import');

    component.dismissNotification();
    expect(store.setupSaveStatus()).toBeNull();
  });
});
