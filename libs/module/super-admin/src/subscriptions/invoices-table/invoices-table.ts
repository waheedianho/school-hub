import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionInvoice } from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-invoices-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices-table.html',
  styleUrls: ['./invoices-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesTableComponent {
  readonly invoices = input.required<SubscriptionInvoice[]>();
  readonly downloadInvoice = output<SubscriptionInvoice>();
  readonly generateInvoice = output<void>();

  onDownload(inv: SubscriptionInvoice): void {
    this.downloadInvoice.emit(inv);
  }
}
