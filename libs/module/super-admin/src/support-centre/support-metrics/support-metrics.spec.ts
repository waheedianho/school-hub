import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportMetricsComponent } from './support-metrics';
import { INITIAL_SUPPORT_METRICS } from '../../data/super-admin-support.data';

describe('SupportMetricsComponent', () => {
  let component: SupportMetricsComponent;
  let fixture: ComponentFixture<SupportMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_SUPPORT_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 6 metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should display correct values and labels', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Open Tickets');
    expect(text).toContain('128');
    expect(text).toContain('High Priority');
    expect(text).toContain('23');
    expect(text).toContain('Avg Response Time');
    expect(text).toContain('2h 18m');
  });
});
