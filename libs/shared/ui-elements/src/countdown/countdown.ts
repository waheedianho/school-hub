import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'school-hub-countdown',
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent {
  readonly until = input.required<number>();
  readonly now = input.required<number>();
  readonly label = input('Starts in');
  protected readonly remaining = computed(() =>
    Math.max(0, Math.ceil((this.until() - this.now()) / 1000)),
  );
  protected readonly parts = computed(() =>
    [
      { label: 'HRS', value: Math.floor(this.remaining() / 3600) },
      { label: 'MINS', value: Math.floor(this.remaining() / 60) % 60 },
      { label: 'SECS', value: this.remaining() % 60 },
    ].map((part) => ({ ...part, text: String(part.value).padStart(2, '0') })),
  );
  protected readonly description = computed(
    () =>
      `${this.label()}: ${this.parts()
        .map(
          (part) =>
            `${part.value} ${{ HRS: 'hours', MINS: 'minutes', SECS: 'seconds' }[part.label]}`,
        )
        .join(', ')}`,
  );
}
