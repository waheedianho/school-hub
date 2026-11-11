import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-reports-share-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-modal.html',
  styleUrls: ['./share-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsShareModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isShareLeadershipModalOpen;

  readonly recipients = signal<string[]>([
    'Principal & Head of School',
    'Board of Governors',
    'Academic Quality Committee',
  ]);

  readonly executiveNote = signal<string>('');

  onClose(): void {
    this.store.closeShareLeadershipModal();
  }

  toggleRecipient(role: string): void {
    const list = this.recipients();
    if (list.includes(role)) {
      this.recipients.set(list.filter((r) => r !== role));
    } else {
      this.recipients.set([...list, role]);
    }
  }

  onNoteChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.executiveNote.set(target.value);
  }

  onSubmit(): void {
    this.store.shareReportWithLeadership(this.recipients());
  }
}
