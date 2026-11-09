import { Component, input, output } from '@angular/core';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherSelectedPackOverview } from '../../data/teacher-lessons.data';

@Component({
  selector: 'school-hub-selected-pack-overview',
  standalone: true,
  imports: [DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './selected-pack-overview.html',
  styleUrl: './selected-pack-overview.scss',
})
export class SelectedPackOverviewComponent {
  readonly pack = input.required<TeacherSelectedPackOverview>();
  readonly openPack = output<TeacherSelectedPackOverview>();
  readonly editPack = output<TeacherSelectedPackOverview>();

  onOpen(): void {
    this.openPack.emit(this.pack());
  }

  onEdit(): void {
    this.editPack.emit(this.pack());
  }
}
