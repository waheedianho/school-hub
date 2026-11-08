import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  INITIAL_CHAT_MESSAGES,
  TEACHER_CONVERSATIONS,
} from '../../data/teacher-messages.data';
import { ChatThreadComponent } from './chat-thread';

describe('ChatThreadComponent', () => {
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatThreadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatThreadComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conversation', TEACHER_CONVERSATIONS[0]);
    fixture.componentRef.setInput(
      'messages',
      INITIAL_CHAT_MESSAGES['conv-1'] || [],
    );
    fixture.componentRef.setInput('infoPanelOpen', true);
    fixture.detectChanges();
  });

  it('should create the chat thread component', () => {
    expect(component).toBeTruthy();
  });

  it('should render conversation header details', () => {
    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelector('.user-name');
    expect(name?.textContent?.trim()).toBe('Hajia A. Ibrahim');

    const subtitle = el.querySelector('.user-subtitle');
    expect(subtitle?.textContent?.trim()).toContain('Parent of Maryam Ibrahim');
  });

  it('should render incoming and outgoing messages', () => {
    const el: HTMLElement = fixture.nativeElement;
    const incomingRows = el.querySelectorAll('.incoming-row');
    const outgoingRows = el.querySelectorAll('.outgoing-row');
    expect(incomingRows.length).toBe(2);
    expect(outgoingRows.length).toBe(2);
  });

  it('should send a message on onSend() and reset input', () => {
    const emitSpy = vi.spyOn(component.messageSent, 'emit');
    component.messageInput.set('Hello there!');
    component.onSend();

    expect(emitSpy).toHaveBeenCalledWith({
      text: 'Hello there!',
      attachment: undefined,
    });
    expect(component.messageInput()).toBe('');
  });

  it('should send a message on Enter keydown', () => {
    const emitSpy = vi.spyOn(component.messageSent, 'emit');
    component.messageInput.set('Quick note');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventSpy = vi.spyOn(event, 'preventDefault');

    component.onKeyDown(event);
    expect(preventSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({
      text: 'Quick note',
      attachment: undefined,
    });
  });

  it('should not send if empty', () => {
    const emitSpy = vi.spyOn(component.messageSent, 'emit');
    component.messageInput.set('   ');
    component.onSend();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should handle file attachment and remove it', () => {
    const file = new File(['content'], 'test.pdf', {
      type: 'application/pdf',
    });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component.onFileAttached(event);
    expect(component.attachedFile()).toEqual(
      expect.objectContaining({
        name: 'test.pdf',
        format: 'PDF',
      }),
    );

    component.onRemoveAttachment();
    expect(component.attachedFile()).toBeNull();
  });

  it('should emit toggleInfoPanel on onToggleInfo()', () => {
    const emitSpy = vi.spyOn(component.toggleInfoPanel, 'emit');
    component.onToggleInfo();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit call events on onVideoCall and onVoiceCall', () => {
    const videoSpy = vi.spyOn(component.startVideoCall, 'emit');
    const voiceSpy = vi.spyOn(component.startVoiceCall, 'emit');

    component.onVideoCall();
    expect(videoSpy).toHaveBeenCalledWith(TEACHER_CONVERSATIONS[0]);

    component.onVoiceCall();
    expect(voiceSpy).toHaveBeenCalledWith(TEACHER_CONVERSATIONS[0]);
  });
});
