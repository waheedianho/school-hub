import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { AssessmentType } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-create-assessment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-assessment-modal.html',
  styleUrls: ['./create-assessment-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssessmentModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isCreateAssessmentModalOpen;

  readonly className = signal<string>('JSS 1A');
  readonly subject = signal<string>('Mathematics');
  readonly assessmentName = signal<string>('');
  readonly week = signal<string>('Week 7');
  readonly assessmentType = signal<AssessmentType>('Quiz');
  readonly teacherName = signal<string>('Mr. Tunde Adewale');
  readonly maxScore = signal<number>(30);
  readonly totalLearners = signal<number>(30);

  readonly classOptions = [
    'JSS 1A',
    'JSS 1B',
    'JSS 2A',
    'JSS 2B',
    'JSS 3A',
    'JSS 3B',
    'SSS 1A',
    'SSS 1B',
    'SSS 2A',
    'SSS 3A',
  ];

  readonly subjectOptions = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
    'Civic Education',
    'Agricultural Science',
    'Chemistry',
    'Physics',
    'Biology',
  ];

  readonly typeOptions: AssessmentType[] = [
    'Quiz',
    'Test',
    'Assignment',
    'Exam',
    'Project',
  ];

  readonly teacherOptions = [
    'Mr. Tunde Adewale',
    'Mrs. Funmi Yusuf',
    'Dr. Kelechi Nwosu',
    'Mrs. Amina Bello',
    'Mr. Segun Adeleke',
  ];

  onClose(): void {
    this.store.closeCreateAssessmentModal();
  }

  onSubmit(): void {
    if (!this.assessmentName().trim()) return;

    this.store.createAssessment({
      className: this.className(),
      subject: this.subject(),
      assessmentName: this.assessmentName().trim(),
      week: this.week(),
      assessmentType: this.assessmentType(),
      teacherName: this.teacherName(),
      maxScore: this.maxScore(),
      totalLearners: this.totalLearners(),
    });

    this.resetForm();
  }

  private resetForm(): void {
    this.assessmentName.set('');
    this.week.set('Week 7');
    this.maxScore.set(30);
  }
}
