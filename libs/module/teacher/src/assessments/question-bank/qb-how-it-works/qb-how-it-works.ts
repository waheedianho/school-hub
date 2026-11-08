import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'school-hub-qb-how-it-works',
  imports: [],
  templateUrl: './qb-how-it-works.html',
  styleUrl: './qb-how-it-works.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QBHowItWorksComponent {
  readonly steps = [
    {
      num: 1,
      title: 'Create or Import',
      desc: 'Author questions directly or bulk import questions from spreadsheet.',
    },
    {
      num: 2,
      title: 'Tag Topic & Bloom Level',
      desc: 'Map to syllabus week, learning objectives, and difficulty.',
    },
    {
      num: 3,
      title: 'Set Explanation & Misconceptions',
      desc: 'Provide automated feedback and common error guidance.',
    },
    {
      num: 4,
      title: 'Link to Assessments',
      desc: 'Assemble questions into weekly quizzes, tests, or exams.',
    },
    {
      num: 5,
      title: 'Track Item Performance',
      desc: 'Review discrimination index and learner error frequency.',
    },
  ];
}
