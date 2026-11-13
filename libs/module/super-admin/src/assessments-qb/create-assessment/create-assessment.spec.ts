import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CreateAssessmentComponent } from './create-assessment';
import { SuperAdminStore } from '../../data/super-admin.store';

describe('CreateAssessmentComponent', () => {
  let component: CreateAssessmentComponent;
  let fixture: ComponentFixture<CreateAssessmentComponent>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let store: SuperAdminStore;

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CreateAssessmentComponent],
      providers: [SuperAdminStore, { provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAssessmentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 1 and allow step progression', () => {
    expect(component.currentStep()).toBe(1);

    component.nextStep();
    expect(component.currentStep()).toBe(2);

    component.nextStep();
    expect(component.currentStep()).toBe(3);

    component.prevStep();
    expect(component.currentStep()).toBe(2);

    component.setStep(4);
    expect(component.currentStep()).toBe(4);
  });

  it('should compute total marks and questions dynamically', () => {
    const totalMarks = component.computedTotalMarks();
    expect(totalMarks).toBe(50);

    component.updateCompositionCount(0, 20); // MCQ: 20 * 1 = 20
    expect(component.computedTotalMarks()).toBe(55);
  });

  it('should save draft and navigate back to assessments', () => {
    const createSpy = vi.spyOn(store, 'createAssessmentPack');
    component.saveDraft();
    expect(createSpy).toHaveBeenCalled();
  });

  it('should submit for review with correct status', () => {
    const createSpy = vi.spyOn(store, 'createAssessmentPack');
    component.submitForReview();
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({ publishStatus: 'Submit for Review' }),
    );
  });

  it('should publish live with correct status', () => {
    const createSpy = vi.spyOn(store, 'createAssessmentPack');
    component.publishLive();
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({ publishStatus: 'Publish' }),
    );
  });

  it('should cancel and navigate back to assessments list', () => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/super-admin/assessments-qb',
    ]);
  });
});
