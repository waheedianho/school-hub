import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import {
  MESSAGE_QUICK_TEMPLATES,
  RECENT_ANNOUNCEMENTS,
  TEACHER_CONVERSATIONS,
} from '../data/teacher-messages.data';
import { TeacherMessagesComponent } from './messages';

describe('TeacherMessagesComponent', () => {
  let component: TeacherMessagesComponent;
  let fixture: ComponentFixture<TeacherMessagesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherMessagesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherMessagesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the communication dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title and subtitle', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('.page-title');
    expect(title?.textContent?.trim()).toBe('Communication');
  });

  it('should navigate to create announcement on onCreateAnnouncement()', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onCreateAnnouncement();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/teacher/messages/create-announcement',
    ]);
  });

  it('should show toast on onNewMessage()', () => {
    component.onNewMessage();
    expect(component.toastMessage()).toContain('new message conversation');
  });

  it('should select conversation and clear unread count', () => {
    const convWithUnread = TEACHER_CONVERSATIONS.find((c) => c.unreadCount > 0);
    expect(convWithUnread).toBeDefined();

    if (convWithUnread) {
      component.onConversationSelected(convWithUnread);
      expect(component.selectedConversation()?.id).toBe(convWithUnread.id);

      const inList = component
        .conversations()
        .find((c) => c.id === convWithUnread.id);
      expect(inList?.unreadCount).toBe(0);
    }
  });

  it('should add message on onMessageSent()', () => {
    const initialCount = component.currentMessages().length;
    component.onMessageSent({
      text: 'Testing new message sending',
    });

    const updated = component.currentMessages();
    expect(updated.length).toBe(initialCount + 1);
    expect(updated[updated.length - 1].text).toBe(
      'Testing new message sending',
    );
  });

  it('should toggle info panel', () => {
    const initial = component.isInfoPanelOpen();
    component.onToggleInfoPanel();
    expect(component.isInfoPanelOpen()).toBe(!initial);
  });

  it('should send template on onTemplateSelected()', () => {
    const sendSpy = vi.spyOn(component, 'onMessageSent');
    component.onTemplateSelected(MESSAGE_QUICK_TEMPLATES[0]);

    expect(sendSpy).toHaveBeenCalledWith({
      text: MESSAGE_QUICK_TEMPLATES[0].templateText,
    });
    expect(component.toastMessage()).toContain(
      MESSAGE_QUICK_TEMPLATES[0].label,
    );
  });

  it('should show feedback on video and voice call clicks', () => {
    component.onStartVideoCall(TEACHER_CONVERSATIONS[0]);
    expect(component.toastMessage()).toContain('Starting video call');

    component.onStartVoiceCall(TEACHER_CONVERSATIONS[0]);
    expect(component.toastMessage()).toContain('Starting voice call');
  });

  it('should handle announcement clicks', () => {
    component.onAnnouncementClicked(RECENT_ANNOUNCEMENTS[0]);
    expect(component.toastMessage()).toContain(RECENT_ANNOUNCEMENTS[0].title);
  });
});
