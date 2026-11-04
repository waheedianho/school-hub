import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'school-hub-question-navigator',
  templateUrl: './question-navigator.html',
  styleUrl: './question-navigator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionNavigatorComponent {
  readonly total = input.required<number>();
  readonly current = input.required<number>();
  readonly answered = input<readonly number[]>([]);
  readonly marked = input<readonly number[]>([]);
  readonly disabled = input(false);
  readonly selected = output<number>();
  protected readonly questions = computed(() =>
    Array.from({ length: this.total() }, (_, index) => index),
  );
  protected questionLabel(index: number): string {
    return `Question ${index + 1}${this.answered().includes(index) ? ', answered' : ', not answered'}${this.marked().includes(index) ? ', marked for review' : ''}`;
  }
}
