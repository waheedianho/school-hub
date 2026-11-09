import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  ResourceFormat,
  ResourceItem,
} from '../../data/teacher-resources.data';

@Component({
  selector: 'school-hub-resources-table',
  imports: [],
  templateUrl: './resources-table.html',
  styleUrl: './resources-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesTableComponent {
  readonly resources = input.required<ResourceItem[]>();
  readonly viewResource = output<ResourceItem>();
  readonly downloadResource = output<ResourceItem>();
  readonly openMenu = output<ResourceItem>();

  getTypeBadgeClass(typeLabel: string): string {
    switch (typeLabel) {
      case 'PDF Note':
      case 'PDF':
        return 'type-badge-pdf';
      case 'Worksheet':
        return 'type-badge-worksheet';
      case 'Slides':
        return 'type-badge-slides';
      case 'Video':
        return 'type-badge-video';
      case 'Answer Guide':
        return 'type-badge-guide';
      default:
        return 'type-badge-default';
    }
  }

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

  getFormatColorClass(format: ResourceFormat): string {
    switch (format) {
      case 'PDF':
        return 'fmt-pdf';
      case 'XLSX':
        return 'fmt-xlsx';
      case 'PPTX':
        return 'fmt-pptx';
      case 'MP4':
        return 'fmt-mp4';
      default:
        return 'fmt-default';
    }
  }
}
