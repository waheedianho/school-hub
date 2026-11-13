import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentTableComponent } from './assessment-table';
import { SAMPLE_ASSESSMENT_PACKS } from '../../data/super-admin-assessments.data';

describe('AssessmentTableComponent', () => {
  let component: AssessmentTableComponent;
  let fixture: ComponentFixture<AssessmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('packs', SAMPLE_ASSESSMENT_PACKS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display paginated packs in table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBeLessThanOrEqual(10);
  });

  it('should emit searchChange on search input', () => {
    const emitSpy = vi.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector(
      '[data-testid="assessment-search-input"]',
    );
    input.value = 'Physics';
    input.dispatchEvent(new Event('input'));
    expect(emitSpy).toHaveBeenCalledWith('Physics');
  });

  it('should emit subjectChange on subject filter', () => {
    const emitSpy = vi.spyOn(component.subjectChange, 'emit');
    component.onSubjectChange('Mathematics');
    expect(emitSpy).toHaveBeenCalledWith('Mathematics');
  });

  it('should emit resetFilters when clicking reset button', () => {
    const emitSpy = vi.spyOn(component.resetFilters, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="reset-filters-btn"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should toggle action menu and handle view/delete', () => {
    const pack = SAMPLE_ASSESSMENT_PACKS[0];
    const viewSpy = vi.spyOn(component.viewPack, 'emit');

    component.onView(pack);
    expect(viewSpy).toHaveBeenCalledWith(pack);

    component.toggleActionMenu(pack.id, new MouseEvent('click'));
    expect(component.openActionMenuId()).toBe(pack.id);

    const deleteSpy = vi.spyOn(component.deletePack, 'emit');
    component.onDelete(pack.id);
    expect(deleteSpy).toHaveBeenCalledWith(pack.id);
    expect(component.openActionMenuId()).toBeNull();
  });
});
