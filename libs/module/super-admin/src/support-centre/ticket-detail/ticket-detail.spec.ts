import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TicketDetailComponent } from './ticket-detail';
import { SuperAdminStore } from '../../data/super-admin.store';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDetailComponent],
      providers: [
        SuperAdminStore,
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'id' ? 'TKT-2025-5128' : null),
            }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(SuperAdminStore);
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and resolve the default ticket', () => {
    expect(component).toBeTruthy();
    expect(store).toBeTruthy();
    expect(component.ticket()).toBeDefined();
    expect(component.ticket()?.id).toBe('TKT-2025-5128');
  });

  it('should send a reply and append it to ticket timeline', () => {
    component.newReplyText.set('Testing agent reply');
    const prevTimelineLength = component.ticket()?.timeline?.length || 0;

    component.sendReply();

    expect(component.newReplyText()).toBe('');
    const updatedTicket = component.ticket();
    expect(updatedTicket?.timeline?.length).toBe(prevTimelineLength + 1);
    const lastEntry =
      updatedTicket?.timeline?.[updatedTicket.timeline.length - 1];
    expect(lastEntry?.content).toBe('Testing agent reply');
    expect(lastEntry?.type).toBe('message');
  });

  it('should not send an empty reply', () => {
    component.newReplyText.set('   ');
    const prevLength = component.ticket()?.timeline?.length || 0;

    component.sendReply();

    expect(component.ticket()?.timeline?.length).toBe(prevLength);
  });

  it('should update ticket status', () => {
    component.updateStatus('In Progress');
    expect(component.ticket()?.status).toBe('In Progress');
  });

  it('should escalate ticket', () => {
    component.escalateTicket();
    expect(component.ticket()?.status).toBe('Escalated');
  });

  it('should resolve ticket', () => {
    component.resolveTicket();
    expect(component.ticket()?.status).toBe('Resolved');
  });

  it('should toggle checklist items', () => {
    const ticket = component.ticket();
    if (ticket?.resolutionChecklist && ticket.resolutionChecklist.length > 2) {
      const initialCompleted = ticket.resolutionChecklist[2].completed;
      component.toggleChecklist(2);
      expect(component.ticket()?.resolutionChecklist?.[2].completed).toBe(
        !initialCompleted,
      );
    }
  });

  it('should open and close assign and note modals', () => {
    expect(component.activeModal()).toBeNull();

    component.openAssignModal();
    expect(component.activeModal()).toBe('assign');

    component.closeModal();
    expect(component.activeModal()).toBeNull();

    component.openNoteModal();
    expect(component.activeModal()).toBe('note');

    component.closeModal();
    expect(component.activeModal()).toBeNull();
  });

  it('should handle onAgentAssigned callback', () => {
    component.onAgentAssigned({
      ticketId: 'TKT-2025-5128',
      agentName: 'Aarav Patel',
      agentRole: 'Senior Support Specialist',
    });

    expect(component.ticket()?.assignedTo.name).toBe('Aarav Patel');
    expect(component.ticket()?.assignedTo.role).toBe(
      'Senior Support Specialist',
    );
  });

  it('should handle onNoteAdded callback', () => {
    const prevTimelineLength = component.ticket()?.timeline?.length || 0;

    component.onNoteAdded({
      ticketId: 'TKT-2025-5128',
      note: 'Critical internal investigation note',
    });

    const updatedTicket = component.ticket();
    expect(updatedTicket?.timeline?.length).toBe(prevTimelineLength + 1);
    const lastEntry =
      updatedTicket?.timeline?.[updatedTicket.timeline.length - 1];
    expect(lastEntry?.type).toBe('internal_note');
    expect(lastEntry?.isInternal).toBe(true);
    expect(lastEntry?.content).toBe('Critical internal investigation note');
  });

  it('should safely copy ticket id without errors', () => {
    expect(() => component.copyTicketId()).not.toThrow();
  });
});
