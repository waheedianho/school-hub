import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherAnnouncementItem } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-recent-announcements',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './recent-announcements.html',
  styleUrl: './recent-announcements.scss',
})
export class RecentAnnouncementsComponent {
  readonly items = input.required<TeacherAnnouncementItem[]>();
}
