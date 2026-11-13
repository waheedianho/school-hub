import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentDetailModalComponent } from './assessment-detail-modal';
import { SAMPLE_ASSESSMENT_PACKS } from '../../data/super-admin-assessments.data';

describe('AssessmentDetailModalComponent', () => {
  let component: AssessmentDetailModalComponent;
  let fixture: ComponentFixture<AssessmentDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pack', SAMPLE_ASSESSMENT_PACKS[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pack details', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(SAMPLE_ASSESSMENT_PACKS[0].name);
    expect(text).toContain(SAMPLE_ASSESSMENT_PACKS[0].subject);
    expect(text).toContain(SAMPLE_ASSESSMENT_PACKS[0].classLevel);
  });

  it('should emit modalClose when clicking close button', () => {
    const emitSpy = vi.spyOn(component.modalClose, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="close-modal-btn"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit statusChange when selecting status', () => {
    const emitSpy = vi.spyOn(component.statusChange, 'emit');
    component.onUpdateStatus('Approved');
    expect(emitSpy).toHaveBeenCalledWith({
      id: SAMPLE_ASSESSMENT_PACKS[0].id,
      status: 'Approved',
    });
  });

  it('should emit edit when clicking edit', () => {
    const emitSpy = vi.spyOn(component.edit, 'emit');
    component.onEdit();
    expect(emitSpy).toHaveBeenCalledWith(SAMPLE_ASSESSMENT_PACKS[0]);
  });
});
