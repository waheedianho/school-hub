import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EngagementHeatmapComponent } from './engagement-heatmap';
import { ENGAGEMENT_HEATMAP_DATA } from '../../data/super-admin-analytics.data';

describe('EngagementHeatmapComponent', () => {
  let component: EngagementHeatmapComponent;
  let fixture: ComponentFixture<EngagementHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementHeatmapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EngagementHeatmapComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cells', ENGAGEMENT_HEATMAP_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and badge 7', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Engagement Heatmap');
    expect(text).toContain('7');
    expect(text).toContain('Lower Activity');
    expect(text).toContain('Higher Activity');
  });

  it('should retrieve cells accurately by week and day', () => {
    const cell = component.getCell('Week 1', 'Mon');
    expect(cell).toBeTruthy();
    expect(cell?.value).toBe(420);
  });

  it('should emit periodChange on dropdown select', () => {
    const emitSpy = vi.spyOn(component.periodChange, 'emit');
    component.onPeriodChange('Last 90 Days');
    expect(emitSpy).toHaveBeenCalledWith('Last 90 Days');
  });
});
