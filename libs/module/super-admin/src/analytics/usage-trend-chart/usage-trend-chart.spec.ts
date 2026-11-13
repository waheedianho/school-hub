import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageTrendChartComponent } from './usage-trend-chart';
import { PLATFORM_USAGE_TREND_DATA } from '../../data/super-admin-analytics.data';

describe('UsageTrendChartComponent', () => {
  let component: UsageTrendChartComponent;
  let fixture: ComponentFixture<UsageTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageTrendChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsageTrendChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('points', PLATFORM_USAGE_TREND_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and badge 1', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Platform Usage Trend');
    expect(text).toContain('Daily active users (DAU)');
    expect(text).toContain('1');
  });

  it('should calculate SVG coordinates for points', () => {
    const coords = component.chartCoords();
    expect(coords.length).toBe(PLATFORM_USAGE_TREND_DATA.length);
    expect(component.pathD()).toBeTruthy();
    expect(component.areaD()).toBeTruthy();
  });

  it('should emit periodChange on dropdown selection', () => {
    const emitSpy = vi.spyOn(component.periodChange, 'emit');
    component.onPeriodChange('Last 7 Days');
    expect(emitSpy).toHaveBeenCalledWith('Last 7 Days');
  });

  it('should allow setting active tooltip point', () => {
    component.setActiveIndex(2);
    expect(component.activeIndex()).toBe(2);
    expect(component.activePoint()?.date).toBe('Apr 24');
  });
});
