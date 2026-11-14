import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuperAdminStore } from '../../data/super-admin.store';
import {
  SafeguardingCaseCategory,
  SafeguardingSeverity,
} from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-create-case',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './create-case.html',
  styleUrl: './create-case.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCaseComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  // Form Signals
  readonly caseTitle = signal<string>('');
  readonly selectedInstitution = signal<string>('');
  readonly selectedCategory = signal<SafeguardingCaseCategory>(
    'Inappropriate Communication',
  );
  readonly selectedSeverity = signal<SafeguardingSeverity>('High');
  readonly incidentDateTime = signal<string>('May 30, 2025 02:15 PM');
  readonly reportedBy = signal<string>('');
  readonly referenceId = signal<string>('CASE-2025-000123');

  // People Involved
  readonly learnerName = signal<string>('');
  readonly staffName = signal<string>('');
  readonly additionalUsers = signal<string>('');
  readonly selectedGrade = signal<string>('');
  readonly parentLinked = signal<string>('');

  // Description
  readonly description = signal<string>('');
  readonly locationContext = signal<string>('');
  readonly tags = signal<string[]>(['communication-risk', 'student-safety']);
  readonly tagInput = signal<string>('');

  // Evidence
  readonly uploadedFiles = signal<string[]>(['chat-transcript-log.pdf']);
  readonly sensitiveEvidence = signal<boolean>(true);
  readonly containsLearnerInfo = signal<boolean>(true);
  readonly requiresRestrictedAccess = signal<boolean>(false);

  // Assignment & Escalation
  readonly assignedReviewer = signal<string>('Rahul Mehta');
  readonly escalationStatus = signal<string>('Standard Investigation');
  readonly responseDeadline = signal<string>('May 31, 2025 05:00 PM');
  readonly notifySchoolAdmin = signal<boolean>(true);
  readonly notifyComplianceOfficer = signal<boolean>(true);
  readonly restrictUserAccess = signal<boolean>(false);

  // Consent & Compliance Checks
  readonly parentConsentStatus = signal<string>('Consent Verified');
  readonly policyAcknowledged = signal<string>('Child Protection Policy');
  readonly dataPrivacyReviewRequired = signal<string>('Standard Review');
  readonly externalReportingRequired = signal<boolean>(false);

  // Notes
  readonly internalNotes = signal<string>('');
  readonly relatedCase = signal<string>('');
  readonly additionalNotes = signal<string>('');

  // Readiness Checklist computeds
  readonly isTitleDone = computed(() => this.caseTitle().trim().length > 3);
  readonly isInstitutionDone = computed(
    () => this.selectedInstitution().length > 0,
  );
  readonly isSeverityDone = computed(() => !!this.selectedSeverity());
  readonly isDescriptionDone = computed(
    () => this.description().trim().length > 10,
  );
  readonly isReviewerDone = computed(() => this.assignedReviewer().length > 0);
  readonly isEvidenceAttached = computed(() => this.uploadedFiles().length > 0);

  addTag(): void {
    const val = this.tagInput().trim();
    if (val && !this.tags().includes(val)) {
      this.tags.update((t) => [...t, val]);
      this.tagInput.set('');
    }
  }

  removeTag(tag: string): void {
    this.tags.update((t) => t.filter((item) => item !== tag));
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const fileName = event.dataTransfer.files[0].name;
      this.uploadedFiles.update((f) => [...f, fileName]);
    }
  }

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const fileName = input.files[0].name;
      this.uploadedFiles.update((f) => [...f, fileName]);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.update((f) => f.filter((_, i) => i !== index));
  }

  saveDraft(): void {
    this.router.navigate(['/super-admin/safeguarding-compliance']);
  }

  onSubmit(): void {
    if (!this.caseTitle() || !this.selectedInstitution()) {
      return;
    }

    this.store.createSafeguardingCase({
      title: this.caseTitle(),
      institution: this.selectedInstitution(),
      category: this.selectedCategory(),
      severity: this.selectedSeverity(),
      incidentDateTime: this.incidentDateTime(),
      reportedBy: this.reportedBy() || 'Super Admin',
      referenceId: this.referenceId(),
      learnerName: this.learnerName(),
      staffName: this.staffName(),
      additionalUsers: this.additionalUsers(),
      gradeClass: this.selectedGrade(),
      parentLinked: this.parentLinked(),
      description: this.description(),
      locationContext: this.locationContext(),
      tags: this.tags(),
      sensitiveEvidence: this.sensitiveEvidence(),
      containsLearnerInfo: this.containsLearnerInfo(),
      requiresRestrictedAccess: this.requiresRestrictedAccess(),
      assignedReviewer: this.assignedReviewer(),
      escalationStatus: this.escalationStatus(),
      responseDeadline: this.responseDeadline(),
      notifySchoolAdmin: this.notifySchoolAdmin(),
      notifyComplianceOfficer: this.notifyComplianceOfficer(),
      restrictUserAccess: this.restrictUserAccess(),
      parentConsentStatus: this.parentConsentStatus(),
      policyAcknowledged: this.policyAcknowledged(),
      dataPrivacyReviewRequired: this.dataPrivacyReviewRequired(),
      externalReportingRequired: this.externalReportingRequired(),
      internalNotes: this.internalNotes(),
      relatedCase: this.relatedCase(),
      additionalNotes: this.additionalNotes(),
    });

    this.router.navigate(['/super-admin/safeguarding-compliance']);
  }
}
