import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeacherActivityMetric } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-teacher-activity',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './teacher-activity.html',
  styleUrl: './teacher-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherActivityComponent {
  readonly activities = input.required<TeacherActivityMetric[]>();

  selectedTerm = 'This Term';
  readonly termOptions = ['This Term', 'Second Term', 'First Term'];
}
