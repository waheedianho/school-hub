import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsPerformanceBarComponent } from './analytics-performance-bar';
import { PERFORMANCE_SUMMARY_DATA } from '../../data/super-admin-analytics.data';

describe('AnalyticsPerformanceBarComponent', () => {
  let component: AnalyticsPerformanceBarComponent;
  let fixture: ComponentFixture<AnalyticsPerformanceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPerformanceBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsPerformanceBarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('summary', PERFORMANCE_SUMMARY_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 performance metrics', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Average Session Duration');
    expect(text).toContain('24m 36s');
    expect(text).toContain('Retention Rate');
    expect(text).toContain('82.4%');
    expect(text).toContain('Support Ticket Volume');
    expect(text).toContain('156');
    expect(text).toContain('All Systems Operational');
    expect(text).toContain('Data Sync Health');
    expect(text).toContain('100%');
  });
});
