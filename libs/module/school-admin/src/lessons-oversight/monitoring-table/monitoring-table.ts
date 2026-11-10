import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { LessonMonitoringRecord } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-lesson-monitoring-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monitoring-table.html',
  styleUrls: ['./monitoring-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonMonitoringTableComponent {
  readonly store = inject(SchoolAdminStore);

  readonly classLevels = [
    'All Classes',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SS 1',
    'SS 2',
    'SS 3',
  ];

  readonly subjects = [
    'All Subjects',
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
    'Civic Education',
  ];

  readonly teachers = [
    'All Teachers',
    'Mr. Tunde Adewale',
    'Mrs. Fatima Yusuf',
    'Mrs. Nkechi Okoro',
    'Mr. Joseph Anayo',
    'Mrs. Funke Yusuf',
    'Mrs. Aisha Bello',
    'Mr. David Adeyemi',
  ];

  readonly statuses = [
    'All Status',
    'In Progress',
    'Completed',
    'Delayed',
    'Pending',
    'Needs Review',
    'Missing Pack',
    'Ready',
  ];

  readonly activeActionId = signal<string | null>(null);

  onClassChange(val: string): void {
    this.store.setLessonClassFilter(val);
  }

  onSubjectChange(val: string): void {
    this.store.setLessonSubjectFilter(val);
  }

  onTeacherChange(val: string): void {
    this.store.setLessonTeacherFilter(val);
  }

  onStatusChange(val: string): void {
    this.store.setLessonStatusFilter(val);
  }

  onSearch(query: string): void {
    this.store.setLessonSearchQuery(query);
  }

  onSelectRow(rec: LessonMonitoringRecord): void {
    this.store.selectLessonRecord(rec);
  }

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.activeActionId.update((current) => (current === id ? null : id));
  }

  closeActionMenu(): void {
    this.activeActionId.set(null);
  }

  onViewDetails(rec: LessonMonitoringRecord): void {
    this.closeActionMenu();
    this.store.setupSaveStatus.set(
      `Viewing detailed delivery record for ${rec.className} ${rec.subject}: ${rec.currentTopic}.`,
    );
  }

  onInspectDeliveryPack(rec: LessonMonitoringRecord): void {
    this.closeActionMenu();
    this.store.setupSaveStatus.set(
      `Opening Delivery Pack for ${rec.currentTopic} (${rec.subject}).`,
    );
  }

  onMessageTeacher(rec: LessonMonitoringRecord): void {
    this.closeActionMenu();
    this.store.setupSaveStatus.set(
      `Direct message window opened for ${rec.assignedTeacher.name}.`,
    );
  }
}
