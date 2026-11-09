import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'school-hub-gradebook-how-it-works',
  imports: [],
  templateUrl: './gradebook-how-it-works.html',
  styleUrl: './gradebook-how-it-works.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookHowItWorksComponent {
  readonly steps = [
    {
      num: 1,
      title: 'Assessment Completed',
      desc: 'Learners complete quizzes, tasks, or activities.',
      icon: 'calendar_month',
    },
    {
      num: 2,
      title: 'Score Verified',
      desc: 'Scores are reviewed and approved by the teacher.',
      icon: 'check_circle',
    },
    {
      num: 3,
      title: 'Saved to Gradebook',
      desc: 'Approved scores are recorded and update learner averages.',
      icon: 'menu_book',
    },
    {
      num: 4,
      title: 'Used in Reports',
      desc: 'Scores are used in reports and report cards for publishing.',
      icon: 'description',
    },
  ];
}
