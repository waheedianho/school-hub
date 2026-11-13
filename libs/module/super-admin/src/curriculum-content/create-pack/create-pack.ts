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
import { CreateCurriculumPackData } from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-create-pack',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pack.html',
  styleUrls: ['./create-pack.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePackComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  readonly currentStep = signal<number>(1);
  readonly showAllWeeks = signal<boolean>(false);
  readonly isAddWeekModalOpen = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  // Form Model
  readonly packName = signal<string>('JSS 1 Mathematics – First Term');
  readonly curriculumType = signal<string>('Core Curriculum');
  readonly classLevel = signal<string>('JSS 1 (Year 7)');
  readonly subject = signal<string>('Mathematics');
  readonly term = signal<string>('First Term');
  readonly academicSession = signal<string>('2024/2025');
  readonly version = signal<string>('1.0');
  readonly curriculumSource = signal<string>('Learno Master Curriculum');
  readonly description = signal<string>(
    'Comprehensive Mathematics curriculum for JSS 1 First Term aligned to the National Policy on Education and international best practices. Covers number systems, algebraic thinking, geometry, measurement and data handling.',
  );

  readonly approvalWorkflow = signal<string>('Curriculum Review Workflow');
  readonly assignedTemplate = signal<string>('Learno Curriculum Template');
  readonly schoolsAccess = signal<string>('All Schools');
  readonly subscriptionTier = signal<string>('Standard & Premium');
  readonly publishStatus = signal<string>('Draft (Not Visible)');

  // New Week Modal Form
  readonly newWeekTopic = signal<string>('');
  readonly newWeekObjective = signal<string>('');

  readonly weeklyTopics = this.store.weeklyTopics;
  readonly contentComponents = this.store.contentComponents;

  readonly visibleWeeks = computed(() => {
    const list = this.weeklyTopics();
    if (this.showAllWeeks()) {
      return list;
    }
    return list.slice(0, 5);
  });

  readonly selectedComponentsCount = computed(() => {
    return this.contentComponents().filter((c) => c.checked).length;
  });

  readonly completenessPercentage = computed(() => {
    let score = 20; // Basic details
    if (this.packName() && this.description()) score += 20;
    if (this.weeklyTopics().length >= 10) score += 30;
    if (this.selectedComponentsCount() >= 5) score += 22;
    return Math.min(100, score);
  });

  readonly characterCount = computed(() => this.description().length);

  toggleComponent(id: string): void {
    this.store.toggleContentComponent(id);
  }

  toggleShowAllWeeks(): void {
    this.showAllWeeks.update((v) => !v);
  }

  openAddWeek(): void {
    this.newWeekTopic.set('');
    this.newWeekObjective.set('');
    this.isAddWeekModalOpen.set(true);
  }

  closeAddWeek(): void {
    this.isAddWeekModalOpen.set(false);
  }

  saveNewWeek(): void {
    if (!this.newWeekTopic().trim()) return;
    const nextWeekNum = this.weeklyTopics().length + 1;
    this.store.addWeeklyTopic({
      week: nextWeekNum,
      weekLabel: `Week ${nextWeekNum}`,
      topic: this.newWeekTopic().trim(),
      learningObjective:
        this.newWeekObjective().trim() ||
        'Covers core weekly objectives and competencies.',
      status: 'Draft',
    });
    this.closeAddWeek();
    this.showToast(`Week ${nextWeekNum} added to curriculum structure`);
  }

  deleteWeek(id: string): void {
    this.store.deleteWeeklyTopic(id);
    this.showToast('Week removed from syllabus');
  }

  saveDraft(): void {
    this.submitPack(true);
  }

  submitPack(isDraft = false): void {
    const data: CreateCurriculumPackData = {
      packName: this.packName(),
      curriculumType: this.curriculumType(),
      classLevel: this.classLevel(),
      subject: this.subject(),
      term: this.term(),
      academicSession: this.academicSession(),
      version: this.version(),
      curriculumSource: this.curriculumSource(),
      description: this.description(),
      weeklyTopics: this.weeklyTopics(),
      contentComponents: this.contentComponents()
        .filter((c) => c.checked)
        .map((c) => c.id),
      approvalWorkflow: this.approvalWorkflow(),
      assignedTemplate: this.assignedTemplate(),
      schoolsAccess: this.schoolsAccess(),
      subscriptionTier: this.subscriptionTier(),
      publishStatus: isDraft ? 'Draft (Not Visible)' : 'Under Review',
    };

    const created = this.store.createCurriculumPack(data);
    this.showToast(`Curriculum pack "${created.name}" saved successfully!`);

    setTimeout(() => {
      this.router.navigate(['/super-admin/curriculum-content']);
    }, 1200);
  }

  cancel(): void {
    this.router.navigate(['/super-admin/curriculum-content']);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }
}
