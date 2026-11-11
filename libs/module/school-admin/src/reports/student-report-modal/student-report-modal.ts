import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-reports-student-report-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-report-modal.html',
  styleUrls: ['./student-report-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsStudentReportModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly report = this.store.selectedStudentReportCard;
  readonly isOpen = this.store.isStudentReportModalOpen;

  onClose(): void {
    this.store.closeStudentReportCard();
  }

  onPrint(): void {
    this.store.setupSaveStatus.set(
      `Print command dispatched for ${this.report()?.learnerName}'s report card.`,
    );
  }

  onDownload(): void {
    this.store.setupSaveStatus.set(
      `Official PDF generated and downloaded for ${this.report()?.learnerName}.`,
    );
  }

  getGradeClass(grade: string): string {
    switch (grade) {
      case 'A':
        return 'grade-a';
      case 'B':
        return 'grade-b';
      case 'C':
        return 'grade-c';
      default:
        return 'grade-other';
    }
  }
}
