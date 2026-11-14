import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformReport } from '../../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-report-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-detail-modal.html',
  styleUrls: ['./report-detail-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailModalComponent {
  readonly report = input.required<PlatformReport>();
  readonly download = output<PlatformReport>();
  readonly closed = output<void>();

  onDownload(): void {
    this.download.emit(this.report());
  }

  onClose(): void {
    this.closed.emit();
  }
}
