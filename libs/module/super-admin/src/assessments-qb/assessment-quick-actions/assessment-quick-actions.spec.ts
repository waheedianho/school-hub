import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentQuickActionsComponent } from './assessment-quick-actions';

describe('AssessmentQuickActionsComponent', () => {
  let component: AssessmentQuickActionsComponent;
  let fixture: ComponentFixture<AssessmentQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pendingReviewCount', 84);
    fixture.componentRef.setInput('flaggedQuestionsCount', 27);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(4);
  });

  it('should emit createAssessment when clicking Create Assessment', () => {
    const emitSpy = vi.spyOn(component.createAssessment, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="action-create-assessment"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit reviewQueue when clicking Review Queue', () => {
    const emitSpy = vi.spyOn(component.reviewQueue, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="action-review-queue"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
