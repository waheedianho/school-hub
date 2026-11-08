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
  RECENT_UPLOAD_TIPS,
  RESOURCE_UPLOAD_GUIDELINES,
  ResourceQuickAction,
  UPLOAD_PAGE_QUICK_ACTIONS,
} from '../../data/teacher-resources.data';

export interface UploadedFileInfo {
  name: string;
  size: string;
  type: string;
}

@Component({
  selector: 'school-hub-upload-resource',
  imports: [RouterLink, FormsModule],
  templateUrl: './upload-resource.html',
  styleUrl: './upload-resource.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadResourceComponent {
  private readonly router = inject(Router);

  // Form Fields
  readonly resourceTitle = signal<string>('Whole Numbers Lesson Note');
  readonly selectedClass = signal<string>('JSS 1A');
  readonly selectedSubject = signal<string>('Mathematics');
  readonly topic = signal<string>('Whole Numbers');
  readonly resourceType = signal<string>('Lesson Note');
  readonly audience = signal<string>('Learners');
  readonly description = signal<string>('');

  // Settings
  readonly isDownloadable = signal<boolean>(true);
  readonly isLowData = signal<boolean>(false);
  readonly isShareImmediately = signal<boolean>(true);
  readonly isAddToDeliveryPack = signal<boolean>(false);
  readonly tags = signal<string[]>(['fractions', 'practice', 'exam prep']);
  readonly currentTagInput = signal<string>('');

  // Optional Fields
  readonly linkedWeek = signal<string>('');
  readonly estimatedStudyTime = signal<string>('30 minutes');
  readonly visibility = signal<string>('Visible to class');

  // File Upload
  readonly uploadedFile = signal<UploadedFileInfo | null>(null);
  readonly isDragging = signal<boolean>(false);

  // Status / Feedback
  readonly toastMessage = signal<string | null>(null);
  readonly isSubmitting = signal<boolean>(false);

  // Static Data
  readonly guidelines = signal<string[]>(RESOURCE_UPLOAD_GUIDELINES);
  readonly tips = signal<string[]>(RECENT_UPLOAD_TIPS);
  readonly quickActions = signal<ResourceQuickAction[]>(
    UPLOAD_PAGE_QUICK_ACTIONS,
  );

  readonly classList = [
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'JSS 2B',
    'JSS 3A',
    'SSS 1A',
  ];

  readonly subjectList = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Civic Education',
    'Social Studies',
  ];

  readonly resourceTypeList = [
    'Lesson Note',
    'Worksheet',
    'Slides',
    'Video',
    'Answer Guide',
    'PDF',
  ];

  readonly audienceList = [
    'Learners',
    'Teachers Only',
    'Learners & Parents',
    'Public',
  ];

  readonly weekList = [
    'Select week (optional)',
    'Week 1',
    'Week 2',
    'Week 3',
    'Week 4',
    'Week 5',
    'Week 6',
  ];

  readonly visibilityList = ['Visible to class', 'Private draft', 'Scheduled'];

  readonly charCount = computed(() => this.description().length);

  onCancel(): void {
    this.router.navigate(['/teacher/resources']);
  }

  onSaveDraft(): void {
    this.showToast('Draft saved successfully');
  }

  onSubmit(): void {
    if (!this.resourceTitle().trim()) {
      this.showToast('Please enter a resource title');
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showToast('Resource uploaded successfully!');
      setTimeout(() => {
        this.router.navigate(['/teacher/resources']);
      }, 1000);
    }, 600);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      this.uploadedFile.set({
        name: file.name,
        size: `${sizeMB} MB`,
        type: file.type || file.name.split('.').pop()?.toUpperCase() || 'FILE',
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
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      this.uploadedFile.set({
        name: file.name,
        size: `${sizeMB} MB`,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      });
    }
  }

  onRemoveFile(): void {
    this.uploadedFile.set(null);
  }

  onAddTag(event?: KeyboardEvent): void {
    if (event && event.key !== 'Enter' && event.key !== ',') {
      return;
    }
    if (event) {
      event.preventDefault();
    }

    const val = this.currentTagInput().trim().replace(/,/g, '');
    if (val && !this.tags().includes(val)) {
      this.tags.update((t) => [...t, val]);
      this.currentTagInput.set('');
    }
  }

  onRemoveTag(tagToRemove: string): void {
    this.tags.update((tags) => tags.filter((t) => t !== tagToRemove));
  }

  onQuickAction(actionId: string): void {
    switch (actionId) {
      case 'create-delivery-pack':
        this.router.navigate(['/teacher/delivery-packs']);
        break;
      case 'add-video-lesson':
        this.resourceType.set('Video');
        this.showToast('Resource type set to Video');
        break;
      case 'create-worksheet':
        this.router.navigate(['/teacher/worksheets']);
        break;
      case 'go-to-library':
        this.router.navigate(['/teacher/resources']);
        break;
      default:
        break;
    }
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
