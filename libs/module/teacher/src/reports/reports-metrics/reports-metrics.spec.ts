import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsMetricsComponent } from './reports-metrics';
import { TEACHER_REPORTS_METRICS } from '../../data/teacher-reports.data';

describe('ReportsMetricsComponent', () => {
  let component: ReportsMetricsComponent;
  let fixture: ComponentFixture<ReportsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_REPORTS_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(4);
    expect(cards[0].textContent).toContain('Average Class Score');
    expect(cards[0].textContent).toContain('72%');
    expect(cards[1].textContent).toContain('Learners Below Mastery');
    expect(cards[2].textContent).toContain('Portfolio Completion Rate');
    expect(cards[3].textContent).toContain('Parent Reports Ready');
  });
});
