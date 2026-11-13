import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentTrendChartComponent } from './assessment-trend-chart';
import { ASSESSMENT_COMPLETION_TREND_DATA } from '../../data/super-admin-analytics.data';

describe('AssessmentTrendChartComponent', () => {
  let component: AssessmentTrendChartComponent;
  let fixture: ComponentFixture<AssessmentTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentTrendChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentTrendChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('points', ASSESSMENT_COMPLETION_TREND_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and badge 4', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Assessment Completion Trend');
    expect(text).toContain('Completed');
    expect(text).toContain('In Progress');
    expect(text).toContain('4');
  });

  it('should emit periodChange when selecting period', () => {
    const emitSpy = vi.spyOn(component.periodChange, 'emit');
    component.onPeriodChange('This Term');
    expect(emitSpy).toHaveBeenCalledWith('This Term');
  });

  it('should calculate bar heights correctly', () => {
    const heights = component.getBarHeights(
      ASSESSMENT_COMPLETION_TREND_DATA[0],
    );
    expect(heights.completedH).toBeGreaterThan(0);
    expect(heights.inProgressH).toBeGreaterThan(0);
    expect(heights.notStartedH).toBeGreaterThan(0);
  });
});
