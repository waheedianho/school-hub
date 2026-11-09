import { Component, input } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherWorkflowStep } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-workflow-reminder',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './workflow-reminder.html',
  styleUrl: './workflow-reminder.scss',
})
export class WorkflowReminderComponent {
  readonly steps = input.required<TeacherWorkflowStep[]>();
}
