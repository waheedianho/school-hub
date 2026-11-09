import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminAlertsComponent } from './admin-alerts';
import { SCHOOL_ALERTS_DATA } from '../../data/school-admin-dashboard.data';

describe('AdminAlertsComponent', () => {
  let component: AdminAlertsComponent;
  let fixture: ComponentFixture<AdminAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAlertsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAlertsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('alerts', SCHOOL_ALERTS_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all alerts', () => {
    const rows = fixture.nativeElement.querySelectorAll('.alert-row');
    expect(rows.length).toBe(SCHOOL_ALERTS_DATA.length);
  });

  it('should display badge with number of alerts', () => {
    const badge = fixture.nativeElement.querySelector('.alerts-badge');
    expect(badge.textContent.trim()).toBe(SCHOOL_ALERTS_DATA.length.toString());
  });
});
