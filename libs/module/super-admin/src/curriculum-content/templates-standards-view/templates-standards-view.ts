import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumTemplate } from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-templates-standards-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates-standards-view.html',
  styleUrls: ['./templates-standards-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesStandardsViewComponent {
  readonly templates = input.required<CurriculumTemplate[]>();

  readonly applyTemplate = output<CurriculumTemplate>();
  readonly downloadTemplate = output<CurriculumTemplate>();
}
