import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SchoolQuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tone: 'success' | 'primary' | 'purple' | 'danger';
}

@Component({
  selector: 'school-hub-schools-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schools-quick-actions.html',
  styleUrl: './schools-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsQuickActionsComponent {
  readonly actionTriggered = output<string>();

  readonly actions: SchoolQuickAction[] = [
    {
      id: 'assign-plan',
      title: 'Assign Plan',
      subtitle: 'Assign or change plans',
      icon: 'credit_card',
      tone: 'success',
    },
    {
      id: 'verify-setup',
      title: 'Verify Setup',
      subtitle: 'Review onboarding status',
      icon: 'verified_user',
      tone: 'primary',
    },
    {
      id: 'send-reminder',
      title: 'Send Reminder',
      subtitle: 'Email setup or billing',
      icon: 'mail',
      tone: 'purple',
    },
    {
      id: 'suspend-access',
      title: 'Suspend Access',
      subtitle: 'Restrict school access',
      icon: 'block',
      tone: 'danger',
    },
  ];

  triggerAction(id: string): void {
    this.actionTriggered.emit(id);
  }

  getToneBg(tone: string): string {
    switch (tone) {
      case 'success':
        return 'bg-emerald-50 text-emerald-600';
      case 'primary':
        return 'bg-blue-50 text-blue-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'danger':
        return 'bg-rose-50 text-rose-600';
      default:
        return 'bg-slate-50 text-slate-600';
    }
  }
}
