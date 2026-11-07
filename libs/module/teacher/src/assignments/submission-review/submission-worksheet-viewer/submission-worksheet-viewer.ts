import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface WorksheetQuestion {
  number: number;
  text: string;
  underlinedPart: string;
  studentAnswer: string;
}

@Component({
  selector: 'school-hub-submission-worksheet-viewer',
  templateUrl: './submission-worksheet-viewer.html',
  styleUrl: './submission-worksheet-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionWorksheetViewerComponent {
  readonly learnerName = input<string>('Maryam Ibrahim');
  readonly submissionDate = input<string>('3 May 2026');
  readonly questions = input<WorksheetQuestion[]>([]);
}
