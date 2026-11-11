import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionsInsightsCardsComponent } from './insights-cards';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('InterventionsInsightsCardsComponent', () => {
  let component: InterventionsInsightsCardsComponent;
  let fixture: ComponentFixture<InterventionsInsightsCardsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsInsightsCardsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InterventionsInsightsCardsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render all 4 diagnostic insight cards and the realtime notice', () => {
    expect(component).toBeTruthy();
    expect(store.interventionsInsights().commonConcern.percentage).toBe(27);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="card-common-concern"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-best-performing"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-class-needing-support"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-completion-rate"]'),
    ).toBeTruthy();
    expect(compiled.querySelector('.realtime-notice')).toBeTruthy();

    expect(compiled.textContent).toContain('Mathematics Weakness');
    expect(compiled.textContent).toContain('Small Group Remediation');
    expect(compiled.textContent).toContain('JSS 2B');
    expect(compiled.textContent).toContain('81%');
    expect(compiled.textContent).toContain('Data is updated in real-time');
  });

  it('should calculate SVG donut strokeDashoffset correctly', () => {
    const circumference = 2 * Math.PI * 30; // 188.495...
    const offset50 = component.getStrokeDashoffset(50);
    expect(offset50).toBeCloseTo(circumference / 2, 1);

    const offset0 = component.getStrokeDashoffset(0);
    expect(offset0).toBeCloseTo(circumference, 1);

    const offset100 = component.getStrokeDashoffset(100);
    expect(offset100).toBeCloseTo(0, 1);
  });
});
