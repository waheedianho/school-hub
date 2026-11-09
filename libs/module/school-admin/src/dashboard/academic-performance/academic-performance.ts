import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AcademicPerformanceOverview } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-academic-performance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './academic-performance.html',
  styleUrl: './academic-performance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicPerformanceComponent {
  readonly performance = input.required<AcademicPerformanceOverview>();

  selectedTerm = 'This Term';
  readonly termOptions = ['This Term', 'Second Term', 'First Term'];

  getBarHeightPercentage(average: number): number {
    return Math.min(100, Math.max(0, average));
  }
}
