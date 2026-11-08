import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  ANNOUNCEMENT_GUIDELINES,
  ChatMessageAttachment,
  MessageQuickTemplate,
} from '../../data/teacher-messages.data';

export interface RecipientCountInfo {
  audience: string;
  className: string;
  learners: number;
  parents: number;
  total: number;
}

@Component({
  selector: 'school-hub-create-announcement',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-announcement.html',
  styleUrl: './create-announcement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAnnouncementComponent {
  private readonly router = inject(Router);

  // Form Fields
  readonly announcementTitle = signal<string>(
    'Mid-Term Assessment Notice – JSS 1A',
  );
  readonly audience = signal<string>('Selected Class');
  readonly selectedClass = signal<string>('JSS 1A');
  readonly subject = signal<string>('Mathematics');
  readonly priority = signal<'High' | 'Medium' | 'Low' | 'Urgent'>('Medium');

  readonly messageContent = signal<string>(
    `Dear Learners of JSS 1A,

This is to inform you that the Mid-Term Assessment for Mathematics will hold as scheduled below.
• Date: Friday, May 24, 2024
• Time: 10:00 AM – 12:00 PM
• Venue: Main Hall

Please ensure you revise all topics covered so far and arrive on time. Bring all required materials including your calculator, mathematical set, and writing tools.

Thank you.`,
  );

  // Delivery Options
  readonly inAppNotification = signal<boolean>(true);
  readonly sendEmail = signal<boolean>(true);
  readonly parentCopy = signal<boolean>(true);
  readonly scheduleForLater = signal<boolean>(false);

  // Schedule
  readonly sendDate = signal<string>('May 22, 2024');
  readonly sendTime = signal<string>('10:00 AM');

  // Attachment
  readonly attachedFile = signal<ChatMessageAttachment | null>({
    name: 'Mid-Term_Topics_List.pdf',
    format: 'PDF',
    size: '412 KB',
  });
  readonly isDragging = signal<boolean>(false);

  // Toast / State
  readonly toastMessage = signal<string | null>(null);
  readonly isSending = signal<boolean>(false);

  // Guidelines
  readonly guidelines = signal<string[]>(ANNOUNCEMENT_GUIDELINES);

  readonly audienceOptions = [
    'All Classes',
    'Selected Class',
    'Learners Only',
    'Parents Only',
    'Subject Specific',
  ];

  readonly classOptions = [
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'JSS 2B',
    'JSS 3A',
  ];

  readonly subjectOptions = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Civic Education',
    'Social Studies',
  ];

  readonly priorityOptions: Array<'High' | 'Medium' | 'Low' | 'Urgent'> = [
    'High',
    'Medium',
    'Low',
    'Urgent',
  ];

  readonly quickTemplates: MessageQuickTemplate[] = [
    {
      id: 'assessment-notice',
      label: 'Assessment Notice',
      templateText:
        'Dear Learners,\nPlease be informed of our upcoming assessment scheduled for next week. Please prepare and review your syllabus topics.',
    },
    {
      id: 'homework-reminder',
      label: 'Homework Reminder',
      templateText:
        'Dear Learners and Parents,\nThis is a reminder that the current homework assignment is due tomorrow. Please ensure timely submission.',
    },
    {
      id: 'live-class-reminder',
      label: 'Live Class Reminder',
      templateText:
        'Dear Class,\nOur live class will commence at the scheduled time. Please log in 5 minutes early with your materials ready.',
    },
    {
      id: 'holiday-notice',
      label: 'Holiday Notice',
      templateText:
        'Dear Parents and Learners,\nSchool will be closed for the public holiday break. Regular classes will resume on the stated date.',
    },
  ];

  readonly charCount = computed(() => this.messageContent().length);

  readonly recipientSummary = computed<RecipientCountInfo>(() => {
    const cls = this.selectedClass();
    const aud = this.audience();

    let learners = 28;
    let parents = 28;

    if (aud === 'Learners Only') {
      parents = 0;
    } else if (aud === 'Parents Only') {
      learners = 0;
    } else if (aud === 'All Classes') {
      learners = 140;
      parents = 140;
    }

    return {
      audience: aud,
      className: cls,
      learners,
      parents,
      total: learners + parents,
    };
  });

  onCancel(): void {
    this.router.navigate(['/teacher/messages']);
  }

  onSaveDraft(): void {
    this.showToast('Announcement draft saved successfully');
  }

  onSendAnnouncement(): void {
    if (!this.announcementTitle().trim()) {
      this.showToast('Please enter an announcement title');
      return;
    }

    if (!this.messageContent().trim()) {
      this.showToast('Please enter announcement message content');
      return;
    }

    this.isSending.set(true);
    setTimeout(() => {
      this.isSending.set(false);
      this.showToast('Announcement sent successfully!');
      setTimeout(() => {
        this.router.navigate(['/teacher/messages']);
      }, 1000);
    }, 600);
  }

  onApplyTemplate(tpl: MessageQuickTemplate): void {
    this.messageContent.set(tpl.templateText);
    this.showToast(`Applied "${tpl.label}" template`);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
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

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
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

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 3500);
  }
}
