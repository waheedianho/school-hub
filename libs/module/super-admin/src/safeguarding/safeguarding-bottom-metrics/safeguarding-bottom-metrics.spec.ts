import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeguardingBottomMetricsComponent } from './safeguarding-bottom-metrics';
import { INITIAL_SAFEGUARDING_BOTTOM_METRICS } from '../../data/super-admin-safeguarding.data';

describe('SafeguardingBottomMetricsComponent', () => {
  let component: SafeguardingBottomMetricsComponent;
  let fixture: ComponentFixture<SafeguardingBottomMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingBottomMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingBottomMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'bottomMetrics',
      INITIAL_SAFEGUARDING_BOTTOM_METRICS,
    );
    fixture.detectChanges();
  });

  it('should create and render all 5 bottom cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.bottom-card');
    expect(cards.length).toBe(5);
  });

  it('should display gauge and status components properly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Average Resolution Time');
    expect(text).toContain('Schools Fully Compliant');
    expect(text).toContain('156 / 190');
    expect(text).toContain('82%');
    expect(text).toContain('All Systems Operational');
    expect(text).toContain('Healthy');
  });
});
