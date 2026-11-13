import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SuperAdminStore } from '../../data/super-admin.store';
import {
  OnboardSchoolFormData,
  SchoolInstitution,
  SchoolSubscriptionPlan,
  SchoolType,
} from '../../data/super-admin-schools.models';

@Component({
  selector: 'school-hub-school-onboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './school-onboard.html',
  styleUrl: './school-onboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolOnboardComponent {
  private readonly store = inject(SuperAdminStore);
  private readonly router = inject(Router);

  readonly currentStep = signal<1 | 2 | 3>(1);
  readonly showPassword = signal<boolean>(false);
  readonly formSubmitted = signal<boolean>(false);
  readonly createdSchool = signal<SchoolInstitution | null>(null);
  readonly notificationMessage = signal<string | null>(null);

  // Form State
  readonly formData = signal<OnboardSchoolFormData>({
    schoolName: '',
    schoolType: 'International',
    schoolCode: 'SCH-2025-001',
    country: 'United Kingdom',
    stateRegion: 'Greater London',
    schoolEmail: 'contact@school.edu',
    schoolPhone: '+44 20 7946 0958',
    website: 'https://www.school.edu',
    address: '10 Downing Way, Westminster, London',
    primaryBrandColor: '#2563EB',

    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '+44 20 7946 0959',
    temporaryPassword: 'TempPassword@2025',
    sendInvite: true,

    namingConvention: 'Primary / JSS / SSS',
    academicSession: '2025 - 2026',
    currentTerm: 'Term 1 (Aug - Dec 2025)',
    classLevelsOffered: ['Primary', 'JSS', 'SSS'],
    curriculumType: 'British National Curriculum',
    defaultReportCardTemplate: 'Standard Report Card',

    plan: 'Pro',
    startDate: '2025-05-01',
    renewalDate: '2026-05-01',
    learnerLimit: 1000,
    teacherLimit: 100,
    enabledModules: [
      'Curriculum',
      'Live Classes',
      'Assessments',
      'Reports',
      'Parent Reporting',
      'Portfolio Tasks',
      'Resources',
      'Communication',
    ],

    parentConsentRequired: true,
    tutorVerificationRequired: true,
    mediaUploadPermissions: 'Restricted (Staff Only)',
    communicationVisibility: 'Staff & Parents',
    dataRetentionPolicy: '7 Years',
  });

  // Select dropdown options
  readonly schoolTypes: SchoolType[] = ['International', 'Public', 'Private'];
  readonly subscriptionPlans: SchoolSubscriptionPlan[] = [
    'Pro',
    'Enterprise',
    'Basic',
    'Trial',
  ];
  readonly countries = [
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'India',
    'United Arab Emirates',
    'Singapore',
    'New Zealand',
    'Nigeria',
    'Kenya',
    'South Africa',
  ];

  readonly namingConventions = [
    'Primary / JSS / SSS',
    'K-12 (Elementary / Middle / High)',
    'Year 1 to Year 13',
    'Standard Grade Levels',
  ];

  readonly academicSessions = ['2025 - 2026', '2024 - 2025', '2026 - 2027'];

  readonly terms = [
    'Term 1 (Aug - Dec 2025)',
    'Term 2 (Jan - Apr 2026)',
    'Term 3 (May - Jul 2026)',
  ];

  readonly curriculumTypes = [
    'British National Curriculum',
    'US Common Core & AP',
    'International Baccalaureate (IB)',
    'Cambridge International (CIE)',
    'Montessori & Custom Framework',
  ];

  readonly reportCardTemplates = [
    'Standard Report Card',
    'Competency & Standards Report',
    'Dual Term Trimester Report',
  ];

  readonly allAvailableModules = [
    'Curriculum',
    'Live Classes',
    'Assessments',
    'Reports',
    'Parent Reporting',
    'Portfolio Tasks',
    'Resources',
    'Communication',
  ];

  readonly mediaPermissions = [
    'Restricted (Staff Only)',
    'Moderated (Approval Required)',
    'Open to Teachers & Students',
  ];

  readonly visibilityOptions = [
    'Staff & Parents',
    'School Wide Public',
    'Restricted Admin Only',
  ];

  readonly retentionPolicies = ['5 Years', '7 Years', '10 Years', 'Indefinite'];

  // Form helpers
  updateField<K extends keyof OnboardSchoolFormData>(
    field: K,
    value: OnboardSchoolFormData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  toggleModule(mod: string): void {
    this.formData.update((prev) => {
      const current = prev.enabledModules || [];
      const updated = current.includes(mod)
        ? current.filter((m) => m !== mod)
        : [...current, mod];
      return { ...prev, enabledModules: updated };
    });
  }

  isModuleEnabled(mod: string): boolean {
    return this.formData().enabledModules?.includes(mod) ?? false;
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  goToStep(step: 1 | 2 | 3): void {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  validateStep1(): boolean {
    const data = this.formData();
    if (!data.schoolName.trim()) {
      this.showToast('Please provide a School Name.');
      return false;
    }
    if (!data.schoolCode.trim()) {
      this.showToast('Please provide a School Code.');
      return false;
    }
    if (!data.adminFirstName.trim() || !data.adminLastName.trim()) {
      this.showToast('Please provide School Admin First and Last Name.');
      return false;
    }
    if (!data.adminEmail.trim()) {
      this.showToast('Please provide an Administrator Email Address.');
      return false;
    }
    return true;
  }

  proceedToReview(): void {
    if (this.validateStep1()) {
      this.goToStep(2);
    }
  }

  launchSchool(): void {
    const data = this.formData();
    const created = this.store.onboardSchool(data);
    this.createdSchool.set(created);
    this.goToStep(3);
  }

  saveDraft(): void {
    this.showToast('Onboarding progress saved as draft.');
  }

  onboardAnother(): void {
    this.formData.set({
      schoolName: '',
      schoolType: 'International',
      schoolCode: `SCH-2025-${Math.floor(100 + Math.random() * 900)}`,
      country: 'United Kingdom',
      stateRegion: 'Greater London',
      schoolEmail: '',
      schoolPhone: '',
      website: '',
      address: '',
      primaryBrandColor: '#2563EB',
      adminFirstName: '',
      adminLastName: '',
      adminEmail: '',
      adminPhone: '',
      temporaryPassword: 'TempPassword@2025',
      sendInvite: true,
      namingConvention: 'Primary / JSS / SSS',
      academicSession: '2025 - 2026',
      currentTerm: 'Term 1 (Aug - Dec 2025)',
      classLevelsOffered: ['Primary', 'JSS', 'SSS'],
      curriculumType: 'British National Curriculum',
      defaultReportCardTemplate: 'Standard Report Card',
      plan: 'Pro',
      startDate: '2025-05-01',
      renewalDate: '2026-05-01',
      learnerLimit: 1000,
      teacherLimit: 100,
      enabledModules: [...this.allAvailableModules],
      parentConsentRequired: true,
      tutorVerificationRequired: true,
      mediaUploadPermissions: 'Restricted (Staff Only)',
      communicationVisibility: 'Staff & Parents',
      dataRetentionPolicy: '7 Years',
    });
    this.createdSchool.set(null);
    this.goToStep(1);
  }

  navigateDirectory(): void {
    this.router.navigate(['/super-admin/schools']);
  }

  showToast(msg: string): void {
    this.notificationMessage.set(msg);
    setTimeout(() => {
      this.notificationMessage.set(null);
    }, 4000);
  }
}
