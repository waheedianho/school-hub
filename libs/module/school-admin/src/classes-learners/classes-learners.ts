import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SchoolAdminStore } from '../data/school-admin.store';
import { ClassesSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { ClassListComponent } from './class-list/class-list';
import { LearnerTableComponent } from './learner-table/learner-table';
import { ClassOverviewSidebarComponent } from './class-overview-sidebar/class-overview-sidebar';

@Component({
  selector: 'school-hub-classes-learners',
  standalone: true,
  imports: [
    CommonModule,
    ClassesSummaryMetricsComponent,
    ClassListComponent,
    LearnerTableComponent,
    ClassOverviewSidebarComponent,
  ],
  templateUrl: './classes-learners.html',
  styleUrls: ['./classes-learners.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesLearnersComponent {
  readonly store = inject(SchoolAdminStore);
  private readonly router = inject(Router);

  readonly tabs: Array<'classes' | 'learners' | 'enrollment' | 'attendance'> = [
    'classes',
    'learners',
    'enrollment',
    'attendance',
  ];

  setTab(tab: 'classes' | 'learners' | 'enrollment' | 'attendance'): void {
    this.store.setActiveClassesTab(tab);
  }

  onClassSelect(classId: string): void {
    this.store.selectClass(classId);
  }

  onSearchChange(query: string): void {
    this.store.setLearnerSearchQuery(query);
  }

  onClassFilterChange(className: string): void {
    this.store.setLearnerClassFilter(className);
  }

  onStatusFilterChange(status: string): void {
    this.store.setLearnerStatusFilter(status);
  }

  onPageChange(page: number): void {
    this.store.setLearnerPage(page);
  }

  navigateToAddLearner(): void {
    this.router.navigate(['/school-admin/classes-learners/add']);
  }

  onAddClass(): void {
    this.store.setupSaveStatus.set(
      'Add Class wizard opened. Please select level and arm.',
    );
  }

  onBulkImport(): void {
    this.store.setupSaveStatus.set(
      'Bulk Learner Import wizard opened. Download CSV template to begin.',
    );
  }

  onQuickAction(action: string): void {
    if (action === 'assign-learner') {
      this.navigateToAddLearner();
    } else if (action === 'full-profile') {
      this.store.setupSaveStatus.set(
        `Viewing full profile for ${this.store.selectedClass().name}`,
      );
    } else if (action === 'reassign-class') {
      this.store.setupSaveStatus.set(
        `Promote / Reassign wizard for ${this.store.selectedClass().name} initiated.`,
      );
    }
  }

  dismissNotification(): void {
    this.store.setupSaveStatus.set(null);
  }
}
