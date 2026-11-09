import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { QuickReportType } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-quick-reports-panel',
  imports: [],
  templateUrl: './quick-reports-panel.html',
  styleUrl: './quick-reports-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickReportsPanelComponent {
  readonly reports = input.required<QuickReportType[]>();
  readonly reportSelected = output<string>();

  onSelectReport(id: string): void {
    this.reportSelected.emit(id);
  }
}
