import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SESSION_CHAT_MESSAGES } from '../../../data/teacher-live-classes.data';
import { SessionChatComponent } from './session-chat';

describe('SessionChatComponent', () => {
  let component: SessionChatComponent;
  let fixture: ComponentFixture<SessionChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial chat messages', () => {
    const rows = fixture.nativeElement.querySelectorAll('.chat-message-row');
    expect(rows.length).toBe(SESSION_CHAT_MESSAGES.length);
  });

  it('should append a new message when sent', () => {
    component.newMessageText.set('Hello class!');
    component.sendMessage();
    fixture.detectChanges();

    const messages = component.messages();
    expect(messages.length).toBe(SESSION_CHAT_MESSAGES.length + 1);
    expect(messages[messages.length - 1].message).toBe('Hello class!');
    expect(component.newMessageText()).toBe('');
  });
});
