import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentTemplatesViewComponent } from './assessment-templates-view';
import { SAMPLE_ASSESSMENT_TEMPLATES } from '../../data/super-admin-assessments.data';

describe('AssessmentTemplatesViewComponent', () => {
  let component: AssessmentTemplatesViewComponent;
  let fixture: ComponentFixture<AssessmentTemplatesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentTemplatesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentTemplatesViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('templates', SAMPLE_ASSESSMENT_TEMPLATES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all blueprints', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(SAMPLE_ASSESSMENT_TEMPLATES[0].title);
    expect(text).toContain(SAMPLE_ASSESSMENT_TEMPLATES[0].standard);
  });

  it('should emit useTemplate when clicking Apply Blueprint', () => {
    const emitSpy = vi.spyOn(component.useTemplate, 'emit');
    const firstTemplate = SAMPLE_ASSESSMENT_TEMPLATES[0];
    component.onUse(firstTemplate);
    expect(emitSpy).toHaveBeenCalledWith(firstTemplate);
  });
});
