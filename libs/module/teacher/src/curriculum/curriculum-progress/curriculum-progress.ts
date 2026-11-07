import { Component, input } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherWeekCoverage } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-curriculum-progress',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './curriculum-progress.html',
  styleUrl: './curriculum-progress.scss',
})
export class CurriculumProgressComponent {
  readonly subjectTitle = input<string>(
    'Curriculum Progress – English Language (Term 1 2025/2026)',
  );
  readonly weeks = input.required<TeacherWeekCoverage[]>();
  readonly overallCoverage = input<string>('68%');
  readonly topicsCompleted = input<string>('9 / 13');
  readonly topicsInProgress = input<number>(4);
  readonly topicsUpcoming = input<number>(4);
}
