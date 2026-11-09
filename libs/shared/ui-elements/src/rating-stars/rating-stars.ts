import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
@Component({
  selector: 'school-hub-rating-stars',
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingStarsComponent {
  readonly value = input.required<number>();
  protected readonly score = computed(() =>
    Math.max(0, Math.min(100, this.value())),
  );
}
