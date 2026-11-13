import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AssessmentsQbComponent } from './assessments-qb';
import { SuperAdminStore } from '../data/super-admin.store';
import { SAMPLE_ASSESSMENT_PACKS } from '../data/super-admin-assessments.data';

describe('AssessmentsQbComponent', () => {
  let component: AssessmentsQbComponent;
  let fixture: ComponentFixture<AssessmentsQbComponent>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let store: SuperAdminStore;

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AssessmentsQbComponent],
      providers: [SuperAdminStore, { provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsQbComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with title and action buttons', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Assessments & Question Bank');
    expect(text).toContain('Create Assessment');
    expect(text).toContain('Export Registry');
  });

  it('should switch between tabs', () => {
    component.setTab('questions');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-testid="questions-view"]'),
    ).toBeTruthy();

    component.setTab('review');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-testid="review-view"]'),
    ).toBeTruthy();

    component.setTab('templates');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-testid="templates-view"]'),
    ).toBeTruthy();

    component.setTab('packs');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-testid="packs-view"]'),
    ).toBeTruthy();
  });

  it('should navigate to create assessment pack', () => {
    component.navigateToCreateAssessment();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/super-admin/assessments-qb/create',
    ]);
  });

  it('should open and close pack detail modal', () => {
    const pack = SAMPLE_ASSESSMENT_PACKS[0];
    component.openPackDetail(pack);
    expect(component.selectedPack()).toBe(pack);

    component.closePackDetail();
    expect(component.selectedPack()).toBeNull();
  });

  it('should update pack status and trigger toast', () => {
    const pack = SAMPLE_ASSESSMENT_PACKS[0];
    const updateSpy = vi.spyOn(store, 'updateAssessmentStatus');
    component.handleStatusUpdate({ id: pack.id, status: 'Approved' });
    expect(updateSpy).toHaveBeenCalledWith(pack.id, 'Approved');
    expect(component.toastMessage()).toContain('Approved');
  });

  it('should delete pack and trigger toast', () => {
    const pack = SAMPLE_ASSESSMENT_PACKS[0];
    const deleteSpy = vi.spyOn(store, 'deleteAssessmentPack');
    component.handleDeletePack(pack.id);
    expect(deleteSpy).toHaveBeenCalledWith(pack.id);
    expect(component.toastMessage()).toContain('deleted');
  });

  it('should export assessments and show toast', () => {
    component.exportAssessments();
    expect(component.toastMessage()).toContain('Exporting');
  });
});
