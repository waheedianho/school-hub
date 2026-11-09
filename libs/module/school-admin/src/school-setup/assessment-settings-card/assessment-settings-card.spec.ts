import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentSettingsCardComponent } from './assessment-settings-card';
import { ASSESSMENT_SETTINGS_DATA } from '../../data/school-admin-setup.data';

describe('AssessmentSettingsCardComponent', () => {
  let component: AssessmentSettingsCardComponent;
  let fixture: ComponentFixture<AssessmentSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentSettingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('settings', ASSESSMENT_SETTINGS_DATA);
    fixture.detectChanges();
  });

  it('should create and render weighting segments', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      '3. Assessment & Reporting Settings',
    );
    expect(compiled.querySelector('.weighting-legend')?.textContent).toContain(
      'Classwork',
    );
    expect(compiled.querySelector('.weighting-legend')?.textContent).toContain(
      '30%',
    );
  });

  it('should toggle score approval workflow', () => {
    const spy = vi.spyOn(component.settingsChange, 'emit');
    component.toggleScoreApproval();
    expect(spy).toHaveBeenCalledWith({ scoreApprovalWorkflow: false });
  });

  it('should emit field change on select edit', () => {
    const spy = vi.spyOn(component.settingsChange, 'emit');
    component.onFieldChange('gradingScale', 'Percentage (0 - 100%)');
    expect(spy).toHaveBeenCalledWith({
      gradingScale: 'Percentage (0 - 100%)',
    });
  });
});
