import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardMetricsComponent } from './dashboard-metrics';
import { DASHBOARD_METRICS_DATA } from '../../data/school-admin-dashboard.data';

describe('DashboardMetricsComponent', () => {
  let component: DashboardMetricsComponent;
  let fixture: ComponentFixture<DashboardMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', DASHBOARD_METRICS_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 6 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should compute sparkline points correctly', () => {
    const points = component.getSparklinePoints([10, 20, 30]);
    expect(points).toBeTruthy();
    expect(points.split(' ').length).toBe(3);
  });
});
