import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminStore } from '../data/super-admin.store';
import { SubscriptionsMetricsComponent } from './subscriptions-metrics/subscriptions-metrics';
import { SubscriptionsTableComponent } from './subscriptions-table/subscriptions-table';
import { SubscriptionsBottomMetricsComponent } from './subscriptions-bottom-metrics/subscriptions-bottom-metrics';
import { SubscriptionsSidebarComponent } from './subscriptions-sidebar/subscriptions-sidebar';
import { CreatePlanModalComponent } from './create-plan-modal/create-plan-modal';
import { GenerateInvoiceModalComponent } from './generate-invoice-modal/generate-invoice-modal';
import { SubscriptionDetailModalComponent } from './subscription-detail-modal/subscription-detail-modal';
import {
  SchoolSubscription,
  SubscriptionInvoice,
  SubscriptionPlanDefinition,
  SubscriptionStatus,
} from '../data/super-admin-subscriptions.models';
import { InvoicesTableComponent } from './invoices-table/invoices-table';

@Component({
  selector: 'school-hub-subscriptions-billing',
  standalone: true,
  imports: [
    CommonModule,
    SubscriptionsMetricsComponent,
    SubscriptionsTableComponent,
    SubscriptionsBottomMetricsComponent,
    SubscriptionsSidebarComponent,
    InvoicesTableComponent,
    CreatePlanModalComponent,
    GenerateInvoiceModalComponent,
    SubscriptionDetailModalComponent,
  ],
  templateUrl: './subscriptions-billing.html',
  styleUrls: ['./subscriptions-billing.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsBillingComponent {
  readonly store = inject(SuperAdminStore);

  readonly tabs: string[] = [
    'Subscription Plans',
    'Active Billing',
    'Renewals',
    'Invoices',
    'Payment Issues',
  ];

  readonly isDatePickerOpen = signal<boolean>(false);
  readonly dateRangeOptions = [
    'May 12 – May 18, 2025',
    'May 5 – May 11, 2025',
    'Apr 28 – May 4, 2025',
    'Last 30 Days',
    'This Quarter',
    'Year to Date',
  ];

  readonly isCreatePlanModalOpen = signal<boolean>(false);
  readonly isGenerateInvoiceModalOpen = signal<boolean>(false);
  readonly selectedDetailSubscription = signal<SchoolSubscription | null>(null);
  readonly toastMessage = signal<string | null>(null);

  selectTab(tab: string): void {
    this.store.setSubscriptionTab(tab);
  }

  toggleDatePicker(): void {
    this.isDatePickerOpen.update((v) => !v);
  }

  selectDateRange(range: string): void {
    this.store.setSubscriptionsDateRange(range);
    this.isDatePickerOpen.set(false);
  }

  onSearchChange(query: string): void {
    this.store.setSubscriptionsSearch(query);
  }

  onPlanFilterChange(plan: string): void {
    this.store.setSubscriptionPlanFilter(plan);
  }

  onStatusFilterChange(status: string): void {
    this.store.setSubscriptionStatusFilter(status);
  }

  onSortToggle(): void {
    this.store.toggleRenewalDateSort();
  }

  onPageChange(page: number): void {
    this.store.setSubscriptionsPage(page);
  }

  openCreatePlanModal(): void {
    this.isCreatePlanModalOpen.set(true);
  }

  closeCreatePlanModal(): void {
    this.isCreatePlanModalOpen.set(false);
  }

  onPlanCreated(newPlan: SubscriptionPlanDefinition): void {
    this.store.createSubscriptionPlan(newPlan);
    this.isCreatePlanModalOpen.set(false);
    this.showToast(`Plan "${newPlan.name}" created successfully!`);
  }

  openGenerateInvoiceModal(): void {
    this.isGenerateInvoiceModalOpen.set(true);
  }

  closeGenerateInvoiceModal(): void {
    this.isGenerateInvoiceModalOpen.set(false);
  }

  onInvoiceGenerated(invoiceData: Omit<SubscriptionInvoice, 'id'>): void {
    const inv = this.store.generateInvoice(invoiceData);
    this.isGenerateInvoiceModalOpen.set(false);
    this.showToast(`Invoice ${inv.invoiceNumber} generated successfully!`);
  }

  openSubscriptionDetail(sub: SchoolSubscription): void {
    this.selectedDetailSubscription.set(sub);
  }

  closeSubscriptionDetail(): void {
    this.selectedDetailSubscription.set(null);
  }

  onStatusUpdate(event: {
    subscription: SchoolSubscription;
    newStatus: SubscriptionStatus;
  }): void {
    this.store.updateSubscriptionStatus(event.subscription.id, event.newStatus);
    this.showToast(
      `${event.subscription.schoolName} status updated to ${event.newStatus}.`,
    );
  }

  onExportData(): void {
    this.showToast('Exporting Subscriptions & Billing summary report...');
  }

  onDownloadInvoice(inv: SubscriptionInvoice): void {
    this.showToast(`Downloading receipt for ${inv.invoiceNumber}...`);
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3500);
  }
}
