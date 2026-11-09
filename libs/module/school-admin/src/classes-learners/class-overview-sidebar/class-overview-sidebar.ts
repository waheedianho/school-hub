import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolClass } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-class-overview-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-overview-sidebar.html',
  styleUrls: ['./class-overview-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassOverviewSidebarComponent {
  readonly selectedClass = input.required<SchoolClass>();
  readonly quickActionClicked = output<string>();

  onQuickAction(action: string): void {
    this.quickActionClicked.emit(action);
  }
}
