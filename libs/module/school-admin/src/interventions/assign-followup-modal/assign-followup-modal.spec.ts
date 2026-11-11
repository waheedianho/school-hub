import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignFollowupModalComponent } from './assign-followup-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AssignFollowupModalComponent', () => {
  let component: AssignFollowupModalComponent;
  let fixture: ComponentFixture<AssignFollowupModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignFollowupModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignFollowupModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.closeAssignFollowUpModal();
    fixture.detectChanges();
  });

  it('should not render dialog when closed', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when opened', () => {
    store.openAssignFollowUpModal();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(
      compiled.querySelector('#assign-followup-title')?.textContent,
    ).toContain('Assign Staff Follow-up');
  });

  it('should close when cancel or close button is clicked', () => {
    store.openAssignFollowUpModal();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.isAssignFollowUpModalOpen()).toBe(false);

    store.openAssignFollowUpModal();
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector(
      '.btn-cancel',
    ) as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(store.isAssignFollowUpModalOpen()).toBe(false);
  });

  it('should submit staff assignment and update case in store', () => {
    store.openAssignFollowUpModal();
    fixture.detectChanges();

    component.onCaseChange('case-001');
    component.updateField('assignedStaff', 'Mrs. Folake S.');
    component.updateField('assignedStaffRole', 'Senior Guidance Counsellor');
    component.updateField('dueDate', '10 June 2025');
    component.updateField('followUpFrequency', 'Bi-Weekly');
    component.updateField('instructions', 'Focus on math confidence');

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    submitBtn.click();
    fixture.detectChanges();

    expect(store.isAssignFollowUpModalOpen()).toBe(false);

    const updatedCase = store.interventions().find((c) => c.id === 'case-001');
    expect(updatedCase?.assignedStaff).toBe('Mrs. Folake S.');
    expect(updatedCase?.nextReviewDate).toBe('10 June 2025');
  });

  it('should disable submit when required fields are missing', () => {
    store.openAssignFollowUpModal();
    fixture.detectChanges();

    component.updateField('assignedStaff', '');
    component.updateField('dueDate', '');
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});
