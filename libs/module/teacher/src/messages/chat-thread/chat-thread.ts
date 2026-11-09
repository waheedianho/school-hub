import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ChatMessage,
  ChatMessageAttachment,
  ConversationItem,
} from '../../data/teacher-messages.data';

@Component({
  selector: 'school-hub-chat-thread',
  imports: [FormsModule],
  templateUrl: './chat-thread.html',
  styleUrl: './chat-thread.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatThreadComponent {
  readonly conversation = input<ConversationItem | null>(null);
  readonly messages = input.required<ChatMessage[]>();
  readonly infoPanelOpen = input<boolean>(true);

  readonly messageSent = output<{
    text: string;
    attachment?: ChatMessageAttachment;
  }>();
  readonly toggleInfoPanel = output<void>();
  readonly startVideoCall = output<ConversationItem>();
  readonly startVoiceCall = output<ConversationItem>();

  readonly messageInput = signal<string>('');
  readonly attachedFile = signal<ChatMessageAttachment | null>(null);

  readonly charCount = computed(() => this.messageInput().length);

  onSend(): void {
    const text = this.messageInput().trim();
    const attachment = this.attachedFile();

    if (!text && !attachment) {
      return;
    }

    this.messageSent.emit({
      text,
      attachment: attachment || undefined,
    });

    this.messageInput.set('');
    this.attachedFile.set(null);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  onFileAttached(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.files && inputEl.files.length > 0) {
      const file = inputEl.files[0];
      const sizeKB = Math.round(file.size / 1024);
      const sizeStr =
        sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
      const ext = (file.name.split('.').pop() || 'FILE').toUpperCase() as
        | 'PDF'
        | 'DOCX'
        | 'XLSX'
        | 'MP4'
        | 'IMG';

      this.attachedFile.set({
        name: file.name,
        format: ext,
        size: sizeStr,
      });
    }
  }

  onRemoveAttachment(): void {
    this.attachedFile.set(null);
  }

  onToggleInfo(): void {
    this.toggleInfoPanel.emit();
  }

  onVideoCall(): void {
    const conv = this.conversation();
    if (conv) {
      this.startVideoCall.emit(conv);
    }
  }

  onVoiceCall(): void {
    const conv = this.conversation();
    if (conv) {
      this.startVoiceCall.emit(conv);
    }
  }

  onDownloadAttachment(attachment?: ChatMessageAttachment): void {
    if (attachment) {
      // Triggers local download simulation
    }
  }
}
