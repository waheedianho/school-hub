import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AnnouncementItem,
  ChatMessage,
  ChatMessageAttachment,
  COMMUNICATION_GUIDELINES,
  ConversationItem,
  INITIAL_CHAT_MESSAGES,
  MESSAGE_QUICK_TEMPLATES,
  MessageQuickTemplate,
  RECENT_ANNOUNCEMENTS,
  TEACHER_CONVERSATIONS,
} from '../data/teacher-messages.data';
import { ChatThreadComponent } from './chat-thread/chat-thread';
import { ConversationInfoPanelComponent } from './conversation-info-panel/conversation-info-panel';
import { ConversationsListComponent } from './conversations-list/conversations-list';

@Component({
  selector: 'school-hub-teacher-messages',
  imports: [
    RouterLink,
    ConversationsListComponent,
    ChatThreadComponent,
    ConversationInfoPanelComponent,
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherMessagesComponent {
  private readonly router = inject(Router);

  readonly conversations = signal<ConversationItem[]>([
    ...TEACHER_CONVERSATIONS,
  ]);
  readonly selectedConversation = signal<ConversationItem | null>(
    TEACHER_CONVERSATIONS[0],
  );
  readonly chatMessagesMap = signal<Record<string, ChatMessage[]>>({
    ...INITIAL_CHAT_MESSAGES,
  });

  readonly isInfoPanelOpen = signal<boolean>(true);
  readonly toastMessage = signal<string | null>(null);

  readonly templates = signal<MessageQuickTemplate[]>(MESSAGE_QUICK_TEMPLATES);
  readonly announcements = signal<AnnouncementItem[]>(RECENT_ANNOUNCEMENTS);
  readonly guidelines = signal<string[]>(COMMUNICATION_GUIDELINES);

  readonly currentMessages = computed(() => {
    const current = this.selectedConversation();
    if (!current) {
      return [];
    }
    return this.chatMessagesMap()[current.id] || [];
  });

  onCreateAnnouncement(): void {
    this.router.navigate(['/teacher/messages/create-announcement']);
  }

  onNewMessage(): void {
    this.showToast('Starting a new message conversation...');
  }

  onConversationSelected(conv: ConversationItem): void {
    this.selectedConversation.set(conv);

    // Mark as read
    if (conv.unreadCount > 0) {
      this.conversations.update((list) =>
        list.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c)),
      );
    }
  }

  onMessageSent(payload: {
    text: string;
    attachment?: ChatMessageAttachment;
  }): void {
    const current = this.selectedConversation();
    if (!current) {
      return;
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: current.id,
      sender: 'outgoing',
      senderName: 'Mr. Tunde',
      text: payload.text,
      time: 'Just now',
      status: 'read',
      attachment: payload.attachment,
    };

    // Update messages map
    this.chatMessagesMap.update((map) => {
      const existing = map[current.id] || [];
      return {
        ...map,
        [current.id]: [...existing, newMsg],
      };
    });

    // Update conversation last message & time
    this.conversations.update((list) =>
      list.map((c) =>
        c.id === current.id
          ? {
              ...c,
              lastMessage: payload.text || 'Sent an attachment',
              time: 'Just now',
            }
          : c,
      ),
    );
  }

  onToggleInfoPanel(): void {
    this.isInfoPanelOpen.update((open) => !open);
  }

  onTemplateSelected(tpl: MessageQuickTemplate): void {
    this.onMessageSent({
      text: tpl.templateText,
    });
    this.showToast(`Template "${tpl.label}" sent!`);
  }

  onAnnouncementClicked(ann: AnnouncementItem): void {
    this.showToast(`Announcement: ${ann.title}`);
  }

  onViewAllAnnouncements(): void {
    this.onCreateAnnouncement();
  }

  onStartVideoCall(conv: ConversationItem): void {
    this.showToast(`Starting video call with ${conv.name}...`);
  }

  onStartVoiceCall(conv: ConversationItem): void {
    this.showToast(`Starting voice call with ${conv.name}...`);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 3000);
  }
}
