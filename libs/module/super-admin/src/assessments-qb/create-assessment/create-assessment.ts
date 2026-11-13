import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperAdminStore } from '../../data/super-admin.store';
import {
  AssessmentType,
  CreateAssessmentData,
  QuestionCompositionItem,
} from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-create-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-assessment.html',
  styleUrls: ['./create-assessment.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssessmentComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  readonly currentStep = signal<number>(1);
  readonly toastMessage = signal<string | null>(null);

  // Step 1: Details
  readonly assessmentName = signal<string>(
    'JSS 1 Mathematics Weekly Quiz Pack',
  );
  readonly assessmentType = signal<AssessmentType>('Quiz');
  readonly classLevel = signal<string>('JSS 1');
  readonly subject = signal<string>('Mathematics');
  readonly term = signal<string>('First Term');
  readonly academicSession = signal<string>('2024/2025');
  readonly version = signal<string>('v1.0');
  readonly assessmentCode = signal<string>('MTH-J1-QZ1');
  readonly description = signal<string>(
    'Standard weekly continuous assessment quiz for JSS 1 Mathematics students covering numbers and numeration, basic algebra, and geometrical shapes.',
  );

  // Step 2: Structure & Scope
  readonly targetInstitutions = signal<string>('All Schools');
  readonly durationMins = signal<number>(45);
  readonly totalMarks = signal<number>(50);
  readonly numberOfQuestions = signal<number>(25);
  readonly deliveryMode = signal<string>('Online CBT');
  readonly attemptLimit = signal<string>('Single Attempt (1)');
  readonly randomizeQuestions = signal<boolean>(true);
  readonly randomizeOptions = signal<boolean>(true);
  readonly availabilityDate = signal<string>('2024-10-15T08:00');
  readonly dueDate = signal<string>('2024-10-22T23:59');

  // Step 3: Question Composition
  readonly compositions = signal<QuestionCompositionItem[]>([
    {
      type: 'Multiple Choice (MCQ)',
      count: 15,
      marksPerItem: 1,
      totalMarks: 15,
      source: 'Question Bank',
      icon: 'radio_button_checked',
    },
    {
      type: 'Short Answer',
      count: 5,
      marksPerItem: 2,
      totalMarks: 10,
      source: 'Question Bank',
      icon: 'short_text',
    },
    {
      type: 'Essay / Theory',
      count: 3,
      marksPerItem: 5,
      totalMarks: 15,
      source: 'Mixed',
      icon: 'subject',
    },
    {
      type: 'Word Problems',
      count: 2,
      marksPerItem: 5,
      totalMarks: 10,
      source: 'Manual',
      icon: 'calculate',
    },
  ]);

  // Step 4: Scoring & Review Rules
  readonly passingThreshold = signal<number>(60);
  readonly gradeScaleTemplate = signal<string>(
    'Standard WAEC / BECE Grade Scale',
  );
  readonly reviewSla = signal<string>('48 Hours');
  readonly moderationRequired = signal<boolean>(true);
  readonly feedbackRelease = signal<string>('Instant after submission');

  // Step 5: Publish State
  readonly publishStatus = signal<'Draft' | 'Submit for Review' | 'Publish'>(
    'Draft',
  );

  // Computed total calculated marks
  readonly computedTotalMarks = computed(() => {
    return this.compositions().reduce((sum, item) => sum + item.totalMarks, 0);
  });

  readonly computedTotalQuestions = computed(() => {
    return this.compositions().reduce((sum, item) => sum + item.count, 0);
  });

  // Steps definition
  readonly steps = [
    { number: 1, label: 'Assessment Details', icon: 'description' },
    { number: 2, label: 'Structure & Scope', icon: 'tune' },
    { number: 3, label: 'Question Composition', icon: 'format_list_numbered' },
    { number: 4, label: 'Review Rules', icon: 'rule' },
    { number: 5, label: 'Publish', icon: 'publish' },
  ];

  setStep(step: number): void {
    if (step >= 1 && step <= 5) {
      this.currentStep.set(step);
    }
  }

  nextStep(): void {
    if (this.currentStep() < 5) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  updateCompositionCount(index: number, count: number): void {
    this.compositions.update((list) => {
      const copy = [...list];
      const item = { ...copy[index] };
      item.count = Math.max(0, count);
      item.totalMarks = item.count * item.marksPerItem;
      copy[index] = item;
      return copy;
    });
  }

  saveDraft(): void {
    const data: CreateAssessmentData = this.buildData('Draft');
    this.store.createAssessmentPack(data);
    this.showToast('Draft assessment pack saved successfully!');
    setTimeout(() => {
      this.router.navigate(['/super-admin/assessments-qb']);
    }, 1200);
  }

  submitForReview(): void {
    const data: CreateAssessmentData = this.buildData('Submit for Review');
    this.store.createAssessmentPack(data);
    this.showToast('Assessment submitted to moderation queue!');
    setTimeout(() => {
      this.router.navigate(['/super-admin/assessments-qb']);
    }, 1200);
  }

  publishLive(): void {
    const data: CreateAssessmentData = this.buildData('Publish');
    this.store.createAssessmentPack(data);
    this.showToast('Assessment pack published live!');
    setTimeout(() => {
      this.router.navigate(['/super-admin/assessments-qb']);
    }, 1200);
  }

  cancel(): void {
    this.router.navigate(['/super-admin/assessments-qb']);
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }

  private buildData(
    status: 'Draft' | 'Submit for Review' | 'Publish',
  ): CreateAssessmentData {
    return {
      assessmentName: this.assessmentName(),
      assessmentType: this.assessmentType(),
      classLevel: this.classLevel(),
      subject: this.subject(),
      term: this.term(),
      academicSession: this.academicSession(),
      version: this.version(),
      assessmentCode: this.assessmentCode(),
      description: this.description(),
      targetInstitutions: this.targetInstitutions(),
      durationMins: this.durationMins(),
      totalMarks: this.computedTotalMarks(),
      numberOfQuestions: this.computedTotalQuestions(),
      deliveryMode: this.deliveryMode(),
      attemptLimit: this.attemptLimit(),
      randomizeQuestions: this.randomizeQuestions(),
      randomizeOptions: this.randomizeOptions(),
      availabilityDate: this.availabilityDate(),
      dueDate: this.dueDate(),
      compositions: this.compositions(),
      passingThreshold: this.passingThreshold(),
      gradeScaleTemplate: this.gradeScaleTemplate(),
      reviewSla: this.reviewSla(),
      moderationRequired: this.moderationRequired(),
      feedbackRelease: this.feedbackRelease(),
      publishStatus: status,
    };
  }
}
