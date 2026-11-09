import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherUnreadMessage } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-unread-messages',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './unread-messages.html',
  styleUrl: './unread-messages.scss',
})
export class UnreadMessagesComponent {
  readonly messages = input.required<TeacherUnreadMessage[]>();
}
