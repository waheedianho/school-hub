import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledLiveClass } from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-scheduled-live-classes-table',
  templateUrl: './scheduled-live-classes-table.html',
  styleUrl: './scheduled-live-classes-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduledLiveClassesTableComponent {
  private readonly router = inject(Router);

  readonly scheduledClasses = input.required<ScheduledLiveClass[]>();
  readonly joinSession = output<ScheduledLiveClass>();

  onJoin(liveClass: ScheduledLiveClass): void {
    this.joinSession.emit(liveClass);
    void this.router.navigate(['/teacher/live-classes/session']);
  }

  onViewAll(): void {
    // Keeps context on live-classes page
  }
}
