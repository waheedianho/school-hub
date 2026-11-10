import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionsSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('InterventionsSummaryMetricsComponent', () => {
  let component: InterventionsSummaryMetricsComponent;
  let fixture: ComponentFixture<InterventionsSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InterventionsSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render all 5 metric cards with design values', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="metric-learners-flagged"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-active-interventions"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-overdue-followups"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-resolved-cases"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-success-rate"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('86');
    expect(compiled.textContent).toContain('Learners Flagged');
    expect(compiled.textContent).toContain('54');
    expect(compiled.textContent).toContain('Active Interventions');
    expect(compiled.textContent).toContain('18');
    expect(compiled.textContent).toContain('Overdue Follow-ups');
    expect(compiled.textContent).toContain('42');
    expect(compiled.textContent).toContain('Resolved Cases');
    expect(compiled.textContent).toContain('81%');
    expect(compiled.textContent).toContain('Intervention Success Rate');
  });

  it('should react dynamically when store metrics update', () => {
    store.interventionsSummaryMetrics.set({
      learnersFlagged: 90,
      learnersFlaggedChange: 15,
      activeInterventions: 60,
      activeInterventionsChange: 10,
      overdueFollowUps: 20,
      overdueFollowUpsChange: 8,
      resolvedCases: 50,
      resolvedCasesChange: 18,
      interventionSuccessRate: 85,
      interventionSuccessRateChange: 10,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('90');
    expect(compiled.textContent).toContain('60');
    expect(compiled.textContent).toContain('85%');
  });
});
