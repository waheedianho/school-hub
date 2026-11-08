import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'school-hub-reports-export-panel',
  imports: [],
  templateUrl: './reports-export-panel.html',
  styleUrl: './reports-export-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsExportPanelComponent {
  readonly exportPdf = output<void>();
  readonly exportExcel = output<void>();
  readonly shareWithParent = output<void>();
}
