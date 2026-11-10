import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherDirectoryComponent } from './teacher-directory';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('TeacherDirectoryComponent', () => {
  let component: TeacherDirectoryComponent;
  let fixture: ComponentFixture<TeacherDirectoryComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDirectoryComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherDirectoryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render directory table with teachers', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.directory-title')?.textContent).toContain(
      'Teacher Directory',
    );

    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(compiled.textContent).toContain('Mrs. Fatima Yusuf');
    expect(compiled.textContent).toContain('TCH-1001');
    expect(compiled.textContent).toContain('Senior Teacher');
  });

  it('should filter teachers on search', () => {
    component.onSearch('Tunde');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mr. Tunde Adewale');
    expect(compiled.textContent).not.toContain('Mrs. Fatima Yusuf');

    component.clearFilters();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Mrs. Fatima Yusuf');
  });

  it('should select staff on row click', () => {
    const staff2 = store.staff()[1];
    component.onSelectStaff(staff2);
    expect(store.selectedStaffId()).toBe(staff2.id);
  });

  it('should toggle all rows selection', () => {
    component.toggleSelectAll();
    expect(component.selectedAll()).toBe(true);
    expect(component.selectedStaffIds().size).toBeGreaterThan(0);

    component.toggleSelectAll();
    expect(component.selectedAll()).toBe(false);
    expect(component.selectedStaffIds().size).toBe(0);
  });

  it('should handle pagination changes', () => {
    component.onPageChange(2);
    expect(store.staffPage()).toBe(2);

    component.onPageSizeChange(10);
    expect(store.staffPageSize()).toBe(10);
  });
});
