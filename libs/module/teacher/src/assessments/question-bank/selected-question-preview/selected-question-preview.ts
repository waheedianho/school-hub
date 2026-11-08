import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SelectedQuestionDetail } from '../../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-selected-question-preview',
  imports: [],
  templateUrl: './selected-question-preview.html',
  styleUrl: './selected-question-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedQuestionPreviewComponent {
  readonly question = input.required<SelectedQuestionDetail>();

  readonly editQuestion = output<string>();
  readonly duplicateQuestion = output<string>();
  readonly addToAssessment = output<string>();
}
