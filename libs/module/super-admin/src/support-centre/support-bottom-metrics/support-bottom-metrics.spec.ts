import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportBottomMetricsComponent } from './support-bottom-metrics';
import { INITIAL_SUPPORT_BOTTOM_METRICS } from '../../data/super-admin-support.data';

describe('SupportBottomMetricsComponent', () => {
  let component: SupportBottomMetricsComponent;
  let fixture: ComponentFixture<SupportBottomMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportBottomMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportBottomMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'bottomMetrics',
      INITIAL_SUPPORT_BOTTOM_METRICS,
    );
    fixture.detectChanges();
  });

  it('should create and render all 5 bottom metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.bottom-card');
    expect(cards.length).toBe(5);
  });

  it('should display values and operational status properly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('First Response Rate');
    expect(text).toContain('92%');
    expect(text).toContain('Average Resolution Time');
    expect(text).toContain('18h 42m');
    expect(text).toContain('Tickets Closed This Month');
    expect(text).toContain('678');
    expect(text).toContain('All Systems Operational');
  });
});
