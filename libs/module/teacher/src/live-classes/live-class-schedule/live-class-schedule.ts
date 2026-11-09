import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  TODAY_LIVE_CLASS_SCHEDULE,
  TodayLiveClassScheduleItem,
} from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-live-class-schedule',
  templateUrl: './live-class-schedule.html',
  styleUrl: './live-class-schedule.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassScheduleComponent {
  private readonly router = inject(Router);

  readonly scheduleItems = input<TodayLiveClassScheduleItem[]>(
    TODAY_LIVE_CLASS_SCHEDULE,
  );
  readonly joinSession = output<TodayLiveClassScheduleItem>();

  onJoin(item: TodayLiveClassScheduleItem): void {
    this.joinSession.emit(item);
    void this.router.navigate(['/teacher/live-classes/session']);
  }
}
