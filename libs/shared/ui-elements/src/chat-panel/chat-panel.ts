import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
export interface ChatMessage {
  id: string;
  name: string;
  initials: string;
  image?: string;
  role: 'tutor' | 'learner' | 'you';
  time: string;
  text: string;
  attachments?: readonly { id: string; name: string; detail: string }[];
  reactions: readonly {
    id: 'heart' | 'like';
    label: string;
    icon: string;
    count: number;
    active: boolean;
  }[];
}
@Component({
  selector: 'school-hub-chat-panel',
  templateUrl: './chat-panel.html',
  styleUrls: ['./chat-panel.scss', './chat-conversation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.conversation]': 'appearance() === "conversation"' },
})
export class ChatPanelComponent {
  readonly messages = input.required<readonly ChatMessage[]>();
  readonly draft = input('');
  readonly enabled = input(true);
  readonly hint = input('');
  readonly appearance = input<'class' | 'conversation'>('class');
  readonly label = input('Class chat');
  readonly composerLabel = input('Class message');
  readonly composerId = input('class-chat-message');
  readonly placeholder = input('Type a message…');
  readonly sendLabel = input('Send local message');
  readonly sendText = input('');
  readonly maxLength = input(1000);
  readonly showEmoji = input(true);
  readonly canSendEmpty = input(false);
  readonly draftChanged = output<string>();
  readonly sent = output<string>();
  readonly reacted = output<{ id: string; reaction: 'heart' | 'like' }>();
  readonly attachmentOpened = output<string>();
  protected readonly emojiOpen = signal(false);
  protected readonly emojis = ['👍', '👏', '💜', '😊', '🎉'];
  private readonly list = viewChild<ElementRef<HTMLDivElement>>('messageList');
  private readonly injector = inject(Injector);
  constructor() {
    let previousLastId: string | undefined;
    effect(() => {
      const messages = this.messages();
      const last = messages[messages.length - 1];
      const appended =
        !!previousLastId &&
        last?.id !== previousLastId &&
        messages.some((message) => message.id === previousLastId);
      previousLastId = last?.id;
      // Open a conversation at its beginning; scroll to a new local follow-up.
      const conversation = this.appearance() === 'conversation';
      if (!conversation && last?.role !== 'you') return;
      afterNextRender(
        () => {
          const element = this.list()?.nativeElement;
          if (element)
            element.scrollTop =
              !conversation || (appended && last?.role === 'you')
                ? element.scrollHeight
                : 0;
        },
        { injector: this.injector },
      );
    });
  }
  protected edit(event: Event): void {
    this.draftChanged.emit(
      (event.target as HTMLTextAreaElement).value.slice(0, this.maxLength()),
    );
  }
  protected send(event: Event): void {
    event.preventDefault();
    if (this.enabled() && (this.draft().trim() || this.canSendEmpty())) {
      this.sent.emit(this.draft());
      this.emojiOpen.set(false);
    }
  }
  protected keydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing)
      this.send(event);
    if (event.key === 'Escape') this.emojiOpen.set(false);
  }
}
