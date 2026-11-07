import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  ATTENDANCE_SNAPSHOT_DATA,
  AttendanceSnapshotData,
} from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-live-attendance-snapshot',
  templateUrl: './live-attendance-snapshot.html',
  styleUrl: './live-attendance-snapshot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveAttendanceSnapshotComponent {
  readonly attendanceData = input<AttendanceSnapshotData>(
    ATTENDANCE_SNAPSHOT_DATA,
  );
}
