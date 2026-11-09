import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { calculateExpression } from './calculate';

@Component({
  selector: 'school-hub-calculator',
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  protected readonly expression = signal('');
  protected readonly result = signal<number | undefined>(undefined);
  protected readonly error = signal('');
  protected readonly keys = [
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '(',
    ')',
    '+',
  ];
  protected inputChanged(event: Event): void {
    this.expression.set((event.target as HTMLInputElement).value);
    this.error.set('');
  }
  protected append(key: string): void {
    this.expression.update((value) => (value + key).slice(0, 100));
    this.error.set('');
  }
  protected clear(): void {
    this.expression.set('');
    this.result.set(undefined);
    this.error.set('');
  }
  protected backspace(): void {
    this.expression.update((value) => value.slice(0, -1));
  }
  protected calculate(event?: Event): void {
    event?.preventDefault();
    try {
      this.result.set(calculateExpression(this.expression()));
      this.error.set('');
    } catch (error) {
      this.error.set(
        error instanceof Error ? error.message : 'Check your expression.',
      );
      this.result.set(undefined);
    }
  }
}
