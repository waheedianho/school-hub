import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentReviewViewComponent } from './assessment-review-view';
import { SAMPLE_ASSESSMENT_REVIEW_ITEMS } from '../../data/super-admin-assessments.data';

describe('AssessmentReviewViewComponent', () => {
  let component: AssessmentReviewViewComponent;
  let fixture: ComponentFixture<AssessmentReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentReviewViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentReviewViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', SAMPLE_ASSESSMENT_REVIEW_ITEMS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display review items in table', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(SAMPLE_ASSESSMENT_REVIEW_ITEMS[0].packName);
    expect(text).toContain(SAMPLE_ASSESSMENT_REVIEW_ITEMS[0].submittedBy);
  });

  it('should emit approveItem when clicking approve', () => {
    const emitSpy = vi.spyOn(component.approveItem, 'emit');
    const firstItem = SAMPLE_ASSESSMENT_REVIEW_ITEMS[0];
    component.onApprove(firstItem.id);
    expect(emitSpy).toHaveBeenCalledWith(firstItem.id);
  });

  it('should emit requestRevisionItem when clicking changes', () => {
    const emitSpy = vi.spyOn(component.requestRevisionItem, 'emit');
    const firstItem = SAMPLE_ASSESSMENT_REVIEW_ITEMS[0];
    component.onRequestRevision(firstItem.id);
    expect(emitSpy).toHaveBeenCalledWith(firstItem.id);
  });
});
