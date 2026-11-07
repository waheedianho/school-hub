import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UnreadMessagesComponent } from './unread-messages';
import { TEACHER_UNREAD_MESSAGES_DATA } from '../../data/teacher-dashboard.data';

describe('UnreadMessagesComponent', () => {
  let component: UnreadMessagesComponent;
  let fixture: ComponentFixture<UnreadMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnreadMessagesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UnreadMessagesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('messages', TEACHER_UNREAD_MESSAGES_DATA);
    fixture.detectChanges();
  });

  it('should create and render message list', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.message-item');
    expect(items.length).toBe(3);
  });

  it('should display sender names, snippets, and unread badges', () => {
    const senders = fixture.nativeElement.querySelectorAll('.sender-name');
    expect(senders[0].textContent).toContain('Vice Principal (Academics)');
    const snippets = fixture.nativeElement.querySelectorAll('.msg-snippet');
    expect(snippets[0].textContent).toContain(
      'Please submit term plan for review.',
    );
    const badges = fixture.nativeElement.querySelectorAll('.unread-badge');
    expect(badges.length).toBe(3);
    expect(badges[0].textContent.trim()).toBe('2');
  });
});
