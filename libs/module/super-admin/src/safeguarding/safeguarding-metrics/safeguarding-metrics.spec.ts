import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeguardingMetricsComponent } from './safeguarding-metrics';
import { INITIAL_SAFEGUARDING_METRICS } from '../../data/super-admin-safeguarding.data';

describe('SafeguardingMetricsComponent', () => {
  let component: SafeguardingMetricsComponent;
  let fixture: ComponentFixture<SafeguardingMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_SAFEGUARDING_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 6 metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should display correct values and labels', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Open Safeguarding Cases');
    expect(text).toContain('87');
    expect(text).toContain('High-Risk Alerts');
    expect(text).toContain('23');
    expect(text).toContain('Flagged Communications');
    expect(text).toContain('142');
  });
});
