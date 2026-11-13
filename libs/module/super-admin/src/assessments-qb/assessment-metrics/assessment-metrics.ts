import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentMetric } from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-metrics.html',
  styleUrls: ['./assessment-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentMetricsComponent {
  readonly metrics = input.required<AssessmentMetric[]>();

  getToneBg(tone: string): string {
    switch (tone) {
      case 'primary':
        return 'bg-blue-50 text-blue-600';
      case 'success':
        return 'bg-emerald-50 text-emerald-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'warning':
        return 'bg-amber-50 text-amber-600';
      case 'danger':
        return 'bg-rose-50 text-rose-600';
      case 'info':
      default:
        return 'bg-slate-100 text-slate-600';
    }
  }
}
