import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  MostUsedResourceItem,
  ResourceFormat,
} from '../../data/teacher-resources.data';

@Component({
  selector: 'school-hub-most-used-resources-panel',
  imports: [],
  templateUrl: './most-used-resources-panel.html',
  styleUrl: './most-used-resources-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostUsedResourcesPanelComponent {
  readonly items = input.required<MostUsedResourceItem[]>();
  readonly viewResource = output<MostUsedResourceItem>();
  readonly viewAll = output<void>();

  getFormatIcon(format: ResourceFormat): string {
    switch (format) {
      case 'PDF':
        return 'picture_as_pdf';
      case 'XLSX':
        return 'table_view';
      case 'PPTX':
        return 'slideshow';
      case 'MP4':
        return 'smart_display';
      default:
        return 'description';
    }
  }

  getFormatColor(format: ResourceFormat): string {
    switch (format) {
      case 'PDF':
        return 'icon-pdf';
      case 'XLSX':
        return 'icon-xlsx';
      case 'PPTX':
        return 'icon-pptx';
      case 'MP4':
        return 'icon-mp4';
      default:
        return 'icon-default';
    }
  }
}
