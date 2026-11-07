import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
export interface CalendarMarker {
  date: string;
  label: string;
}
@Component({
  selector: 'school-hub-month-calendar',
  templateUrl: './month-calendar.html',
  styleUrl: './month-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthCalendarComponent {
  readonly month = input.required<string>();
  readonly selected = input('');
  readonly today = input('');
  readonly markers = input<readonly CalendarMarker[]>([]);
  readonly label = input('Class calendar');
  readonly eventName = input('class');
  readonly eventPluralName = input('classes');
  readonly daySelected = output<string>();
  readonly monthChanged = output<number>();
  protected readonly weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];
  protected readonly title = computed(() =>
    new Date(this.month() + '-01T12:00:00Z').toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }),
  );
  protected readonly days = computed(() => {
    const [year, month] = this.month().split('-').map(Number);
    const first = new Date(Date.UTC(year, month - 1, 1));
    const length = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return [
      ...Array.from({ length: (first.getUTCDay() + 6) % 7 }, () => null),
      ...Array.from({ length }, (_, index) => {
        const date = `${this.month()}-${String(index + 1).padStart(2, '0')}`;
        const markers = this.markers().filter((marker) => marker.date === date);
        return {
          date,
          day: index + 1,
          count: markers.length,
          description:
            new Date(date + 'T12:00:00Z').toLocaleDateString('en-GB', {
              dateStyle: 'full',
              timeZone: 'UTC',
            }) +
            (markers.length
              ? `, ${markers.length} ${markers.length === 1 ? this.eventName() : this.eventPluralName()}: ${markers.map((item) => item.label).join(', ')}`
              : `, no ${this.eventPluralName()}`),
        };
      }),
    ];
  });
}
