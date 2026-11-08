import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TEACHER_CONVERSATIONS } from '../../data/teacher-messages.data';
import { ConversationsListComponent } from './conversations-list';

describe('ConversationsListComponent', () => {
  let component: ConversationsListComponent;
  let fixture: ComponentFixture<ConversationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conversations', TEACHER_CONVERSATIONS);
    fixture.componentRef.setInput('selectedConversationId', 'conv-1');
    fixture.detectChanges();
  });

  it('should create the conversations list component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs and initial conversations', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabBtns = el.querySelectorAll('.tab-btn');
    expect(tabBtns.length).toBe(5);

    const cards = el.querySelectorAll('.conversation-card');
    expect(cards.length).toBe(TEACHER_CONVERSATIONS.length);
  });

  it('should filter conversations by Parents tab', () => {
    component.onSelectTab('Parents');
    fixture.detectChanges();

    const filtered = component.filteredConversations();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((c) => c.type === 'parent')).toBe(true);
  });

  it('should filter conversations by Classes tab', () => {
    component.onSelectTab('Classes');
    fixture.detectChanges();

    const filtered = component.filteredConversations();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((c) => c.type === 'class')).toBe(true);
  });

  it('should filter conversations by Unread tab', () => {
    component.onSelectTab('Unread');
    fixture.detectChanges();

    const filtered = component.filteredConversations();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((c) => c.unreadCount > 0)).toBe(true);
  });

  it('should filter conversations by search query', () => {
    component.searchQuery.set('Daniel');
    fixture.detectChanges();

    const filtered = component.filteredConversations();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toContain('Daniel');
  });

  it('should emit conversationSelected when a conversation card is clicked', () => {
    const emitSpy = vi.spyOn(component.conversationSelected, 'emit');
    component.onSelectConversation(TEACHER_CONVERSATIONS[1]);
    expect(emitSpy).toHaveBeenCalledWith(TEACHER_CONVERSATIONS[1]);
  });

  it('should reset filters and emit viewAllClicked on onViewAll()', () => {
    component.activeTab.set('Parents');
    component.searchQuery.set('test');
    const viewAllSpy = vi.spyOn(component.viewAllClicked, 'emit');

    component.onViewAll();
    expect(component.activeTab()).toBe('All');
    expect(component.searchQuery()).toBe('');
    expect(viewAllSpy).toHaveBeenCalled();
  });
});
