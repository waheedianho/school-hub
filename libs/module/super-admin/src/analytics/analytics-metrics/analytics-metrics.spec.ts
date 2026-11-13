import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsMetricsComponent } from './analytics-metrics';
import { ANALYTICS_METRICS } from '../../data/super-admin-analytics.data';

describe('AnalyticsMetricsComponent', () => {
  let component: AnalyticsMetricsComponent;
  let fixture: ComponentFixture<AnalyticsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', ANALYTICS_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 6 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll(
      '[data-testid^="metric-"]',
    );
    expect(cards.length).toBe(6);
  });

  it('should display Active Schools value of 248', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Active Schools');
    expect(text).toContain('248');
    expect(text).toContain('6.2%');
  });

  it('should display Churn Risk Schools value of 14', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Churn Risk Schools');
    expect(text).toContain('14');
  });

  it('should calculate sparkline points correctly', () => {
    const points = component.getSparklinePoints([10, 20, 30]);
    expect(points).toBeTruthy();
    expect(points.split(' ').length).toBe(3);
  });
});
