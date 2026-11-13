import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentSidebarComponent } from './assessment-sidebar';
import {
  ASSESSMENT_HEALTH_DATA,
  ASSESSMENT_REVIEW_SUMMARY,
  RECENT_ASSESSMENT_ACTIVITIES,
} from '../../data/super-admin-assessments.data';

describe('AssessmentSidebarComponent', () => {
  let component: AssessmentSidebarComponent;
  let fixture: ComponentFixture<AssessmentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('assessmentHealth', ASSESSMENT_HEALTH_DATA);
    fixture.componentRef.setInput('reviewSummary', ASSESSMENT_REVIEW_SUMMARY);
    fixture.componentRef.setInput('activities', RECENT_ASSESSMENT_ACTIVITIES);
    fixture.componentRef.setInput('standardsCoverage', 92);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render donut chart with total packs count', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Assessment Health Overview');
    expect(text).toContain('248');
    expect(text).toContain('Total Packs');
  });

  it('should render review queue summary metrics', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Pending Academic Review');
    expect(text).toContain('Revisions Requested');
    expect(text).toContain('144 Total');
  });

  it('should render standards coverage of 92%', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Standards Coverage');
    expect(text).toContain('92%');
    expect(text).toContain('24/24 Verified');
  });

  it('should emit openReviewQueue when clicking button', () => {
    const emitSpy = vi.spyOn(component.openReviewQueue, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="open-moderation-queue-btn"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
