import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TopPerformingSubject } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-top-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './top-subjects.html',
  styleUrl: './top-subjects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSubjectsComponent {
  readonly subjects = input.required<TopPerformingSubject[]>();

  selectedTerm = 'This Term';
  readonly termOptions = ['This Term', 'Second Term', 'First Term'];
}
