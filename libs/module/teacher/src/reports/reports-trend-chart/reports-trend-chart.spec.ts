import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsTrendChartComponent } from './reports-trend-chart';
import { PERFORMANCE_TREND_DATA } from '../../data/teacher-reports.data';

describe('ReportsTrendChartComponent', () => {
  let component: ReportsTrendChartComponent;
  let fixture: ComponentFixture<ReportsTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsTrendChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsTrendChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('points', PERFORMANCE_TREND_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render performance trend title and points', () => {
    const title = fixture.nativeElement.querySelector('.card-title');
    expect(title.textContent).toContain('Performance Trend');

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-label')).toContain('Performance trend');
  });
});
