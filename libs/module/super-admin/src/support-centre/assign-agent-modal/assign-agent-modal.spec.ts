import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignAgentModalComponent } from './assign-agent-modal';
import { INITIAL_SUPPORT_TICKETS } from '../../data/super-admin-support.data';

describe('AssignAgentModalComponent', () => {
  let component: AssignAgentModalComponent;
  let fixture: ComponentFixture<AssignAgentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignAgentModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignAgentModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tickets', INITIAL_SUPPORT_TICKETS);
    fixture.detectChanges();
  });

  it('should create and render modal', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('#assign-agent-title');
    expect(title.textContent).toContain('Assign Support Agent');
  });

  it('should emit assigned event on submission', () => {
    const spy = vi.spyOn(component.assigned, 'emit');
    component.selectedTicketId.set('TKT-2025-5128');
    component.selectedAgent.set('Rohit Singh');
    component.selectedRole.set('Support Specialist');
    component.assignmentNotes.set('Please investigate high-priority incident.');

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({
      ticketId: 'TKT-2025-5128',
      agentName: 'Rohit Singh',
      agentRole: 'Support Specialist',
      notes: 'Please investigate high-priority incident.',
    });
  });

  it('should emit closeModal when close button is clicked', () => {
    const spy = vi.spyOn(component.closeModal, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
