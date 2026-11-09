import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  COMMON_ISSUES_OBSERVED,
  CommonIssueItem,
} from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-common-issues-observed',
  templateUrl: './common-issues-observed.html',
  styleUrl: './common-issues-observed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonIssuesObservedComponent {
  readonly issues = input<CommonIssueItem[]>(COMMON_ISSUES_OBSERVED);
}
