import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuperAdminStore } from '../../data/super-admin.store';
import {
  FileFormat,
  ResourceStatus,
  ResourceType,
} from '../../data/super-admin-resources.models';
import { ResourcesBottomMetricsComponent } from '../resources-bottom-metrics/resources-bottom-metrics';

@Component({
  selector: 'school-hub-upload-resource',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ResourcesBottomMetricsComponent,
  ],
  templateUrl: './upload-resource.html',
  styleUrl: './upload-resource.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadResourceComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  // Form Signals
  readonly title = signal<string>('JSS1 Mathematics – Linear Equations Notes');
  readonly description = signal<string>(
    'Comprehensive lecture notes, solved examples, and practice exercises on single-variable linear equations.',
  );
  readonly resourceType = signal<ResourceType>('Lesson Notes');
  readonly linkedPack = signal<string>('JSS1 Mathematics Pack');
  readonly linkedTopic = signal<string>('Linear Equations');
  readonly linkedSubject = signal<string>('Mathematics');
  readonly classLevel = signal<string>('JSS1');
  readonly termWeek = signal<string>('Term 2, Week 4');
  readonly tagInput = signal<string>('');
  readonly tags = signal<string[]>([
    'algebra',
    'linear-equations',
    'mathematics',
    'jss1',
  ]);

  // File Upload
  readonly uploadedFileName = signal<string>(
    'JSS1 Mathematics – Linear Equations Notes.pdf',
  );
  readonly uploadedFileSize = signal<string>('6.4 MB');
  readonly uploadedFileFormat = signal<FileFormat>('PDF');
  readonly uploadProgress = signal<number>(68);
  readonly isUploading = signal<boolean>(true);

  // Audience & Access
  readonly visibility = signal<'All Schools' | 'Selected Schools'>(
    'All Schools',
  );
  readonly audienceLearners = signal<boolean>(true);
  readonly audienceTeachers = signal<boolean>(true);
  readonly audienceSchoolAdmins = signal<boolean>(true);
  readonly audienceSuperAdmins = signal<boolean>(true);
  readonly audienceParents = signal<boolean>(false);
  readonly downloadPermission = signal<string>(
    'Allow authenticated users to download',
  );
  readonly lowDataVersion = signal<boolean>(true);

  // Metadata & Quality
  readonly language = signal<string>('English');
  readonly estimatedStudyTime = signal<string>('30–60 minutes');
  readonly version = signal<string>('1.0');
  readonly author = signal<string>('Curriculum Development Team');
  readonly license = signal<string>('All rights reserved');
  readonly approvalStatus = signal<ResourceStatus>('Draft');
  readonly reviewNotes = signal<string>('');
  readonly publishDate = signal<string>('May 8, 2025');

  readonly toastMessage = signal<string | null>(null);

  addTag(): void {
    const text = this.tagInput().trim().toLowerCase();
    if (text && !this.tags().includes(text)) {
      this.tags.update((t) => [...t, text]);
      this.tagInput.set('');
    }
  }

  removeTag(tag: string): void {
    this.tags.update((t) => t.filter((item) => item !== tag));
  }

  cancelUpload(): void {
    this.isUploading.set(false);
    this.uploadProgress.set(0);
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }

  saveDraft(): void {
    this.submitWithStatus('Draft');
  }

  submitForReview(): void {
    this.submitWithStatus('Pending Review');
  }

  publishResource(): void {
    this.submitWithStatus('Approved');
  }

  private submitWithStatus(status: ResourceStatus): void {
    if (!this.title().trim() || !this.description().trim()) {
      this.showToast('Please provide a resource title and description.');
      return;
    }

    const selectedAudience: string[] = [];
    if (this.audienceLearners()) selectedAudience.push('Learners');
    if (this.audienceTeachers()) selectedAudience.push('Teachers');
    if (this.audienceSchoolAdmins()) selectedAudience.push('School Admins');
    if (this.audienceSuperAdmins()) selectedAudience.push('Super Admins');
    if (this.audienceParents()) selectedAudience.push('Parents');

    this.store.createResource({
      title: this.title().trim(),
      description: this.description().trim(),
      resourceType: this.resourceType(),
      linkedPack: this.linkedPack(),
      linkedTopic: this.linkedTopic(),
      linkedSubject: this.linkedSubject(),
      classLevel: this.classLevel(),
      termWeek: this.termWeek(),
      tags: this.tags(),
      fileName: this.uploadedFileName(),
      fileSize: this.uploadedFileSize(),
      fileFormat: this.uploadedFileFormat(),
      visibility: this.visibility(),
      audience: selectedAudience,
      downloadPermission: this.downloadPermission(),
      lowDataVersion: this.lowDataVersion(),
      language: this.language(),
      estimatedStudyTime: this.estimatedStudyTime(),
      version: this.version(),
      author: this.author(),
      license: this.license(),
      approvalStatus: status,
      reviewNotes: this.reviewNotes(),
      publishDate: this.publishDate(),
    });

    this.showToast(
      `Resource "${this.title()}" successfully saved with status: ${status}.`,
    );

    setTimeout(() => {
      this.router.navigate(['/super-admin/resources-library']);
    }, 1200);
  }
}
