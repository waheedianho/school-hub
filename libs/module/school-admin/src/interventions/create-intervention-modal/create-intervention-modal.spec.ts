import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateInterventionModalComponent } from './create-intervention-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CreateInterventionModalComponent', () => {
  let component: CreateInterventionModalComponent;
  let fixture: ComponentFixture<CreateInterventionModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInterventionModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInterventionModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.closeCreateInterventionModal();
    fixture.detectChanges();
  });

  it('should not render dialog when closed', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when opened', () => {
    store.openCreateInterventionModal();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(compiled.querySelector('#create-plan-title')?.textContent).toContain(
      'Create Learner Intervention Plan',
    );
  });

  it('should close modal when close or cancel button is clicked', () => {
    store.openCreateInterventionModal();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.isCreateInterventionModalOpen()).toBe(false);

    store.openCreateInterventionModal();
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector(
      '.btn-cancel',
    ) as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(store.isCreateInterventionModalOpen()).toBe(false);
  });

  it('should update form fields and submit new intervention plan', () => {
    store.openCreateInterventionModal();
    fixture.detectChanges();

    component.updateField('learnerName', 'Zainab Balogun');
    component.updateField('admissionNo', 'LRN-240999');
    component.updateField('className', 'SSS 1A');
    component.updateField('concernArea', 'Reading Difficulty');
    component.updateField('interventionType', 'Reading Intervention');
    component.updateField('assignedStaff', 'Mrs. Folake S.');
    component.updateField('assignedStaffRole', 'English Teacher');
    component.updateField('priority', 'High');
    component.updateField('nextReviewDate', '15 June 2025');
    component.updateField(
      'notes',
      'Phonics and reading fluency support needed',
    );

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    submitBtn.click();
    fixture.detectChanges();

    // Modal should be closed after submission
    expect(store.isCreateInterventionModalOpen()).toBe(false);

    // Store should contain newly added plan
    const cases = store.interventions();
    const created = cases.find((c) => c.admissionNo === 'LRN-240999');
    expect(created).toBeTruthy();
    expect(created?.learnerName).toBe('Zainab Balogun');
    expect(created?.className).toBe('SSS 1A');
    expect(created?.concernArea).toBe('Reading Difficulty');
  });

  it('should disable submit when required fields are missing', () => {
    store.openCreateInterventionModal();
    fixture.detectChanges();

    component.updateField('learnerName', '');
    component.updateField('admissionNo', '');
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});
