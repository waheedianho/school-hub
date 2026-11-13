import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentMetricsComponent } from './assessment-metrics';
import { ASSESSMENT_METRICS } from '../../data/super-admin-assessments.data';

describe('AssessmentMetricsComponent', () => {
  let component: AssessmentMetricsComponent;
  let fixture: ComponentFixture<AssessmentMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', ASSESSMENT_METRICS);
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

  it('should display correct value for Total Assessment Packs', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Total Assessment Packs');
    expect(text).toContain('248');
  });

  it('should display correct value for Approved Question Bank Items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Approved Question Bank Items');
    expect(text).toContain('12,846');
  });
});
