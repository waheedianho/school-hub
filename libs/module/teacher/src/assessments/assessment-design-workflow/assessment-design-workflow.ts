import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'school-hub-assessment-design-workflow',
  imports: [],
  templateUrl: './assessment-design-workflow.html',
  styleUrl: './assessment-design-workflow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentDesignWorkflowComponent {
  readonly steps = [
    {
      num: 1,
      title: 'Select Topic',
      desc: 'Choose subject, class, and week topic from curriculum scope.',
    },
    {
      num: 2,
      title: 'Choose Questions',
      desc: 'Pick from 248 bank items or create new custom questions.',
    },
    {
      num: 3,
      title: 'Set Scoring Method',
      desc: 'Select Auto-Scored, Teacher Review, or Mixed assessment mode.',
    },
    {
      num: 4,
      title: 'Publish to Class',
      desc: 'Schedule date, set time limit, and release to learner portal.',
    },
  ];
}
