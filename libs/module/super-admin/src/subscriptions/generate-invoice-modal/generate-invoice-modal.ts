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
  SubscriptionInvoice,
  SubscriptionPlanType,
} from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-generate-invoice-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-invoice-modal.html',
  styleUrls: ['./generate-invoice-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateInvoiceModalComponent {
  readonly schools = input.required<SchoolSubscription[]>();
  readonly invoiceGenerated = output<Omit<SubscriptionInvoice, 'id'>>();
  readonly closed = output<void>();

  readonly selectedSchoolId = signal<string>('');
  readonly invoiceAmount = signal<number>(5000);
  readonly dueDate = signal<string>('2025-06-30');
  readonly selectedPlan = signal<SubscriptionPlanType>('Professional');

  constructor() {
    // If schools provided, prefill
  }

  onSchoolChange(schoolId: string): void {
    this.selectedSchoolId.set(schoolId);
    const sub = this.schools().find((s) => s.id === schoolId);
    if (sub) {
      this.invoiceAmount.set(sub.amount);
      this.selectedPlan.set(sub.plan);
    }
  }

  onSubmit(): void {
    const sub = this.schools().find((s) => s.id === this.selectedSchoolId());
    const schoolName = sub ? sub.schoolName : 'Custom Institution';
    const schoolDomain = sub ? sub.domain : 'school.edu';
    const num = Math.floor(1000 + Math.random() * 9000);

    const invoice: Omit<SubscriptionInvoice, 'id'> = {
      invoiceNumber: `INV-2025-${num}`,
      schoolName,
      schoolDomain,
      plan: this.selectedPlan(),
      amount: this.invoiceAmount(),
      amountFormatted: `$${this.invoiceAmount().toLocaleString()}.00`,
      issueDate: 'May 18, 2025',
      dueDate: this.dueDate(),
      status: 'Pending',
    };

    this.invoiceGenerated.emit(invoice);
  }

  onClose(): void {
    this.closed.emit();
  }
}
