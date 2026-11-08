import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TopicMasteryItem } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-topic-mastery-table',
  imports: [],
  templateUrl: './topic-mastery-table.html',
  styleUrl: './topic-mastery-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicMasteryTableComponent {
  readonly topics = input.required<TopicMasteryItem[]>();
  readonly viewFullAnalysis = output<void>();

  getMasteryClass(level: string): string {
    switch (level) {
      case 'Strong':
      case 'Good':
        return 'pill-good';
      case 'Developing':
        return 'pill-developing';
      case 'Weak':
        return 'pill-weak';
      default:
        return 'pill-default';
    }
  }
}
