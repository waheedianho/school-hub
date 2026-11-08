import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TopPerformerItem } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-top-performers',
  imports: [],
  templateUrl: './top-performers.html',
  styleUrl: './top-performers.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPerformersComponent {
  readonly performers = input.required<TopPerformerItem[]>();
  readonly viewAll = output<void>();
}
