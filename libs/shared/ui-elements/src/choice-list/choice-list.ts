import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'school-hub-choice-list',
  templateUrl: './choice-list.html',
  styleUrl: './choice-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceListComponent {
  readonly options = input.required<readonly string[]>();
  readonly name = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input<number | null>(null);
  readonly disabled = input(false);
  readonly correctIndex = input<number>();
  readonly changed = output<number>();
  protected readonly letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}
