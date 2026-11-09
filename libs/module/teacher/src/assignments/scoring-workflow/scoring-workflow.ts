import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
}

@Component({
  selector: 'school-hub-scoring-workflow',
  templateUrl: './scoring-workflow.html',
  styleUrl: './scoring-workflow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoringWorkflowComponent {
  readonly steps: WorkflowStep[] = [
    {
      step: 1,
      title: 'Submission Received',
      desc: 'Learner submits work',
    },
    {
      step: 2,
      title: 'Teacher Review',
      desc: 'Review and evaluate the work',
    },
    {
      step: 3,
      title: 'Score Approved',
      desc: 'Add score and approve results',
    },
    {
      step: 4,
      title: 'Sent to Gradebook',
      desc: 'Results recorded in Gradebook',
    },
  ];
}
