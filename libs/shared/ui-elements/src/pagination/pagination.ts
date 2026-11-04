import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'school-hub-pagination',
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly total = input.required<number>();
  readonly page = input.required<number>();
  readonly pageSize = input(5);
  readonly itemLabel = input('items');
  readonly label = input('Pagination');
  readonly pageChanged = output<number>();
  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );
  protected readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => index + 1),
  );
  protected readonly first = computed(() =>
    this.total() ? (this.page() - 1) * this.pageSize() + 1 : 0,
  );
  protected readonly last = computed(() =>
    Math.min(this.page() * this.pageSize(), this.total()),
  );
}
