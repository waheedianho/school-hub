import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { NewStaffFormData } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-add-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-staff.html',
  styleUrls: ['./add-staff.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStaffComponent {
  private readonly store = inject(SchoolAdminStore);
  private readonly router = inject(Router);

  // Form Model
  formData: NewStaffFormData = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    staffId: `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
    phoneCode: '+234',
    phoneNumber: '',
    email: '',
    staffType: 'Academic',
    department: '',
    qualification: '',
    employmentType: 'Full-time',
    dateJoined: new Date().toISOString().split('T')[0],
    yearsOfExperience: '',
    role: '',
    isClassTeacher: false,
    assignedClasses: [],
    assignedSubjects: [],
    academicLevel: '',
    reportingLine: '',
    username: '',
    temporaryPassword: this.generateRandomPassword(),
    loginMethod: 'Email & Password',
    accountActive: true,
    contentApproval: true,
    gradeApproval: true,
    communicationVisibility: true,
    auditLogVisibility: true,
    parentCommunication: true,
    learnerMessageAccess: false,
    identityVerified: true,
    childSafeguardingTraining: true,
    conductPolicyAcknowledged: true,
    emergencyContact: '',
    address: '',
    remarks: '',
  };

  // State
  showPassword = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  formError = signal<string | null>(null);
  isUsernameCustom = signal<boolean>(false);

  // Reference Options
  readonly staffTypes = ['Academic', 'Support', 'Leadership', 'Specialist'];

  readonly departments = [
    'English Department',
    'Mathematics Department',
    'Science Department',
    'Social Sciences',
    'Arts & Humanities',
    'Vocational Studies',
    'Administration',
    'Student Support',
  ];

  readonly qualifications = [
    'B.Ed. Education',
    'B.Sc. / B.A. + PGDE',
    'M.Ed. Educational Leadership',
    'M.Sc. / M.A.',
    'Ph.D.',
    'NCE (Nigeria Certificate in Education)',
    'HND + PGDE',
  ];

  readonly employmentTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Probationary',
  ];

  readonly experienceLevels = [
    '0 - 2 years',
    '3 - 5 years',
    '6 - 10 years',
    '10+ years',
  ];

  readonly rolesList = [
    'Senior Teacher',
    'Subject Teacher',
    'Class Teacher',
    'Head of Department',
    'Vice Principal',
    'Assistant Teacher',
    'Guidance Counselor',
  ];

  readonly availableClasses = [
    'JSS 1A',
    'JSS 1B',
    'JSS 2A',
    'JSS 2B',
    'JSS 3A',
    'JSS 3B',
    'SS 1A',
    'SS 1B',
    'SS 2A',
    'SS 2B',
    'SS 3A',
    'SS 3B',
  ];

  readonly availableSubjects = [
    'English Language',
    'Mathematics',
    'Basic Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Social Studies',
    'Civic Education',
    'Economics',
    'Business Studies',
    'Agricultural Science',
    'History',
    'Literature in English',
  ];

  readonly academicLevels = [
    'Junior Secondary',
    'Senior Secondary',
    'Cross-Level (JSS & SS)',
    'Administrative',
  ];

  readonly reportingManagers = [
    'Principal',
    'Vice Principal Academic',
    'Vice Principal Administration',
    'Head of Department',
    'Dean of Studies',
  ];

  // Dynamic Auto-Username Generation
  onNameChange(): void {
    if (!this.isUsernameCustom()) {
      const first = (this.formData.firstName || '').toLowerCase().trim();
      const last = (this.formData.lastName || '').toLowerCase().trim();
      if (first && last) {
        this.formData.username = `${first}.${last}`;
        if (!this.formData.email) {
          this.formData.email = `${first}.${last}@schoolhub.org`;
        }
      }
    }
  }

  onUsernameInput(): void {
    this.isUsernameCustom.set(true);
  }

  // Toggle class selection
  toggleClass(className: string): void {
    const idx = this.formData.assignedClasses.indexOf(className);
    if (idx >= 0) {
      this.formData.assignedClasses.splice(idx, 1);
    } else {
      this.formData.assignedClasses.push(className);
    }
  }

  // Toggle subject selection
  toggleSubject(subjectName: string): void {
    const idx = this.formData.assignedSubjects.indexOf(subjectName);
    if (idx >= 0) {
      this.formData.assignedSubjects.splice(idx, 1);
    } else {
      this.formData.assignedSubjects.push(subjectName);
    }
  }

  // Password Helpers
  generateRandomPassword(): string {
    const chars =
      'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let res = '';
    for (let i = 0; i < 12; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  }

  refreshPassword(): void {
    this.formData.temporaryPassword = this.generateRandomPassword();
  }

  toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  // Dynamic Section Checklist Scores
  readonly profileScore = computed(() => {
    let score = 0;
    if (this.formData.firstName) score++;
    if (this.formData.lastName) score++;
    if (this.formData.gender) score++;
    if (this.formData.dateOfBirth) score++;
    if (this.formData.staffId) score++;
    if (this.formData.phoneCode) score++;
    if (this.formData.phoneNumber) score++;
    if (this.formData.email) score++;
    return score;
  });

  readonly professionalScore = computed(() => {
    let score = 0;
    if (this.formData.staffType) score++;
    if (this.formData.department) score++;
    if (this.formData.qualification) score++;
    if (this.formData.employmentType) score++;
    if (this.formData.dateJoined) score++;
    if (this.formData.yearsOfExperience) score++;
    if (this.formData.role) score++;
    return score;
  });

  readonly assignmentScore = computed(() => {
    let score = 0;
    if (this.formData.role) score++;
    if (this.formData.assignedClasses.length > 0) score += 2;
    if (this.formData.assignedSubjects.length > 0) score += 2;
    if (this.formData.academicLevel) score++;
    return Math.min(score, 6);
  });

  readonly loginScore = computed(() => {
    let score = 0;
    if (this.formData.username) score++;
    if (this.formData.temporaryPassword) score++;
    if (this.formData.loginMethod) score++;
    if (this.formData.accountActive !== undefined) score++;
    return score;
  });

  readonly permissionsScore = computed(() => {
    let score = 0;
    if (this.formData.contentApproval !== undefined) score++;
    if (this.formData.gradeApproval !== undefined) score++;
    if (this.formData.communicationVisibility !== undefined) score++;
    if (this.formData.auditLogVisibility !== undefined) score++;
    if (this.formData.parentCommunication !== undefined) score++;
    if (this.formData.learnerMessageAccess !== undefined) score++;
    return score;
  });

  readonly safeguardingScore = computed(() => {
    let score = 0;
    if (this.formData.identityVerified) score++;
    if (this.formData.childSafeguardingTraining) score++;
    if (this.formData.conductPolicyAcknowledged) score++;
    if (this.formData.emergencyContact) score += 2;
    if (this.formData.address) score++;
    return Math.min(score, 6);
  });

  readonly overallCompletion = computed(() => {
    const total = 37;
    const current =
      this.profileScore() +
      this.professionalScore() +
      this.assignmentScore() +
      this.loginScore() +
      this.permissionsScore() +
      this.safeguardingScore();
    return Math.min(100, Math.round((current / total) * 100));
  });

  // Actions
  onCancel(): void {
    this.router.navigate(['/school-admin/teachers-staff']);
  }

  onSaveDraft(): void {
    this.store.setupSaveStatus.set(
      `Draft saved for ${this.formData.firstName || 'Staff member'}. You can resume anytime.`,
    );
  }

  onCreateStaff(): void {
    if (!this.formData.firstName || !this.formData.lastName) {
      this.formError.set(
        'Please enter first and last name for the staff member.',
      );
      return;
    }

    if (!this.formData.email) {
      this.formError.set('Please provide a valid email address.');
      return;
    }

    this.isSubmitting.set(true);
    this.formError.set(null);

    try {
      this.store.createStaffMember(this.formData);
      this.router.navigate(['/school-admin/teachers-staff']);
    } catch {
      this.formError.set('An error occurred while creating staff member.');
      this.isSubmitting.set(false);
    }
  }
}
