import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffOverviewSidebarComponent } from './staff-overview-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('StaffOverviewSidebarComponent', () => {
  let component: StaffOverviewSidebarComponent;
  let fixture: ComponentFixture<StaffOverviewSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffOverviewSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffOverviewSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render selected staff overview', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      'Staff Overview',
    );
    expect(compiled.textContent).toContain('Mrs. Fatima Yusuf');
    expect(compiled.textContent).toContain('Senior Teacher');
    expect(compiled.textContent).toContain('English Department');
    expect(compiled.textContent).toContain('Active Lessons (This Week)');
    expect(compiled.textContent).toContain('Pending Submissions to Review');
    expect(compiled.textContent).toContain('Feedback Completion Rate');
    expect(compiled.textContent).toContain('92%');
  });

  it('should render operational alert items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const alerts = compiled.querySelectorAll('.alert-item');
    expect(alerts.length).toBe(3);
    expect(compiled.textContent).toContain(
      'Teachers pending subject assignment',
    );
    expect(compiled.textContent).toContain('Teachers with overdue reviews');
    expect(compiled.textContent).toContain('Staff needing admin follow-up');
  });

  it('should trigger alert action click', () => {
    const alert = store.staffAlerts()[0];
    component.onAlertAction(alert);
    expect(store.staffStatusFilter()).toBe('Pending Assignment');
  });
});
