import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

export const UNIT_GROUPS = {
  length: {
    label: 'Length',
    units: [
      { id: 'm', label: 'Metres', factor: 1 },
      { id: 'cm', label: 'Centimetres', factor: 0.01 },
      { id: 'mm', label: 'Millimetres', factor: 0.001 },
      { id: 'km', label: 'Kilometres', factor: 1000 },
    ],
  },
  mass: {
    label: 'Mass',
    units: [
      { id: 'kg', label: 'Kilograms', factor: 1 },
      { id: 'g', label: 'Grams', factor: 0.001 },
    ],
  },
  capacity: {
    label: 'Capacity',
    units: [
      { id: 'l', label: 'Litres', factor: 1 },
      { id: 'ml', label: 'Millilitres', factor: 0.001 },
    ],
  },
};
@Component({
  selector: 'school-hub-unit-converter',
  templateUrl: './unit-converter.html',
  styleUrl: './unit-converter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitConverterComponent {
  protected readonly groups = Object.entries(UNIT_GROUPS).map(
    ([id, group]) => ({ id, label: group.label }),
  );
  protected readonly category = signal<keyof typeof UNIT_GROUPS>('length');
  protected readonly value = signal('1');
  protected readonly from = signal('m');
  protected readonly to = signal('cm');
  protected readonly units = computed(() => UNIT_GROUPS[this.category()].units);
  protected readonly result = computed(() => {
    const value = Number(this.value());
    const from = this.units().find((unit) => unit.id === this.from());
    const to = this.units().find((unit) => unit.id === this.to());
    if (
      !this.value().trim() ||
      !Number.isFinite(value) ||
      value < 0 ||
      !from ||
      !to
    )
      return undefined;
    const converted = (value * from.factor) / to.factor;
    return Number.isFinite(converted)
      ? Number(converted.toPrecision(10))
      : undefined;
  });
  protected change(key: 'value' | 'from' | 'to', event: Event): void {
    this[key].set((event.target as HTMLInputElement).value);
  }
  protected setCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement)
      .value as keyof typeof UNIT_GROUPS;
    if (!(category in UNIT_GROUPS)) return;
    this.category.set(category);
    this.from.set(this.units()[0].id);
    this.to.set(this.units()[1].id);
  }
}
