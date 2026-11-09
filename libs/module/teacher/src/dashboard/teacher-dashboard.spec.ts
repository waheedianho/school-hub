import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard';

describe('TeacherDashboardComponent', () => {
  let component: TeacherDashboardComponent;
  let fixture: ComponentFixture<TeacherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDashboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the teacher dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Teacher works!" for app routing backwards compatibility', () => {
    const srOnly = fixture.nativeElement.querySelector('p.sr-only');
    expect(srOnly?.textContent).toContain('Teacher works!');
  });

  it('should display the dashboard heading and subtitle', () => {
    const title = fixture.nativeElement.querySelector('.dashboard-title');
    expect(title?.textContent).toContain('Dashboard');

    const subtitle = fixture.nativeElement.querySelector('.dashboard-subtitle');
    expect(subtitle?.textContent).toContain("Monitor today's teaching");
  });

  it('should render all dashboard sections and subcomponents', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('school-hub-dashboard-metrics')).toBeTruthy();
    expect(el.querySelector('school-hub-today-schedule')).toBeTruthy();
    expect(el.querySelector('school-hub-pending-reviews')).toBeTruthy();
    expect(el.querySelector('school-hub-quick-actions')).toBeTruthy();
    expect(el.querySelector('school-hub-unread-messages')).toBeTruthy();
    expect(el.querySelector('school-hub-upcoming-deadlines')).toBeTruthy();
    expect(el.querySelector('school-hub-current-topics')).toBeTruthy();
    expect(el.querySelector('school-hub-class-performance')).toBeTruthy();
    expect(el.querySelector('school-hub-workflow-reminder')).toBeTruthy();
  });
});
