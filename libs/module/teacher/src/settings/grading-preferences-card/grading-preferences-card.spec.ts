import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { GradingPreferencesCardComponent } from './grading-preferences-card';
import {
  INITIAL_GRADING_PREFERENCES,
  GradingPreferences,
} from '../../data/teacher-settings.data';

describe('GradingPreferencesCardComponent', () => {
  let component: GradingPreferencesCardComponent;
  let fixture: ComponentFixture<GradingPreferencesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingPreferencesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradingPreferencesCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('preferences', INITIAL_GRADING_PREFERENCES);
    fixture.detectChanges();
  });

  it('should render the grading preferences correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.step-title')?.textContent).toContain(
      'Grading & Review Preferences',
    );
    expect(compiled.textContent).toContain('Default Grading Scale');
    expect(compiled.textContent).toContain(
      'Auto-sync quiz scores to gradebook',
    );
    expect(compiled.textContent).toContain(
      'Require confirmation before score edits',
    );
    expect(compiled.textContent).toContain(
      'Show audit trail for modified grades',
    );
    expect(compiled.textContent).toContain('Rubric Preference');
    expect(compiled.textContent).toContain('Late-submission Handling');
  });

  it('should emit updated preferences when grading scale changes', () => {
    let emitted: GradingPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onScaleChange('Letter Grade (A-F)');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.gradingScale).toBe('Letter Grade (A-F)');
  });

  it('should emit updated preferences when a toggle is changed', () => {
    let emitted: GradingPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onToggle('autoSyncScores', false);
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.autoSyncScores).toBe(false);
    expect(emitted?.requireConfirmation).toBe(true);
  });

  it('should emit updated preferences when rubric option changes', () => {
    let emitted: GradingPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onRubricChange('Optional Rubrics');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.rubricPreference).toBe('Optional Rubrics');
  });

  it('should emit updated preferences when late submission handling changes', () => {
    let emitted: GradingPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onLateSubmissionChange('Accept with late flag');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.lateSubmissionHandling).toBe('Accept with late flag');
  });
});
