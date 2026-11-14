import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignReviewModalComponent } from './assign-review-modal';
import { INITIAL_SAFEGUARDING_CASES } from '../../data/super-admin-safeguarding.data';

describe('AssignReviewModalComponent', () => {
  let component: AssignReviewModalComponent;
  let fixture: ComponentFixture<AssignReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignReviewModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignReviewModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cases', INITIAL_SAFEGUARDING_CASES);
    fixture.detectChanges();
  });

  it('should create and render modal options', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('#assign-modal-title');
    expect(title.textContent).toContain('Assign Reviewer');
  });

  it('should emit assigned event on form submission', () => {
    const spy = vi.spyOn(component.assigned, 'emit');
    component.selectedCaseId.set('CASE-2025-0871');
    component.selectedReviewer.set('Neha Verma');
    component.selectedRole.set('Compliance Officer');
    component.assignmentNotes.set('Urgent follow-up requested.');

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({
      caseId: 'CASE-2025-0871',
      reviewerName: 'Neha Verma',
      reviewerRole: 'Compliance Officer',
      notes: 'Urgent follow-up requested.',
    });
  });

  it('should emit closeModal event when close button is clicked', () => {
    const spy = vi.spyOn(component.closeModal, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
