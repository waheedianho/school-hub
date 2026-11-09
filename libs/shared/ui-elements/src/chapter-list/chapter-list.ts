import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
export interface MediaChapter {
  title: string;
  time: string;
  start: number;
}
@Component({
  selector: 'school-hub-chapter-list',
  templateUrl: './chapter-list.html',
  styleUrl: './chapter-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterListComponent {
  readonly items = input.required<readonly MediaChapter[]>();
  readonly active = input(0);
  readonly selected = output<number>();
}
