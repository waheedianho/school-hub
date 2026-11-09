import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CurriculumCoverage } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-curriculum-coverage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './curriculum-coverage.html',
  styleUrl: './curriculum-coverage.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumCoverageComponent {
  readonly coverage = input.required<CurriculumCoverage>();

  selectedTerm = 'This Term';
  readonly termOptions = ['This Term', 'Second Term', 'First Term'];

  readonly circumference = 314.16; // 2 * PI * 50

  get onTrackDash(): string {
    const len = (this.coverage().onTrackPercentage / 100) * this.circumference;
    return `${len} ${this.circumference}`;
  }

  get behindDash(): string {
    const len = (this.coverage().behindPercentage / 100) * this.circumference;
    return `${len} ${this.circumference}`;
  }

  get behindOffset(): number {
    return -((this.coverage().onTrackPercentage / 100) * this.circumference);
  }

  get atRiskDash(): string {
    const len = (this.coverage().atRiskPercentage / 100) * this.circumference;
    return `${len} ${this.circumference}`;
  }

  get atRiskOffset(): number {
    return -(
      ((this.coverage().onTrackPercentage + this.coverage().behindPercentage) /
        100) *
      this.circumference
    );
  }
}
