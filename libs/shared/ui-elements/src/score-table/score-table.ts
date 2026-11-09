import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScoreItem } from '../models/score-item.model';
import { ProgressBarComponent } from '../progress-bar/progress-bar';
import { StatusBadgeComponent } from '../status-badge/status-badge';
@Component({
  selector: 'school-hub-score-table',
  imports: [RouterLink, ProgressBarComponent, StatusBadgeComponent],
  templateUrl: './score-table.html',
  styleUrl: './score-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreTableComponent {
  readonly items = input.required<readonly ScoreItem[]>();
  readonly label = input('Topic mastery');
  readonly itemHeading = input('Topic');
  readonly progressHeading = input('Progress');
  readonly showMastery = input(true);
  readonly emptyMessage = input('No topics in this selection.');
}
