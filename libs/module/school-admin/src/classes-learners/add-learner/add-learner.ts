import {
  Component,
  ChangeDetectionStrategy,
  inject,
  output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { NewLearnerFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-add-learner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-learner.html',
  styleUrls: ['./add-learner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLearnerComponent {
  private readonly router = inject(Router);
  readonly store = inject(SchoolAdminStore);

  readonly cancelled = output<void>();
  readonly learnerCreated = output<void>();

  readonly formData = signal<NewLearnerFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Female',
    dateOfBirth: '2012-04-15',
    admissionNumber: 'ADM/2024/0029',
    classLevel: 'JSS 1',
    arm: 'A',
    admissionDate: '2024-09-16',
    enrollmentStatus: 'Active',
    houseGroup: 'Blue House',
    previousSchool: '',
    username: '',
    temporaryPassword: 'LearnerPassword123!',
    loginMethod: 'Password Only',
    accountActive: true,
    parentName: '',
    parentRelationship: 'Mother',
    parentPhone: '+234 801 234 5678',
    parentEmail: '',
    parentWhatsApp: '+234 801 234 5678',
    homeAddress: '',
    emergencyContact: '',
    guardianAccountActive: true,
    medicalNotes: '',
    supportNeeds: '',
    transportMode: 'Day Student',
    remarks: '',
    parentConsentConfirmed: true,
    mediaConsent: true,
    dataPrivacyAcknowledged: true,
    communicationPreference: 'Email & SMS',
  });

  readonly showPassword = signal<boolean>(false);
  readonly isUsernameCustom = signal<boolean>(false);
  readonly classLevels = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
  readonly arms = ['A', 'B', 'C', 'Science', 'Arts', 'Commercial'];
  readonly relationships = ['Mother', 'Father', 'Guardian', 'Other'];
  readonly transportModes = ['Day Student', 'School Bus', 'Boarding'];
  readonly loginMethods = ['Password Only', 'Magic Link', 'Single Sign-On'];
  readonly commPreferences = [
    'Email & SMS',
    'Email Only',
    'SMS Only',
    'App Notification',
  ];

  readonly isProfileComplete = computed(() => {
    const d = this.formData();
    return (
      !!d.firstName.trim() && !!d.lastName.trim() && !!d.admissionNumber.trim()
    );
  });

  readonly isPlacementComplete = computed(() => {
    const d = this.formData();
    return !!d.classLevel && !!d.arm && !!d.admissionDate;
  });

  readonly isLoginComplete = computed(() => {
    const d = this.formData();
    return !!d.username.trim() || (!!d.firstName && !!d.lastName);
  });

  readonly isGuardianComplete = computed(() => {
    const d = this.formData();
    return !!d.parentName.trim() && !!d.parentPhone.trim();
  });

  readonly isSupportComplete = computed(() => {
    return true; // Optional fields with default transportMode
  });

  readonly isConsentComplete = computed(() => {
    const d = this.formData();
    return (
      d.parentConsentConfirmed && d.mediaConsent && d.dataPrivacyAcknowledged
    );
  });

  updateField<K extends keyof NewLearnerFormData>(
    field: K,
    value: NewLearnerFormData[K],
  ): void {
    if (field === 'username') {
      this.isUsernameCustom.set(true);
    }
    this.formData.update((prev) => {
      const next = { ...prev, [field]: value };
      if (
        (field === 'firstName' || field === 'lastName') &&
        !this.isUsernameCustom()
      ) {
        const first = (
          field === 'firstName' ? (value as string) : prev.firstName
        )
          .toLowerCase()
          .trim();
        const last = (field === 'lastName' ? (value as string) : prev.lastName)
          .toLowerCase()
          .trim();
        if (first && last) {
          next.username = `${first}.${last}`.replace(/\s+/g, '');
        } else if (first) {
          next.username = first;
        } else if (last) {
          next.username = last;
        }
      }
      return next;
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((s) => !s);
  }

  onCancel(): void {
    this.cancelled.emit();
    this.router.navigate(['/school-admin/classes-learners']);
  }

  onSaveDraft(): void {
    this.store.setupSaveStatus.set('Learner registration draft saved.');
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.firstName.trim()) {
      data.firstName = 'New';
    }
    if (!data.lastName.trim()) {
      data.lastName = 'Learner';
    }

    this.store.createLearner(data);
    this.learnerCreated.emit();
    this.router.navigate(['/school-admin/classes-learners']);
  }
}
