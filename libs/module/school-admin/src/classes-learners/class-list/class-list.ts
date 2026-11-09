import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolClass } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-class-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-list.html',
  styleUrls: ['./class-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassListComponent {
  readonly classes = input.required<SchoolClass[]>();
  readonly selectedClassId = input.required<string>();
  readonly classSelected = output<string>();
  readonly addClassClicked = output<void>();

  onSelectClass(classId: string): void {
    this.classSelected.emit(classId);
  }

  onAddClass(): void {
    this.addClassClicked.emit();
  }
}
