import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SchoolSubscription,
  SubscriptionStatus,
} from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-subscriptions-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscriptions-table.html',
  styleUrls: ['./subscriptions-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsTableComponent {
  readonly subscriptions = input.required<SchoolSubscription[]>();
  readonly totalCount = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly searchQuery = input.required<string>();
  readonly selectedPlan = input.required<string>();
  readonly selectedStatus = input.required<string>();
  readonly renewalSort = input.required<'asc' | 'desc' | 'none'>();

  readonly searchChange = output<string>();
  readonly planChange = output<string>();
  readonly statusChange = output<string>();
  readonly sortToggle = output<void>();
  readonly pageChange = output<number>();
  readonly createPlanClicked = output<void>();
  readonly generateInvoiceClicked = output<void>();
  readonly exportClicked = output<void>();
  readonly viewSchoolDetails = output<SchoolSubscription>();
  readonly statusUpdate = output<{
    subscription: SchoolSubscription;
    newStatus: SubscriptionStatus;
  }>();

  readonly openActionMenuId = signal<string | null>(null);

  readonly plansList = [
    'All Plans',
    'Enterprise',
    'Professional',
    'Starter',
    'Trial',
  ];
  readonly statusesList = [
    'All Billing Statuses',
    'Active',
    'Expiring Soon',
    'Payment Failed',
    'Trial',
    'Suspended',
  ];

  toggleActionMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.openActionMenuId() === id) {
      this.openActionMenuId.set(null);
    } else {
      this.openActionMenuId.set(id);
    }
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onSearchInput(value: string): void {
    this.searchChange.emit(value);
  }

  onPlanSelect(plan: string): void {
    this.planChange.emit(plan);
  }

  onStatusSelect(status: string): void {
    this.statusChange.emit(status);
  }

  onSortClick(): void {
    this.sortToggle.emit();
  }

  onPageSelect(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  onViewDetails(sub: SchoolSubscription): void {
    this.closeActionMenu();
    this.viewSchoolDetails.emit(sub);
  }

  onUpdateStatus(sub: SchoolSubscription, newStatus: SubscriptionStatus): void {
    this.closeActionMenu();
    this.statusUpdate.emit({ subscription: sub, newStatus });
  }

  get startItemIndex(): number {
    if (this.totalCount() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage() * this.pageSize(), this.totalCount());
  }
}
