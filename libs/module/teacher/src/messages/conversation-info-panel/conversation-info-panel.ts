import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  COMMUNICATION_GUIDELINES,
  AnnouncementItem,
  ConversationItem,
  MESSAGE_QUICK_TEMPLATES,
  MessageQuickTemplate,
  RECENT_ANNOUNCEMENTS,
} from '../../data/teacher-messages.data';

@Component({
  selector: 'school-hub-conversation-info-panel',
  imports: [],
  templateUrl: './conversation-info-panel.html',
  styleUrl: './conversation-info-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationInfoPanelComponent {
  readonly conversation = input<ConversationItem | null>(null);
  readonly templates = input<MessageQuickTemplate[]>(MESSAGE_QUICK_TEMPLATES);
  readonly announcements = input<AnnouncementItem[]>(RECENT_ANNOUNCEMENTS);
  readonly guidelines = input<string[]>(COMMUNICATION_GUIDELINES);

  readonly templateSelected = output<MessageQuickTemplate>();
  readonly viewAllAnnouncements = output<void>();
  readonly announcementClicked = output<AnnouncementItem>();

  onSelectTemplate(tpl: MessageQuickTemplate): void {
    this.templateSelected.emit(tpl);
  }

  onViewAllAnnouncements(): void {
    this.viewAllAnnouncements.emit();
  }

  onAnnouncementClick(ann: AnnouncementItem): void {
    this.announcementClicked.emit(ann);
  }
}
