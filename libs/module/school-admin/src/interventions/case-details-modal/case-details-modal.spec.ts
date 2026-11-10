import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailsModalComponent } from './case-details-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { InterventionCase } from '../../data/school-admin.models';

describe('CaseDetailsModalComponent', () => {
  let component: CaseDetailsModalComponent;
  let fixture: ComponentFixture<CaseDetailsModalComponent>;
  let store: SchoolAdminStore;

  const mockCase: InterventionCase = {
    id: 'case-001',
    learnerId: 'LRN-001',
    learnerName: 'Adebayo, Oluwatobi',
    initials: 'AO',
    admissionNo: 'LRN-240101',
    className: 'JSS 1A',
    concernArea: 'Mathematics Weakness',
    interventionType: 'Small Group Remediation',
    assignedStaff: 'Mr. Adekunle J.',
    assignedStaffRole: 'Maths Teacher',
    status: 'In Progress',
    priority: 'High',
    nextReviewDate: '28 May 2025',
    progress: 45,
    notes: 'Diagnostic assessment reveals gaps in algebraic expressions.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDetailsModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailsModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.closeInterventionDetails();
    fixture.detectChanges();
  });

  it('should not render dialog when no case is selected', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when a case is selected', () => {
    store.openInterventionDetails(mockCase);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(compiled.querySelector('.learner-name')?.textContent).toContain(
      'Adebayo, Oluwatobi',
    );
    expect(compiled.querySelector('.admission-badge')?.textContent).toContain(
      'LRN-240101',
    );
    expect(compiled.querySelector('.class-badge')?.textContent).toContain(
      'JSS 1A',
    );
    expect(compiled.textContent).toContain('Mathematics Weakness');
    expect(compiled.textContent).toContain('Small Group Remediation');
    expect(compiled.textContent).toContain('Mr. Adekunle J.');
    expect(compiled.textContent).toContain('45%');
    expect(compiled.textContent).toContain(
      'Diagnostic assessment reveals gaps in algebraic expressions.',
    );
  });

  it('should close when close button is clicked', () => {
    store.openInterventionDetails(mockCase);
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.selectedInterventionCase()).toBeNull();
  });

  it('should update progress through component handler', () => {
    store.openInterventionDetails(mockCase);
    fixture.detectChanges();

    component.onProgressChange(75);
    fixture.detectChanges();

    const updateBtn = fixture.nativeElement.querySelector(
      '.btn-update-progress',
    ) as HTMLButtonElement;
    updateBtn.click();
    fixture.detectChanges();

    const updated = store.interventions().find((c) => c.id === 'case-001');
    expect(updated?.progress).toBe(75);
  });

  it('should resolve case when resolve button is clicked', () => {
    store.openInterventionDetails(mockCase);
    fixture.detectChanges();

    const resolveBtn = fixture.nativeElement.querySelector(
      '.btn-resolve',
    ) as HTMLButtonElement;
    resolveBtn.click();
    fixture.detectChanges();

    const updated = store.interventions().find((c) => c.id === 'case-001');
    expect(updated?.status).toBe('Resolved');
    expect(updated?.progress).toBe(100);
  });
});
