import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardMetricsComponent } from './dashboard-metrics';
import { TEACHER_METRICS_DATA } from '../../data/teacher-dashboard.data';

describe('DashboardMetricsComponent', () => {
  let component: DashboardMetricsComponent;
  let fixture: ComponentFixture<DashboardMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMetricsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_METRICS_DATA);
    fixture.detectChanges();
  });

  it('should create and render 5 metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should display metric values correctly', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent).toContain('4');
    expect(values[1].textContent).toContain('18');
  });
});
