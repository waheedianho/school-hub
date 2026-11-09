import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ClassCommunicationCardComponent } from './class-communication-card';
import {
  INITIAL_CLASS_COMMUNICATION_PREFERENCES,
  ClassCommunicationPreferences,
} from '../../data/teacher-settings.data';

describe('ClassCommunicationCardComponent', () => {
  let component: ClassCommunicationCardComponent;
  let fixture: ComponentFixture<ClassCommunicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassCommunicationCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassCommunicationCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'preferences',
      INITIAL_CLASS_COMMUNICATION_PREFERENCES,
    );
    fixture.detectChanges();
  });

  it('should render class & communication preferences correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.step-title')?.textContent).toContain(
      'Class & Communication Preferences',
    );
    expect(compiled.textContent).toContain('Default Class Landing Page');
    expect(compiled.textContent).toContain('Announcement Visibility');
    expect(compiled.textContent).toContain('Parent-Copy Default');
    expect(compiled.textContent).toContain('Message Signature');
    expect(compiled.textContent).toContain('All communications are logged');
  });

  it('should emit updated preferences when landing page changes', () => {
    let emitted: ClassCommunicationPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onLandingPageChange('Stream / Feed');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.defaultLandingPage).toBe('Stream / Feed');
  });

  it('should emit updated preferences when visibility changes', () => {
    let emitted: ClassCommunicationPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onVisibilityChange('Draft Only');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.announcementVisibility).toBe('Draft Only');
  });

  it('should emit updated preferences when parent copy option changes', () => {
    let emitted: ClassCommunicationPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onParentCopyChange('Ask Each Time');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.parentCopyDefault).toBe('Ask Each Time');
  });

  it('should emit updated preferences when signature is changed', () => {
    let emitted: ClassCommunicationPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onSignatureChange('Regards, Teacher Tunde');
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.messageSignature).toBe('Regards, Teacher Tunde');
  });
});
