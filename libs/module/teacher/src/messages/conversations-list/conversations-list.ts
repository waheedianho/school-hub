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
  ConversationFilter,
  ConversationItem,
} from '../../data/teacher-messages.data';

@Component({
  selector: 'school-hub-conversations-list',
  imports: [FormsModule],
  templateUrl: './conversations-list.html',
  styleUrl: './conversations-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsListComponent {
  readonly conversations = input.required<ConversationItem[]>();
  readonly selectedConversationId = input<string | null>(null);

  readonly conversationSelected = output<ConversationItem>();
  readonly viewAllClicked = output<void>();

  readonly activeTab = signal<ConversationFilter>('All');
  readonly searchQuery = signal<string>('');

  readonly tabs: ConversationFilter[] = [
    'All',
    'Learners',
    'Parents',
    'Classes',
    'Unread',
  ];

  readonly filteredConversations = computed(() => {
    const list = this.conversations();
    const tab = this.activeTab();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter((item) => {
      // Tab filter
      if (tab === 'Learners' && item.type !== 'learner') {
        return false;
      }
      if (tab === 'Parents' && item.type !== 'parent') {
        return false;
      }
      if (tab === 'Classes' && item.type !== 'class') {
        return false;
      }
      if (tab === 'Unread' && item.unreadCount === 0) {
        return false;
      }

      // Search filter
      if (query) {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSub = item.subtitle.toLowerCase().includes(query);
        const matchesMsg = item.lastMessage.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesMsg) {
          return false;
        }
      }

      return true;
    });
  });

  onSelectTab(tab: ConversationFilter): void {
    this.activeTab.set(tab);
  }

  onSelectConversation(item: ConversationItem): void {
    this.conversationSelected.emit(item);
  }

  onViewAll(): void {
    this.activeTab.set('All');
    this.searchQuery.set('');
    this.viewAllClicked.emit();
  }
}
