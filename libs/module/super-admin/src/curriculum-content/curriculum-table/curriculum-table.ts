import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CurriculumPack,
  CurriculumStatus,
} from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-curriculum-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curriculum-table.html',
  styleUrls: ['./curriculum-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumTableComponent {
  readonly packs = input.required<CurriculumPack[]>();
  readonly searchQuery = input<string>('');
  readonly selectedType = input<string>('All');
  readonly selectedClassLevel = input<string>('All');
  readonly selectedTerm = input<string>('All');
  readonly selectedStatus = input<string>('All');
  readonly totalResultsCount = input<number>(1286);

  readonly searchChange = output<string>();
  readonly typeChange = output<string>();
  readonly classLevelChange = output<string>();
  readonly termChange = output<string>();
  readonly statusChange = output<string>();
  readonly resetFilters = output<void>();

  readonly viewPack = output<CurriculumPack>();
  readonly editPack = output<CurriculumPack>();
  readonly statusUpdate = output<{ id: string; status: CurriculumStatus }>();
  readonly deletePack = output<string>();

  readonly openActionMenuId = signal<string | null>(null);
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(10);

  readonly curriculumTypes = [
    'All',
    'Core Curriculum',
    'Elective',
    'Vocational',
  ];
  readonly classLevels = [
    'All',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SS 1',
    'SS 2',
    'SS 3',
  ];
  readonly terms = ['All', 'First Term', 'Second Term', 'Third Term'];
  readonly statuses: ('All' | CurriculumStatus)[] = [
    'All',
    'Approved',
    'Pending Review',
    'Needs Update',
    'Draft',
  ];

  readonly paginatedPacks = computed(() => {
    const list = this.packs();
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.packs().length / this.pageSize()));
  });

  toggleActionMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openActionMenuId.update((current) => (current === id ? null : id));
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.closeActionMenu();
    }
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.closeActionMenu();
  }

  getCompletionColorClass(pct: number): string {
    if (pct >= 85) return 'bg-emerald-500';
    if (pct >= 70) return 'bg-amber-500';
    return 'bg-orange-500';
  }
}
