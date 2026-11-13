import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentTemplate } from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-templates-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-templates-view.html',
  styleUrls: ['./assessment-templates-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentTemplatesViewComponent {
  readonly templates = input.required<AssessmentTemplate[]>();
  readonly useTemplate = output<AssessmentTemplate>();

  onUse(template: AssessmentTemplate): void {
    this.useTemplate.emit(template);
  }
}
