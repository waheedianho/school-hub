import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SESSION_CHAT_MESSAGES,
  SessionChatMessage,
} from '../../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-session-chat',
  imports: [FormsModule],
  templateUrl: './session-chat.html',
  styleUrl: './session-chat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionChatComponent {
  readonly initialMessages = input<SessionChatMessage[]>(SESSION_CHAT_MESSAGES);
  readonly messages = signal<SessionChatMessage[]>([...SESSION_CHAT_MESSAGES]);
  readonly newMessageText = signal<string>('');

  sendMessage(): void {
    const text = this.newMessageText().trim();
    if (!text) return;

    const newMsg: SessionChatMessage = {
      id: 'chat-' + Date.now(),
      senderName: 'Tunde (Tutor)',
      role: 'tutor',
      time: 'Just now',
      message: text,
      avatarText: 'TA',
      avatarColor: '#4f46e5',
      isSelf: true,
    };

    this.messages.update((msgs) => [...msgs, newMsg]);
    this.newMessageText.set('');
  }
}
