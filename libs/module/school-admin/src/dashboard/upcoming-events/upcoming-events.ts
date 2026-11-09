import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpcomingSchoolEvent } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-upcoming-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upcoming-events.html',
  styleUrl: './upcoming-events.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingEventsComponent {
  readonly events = input.required<UpcomingSchoolEvent[]>();
}
