import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  CLASS_MATERIALS_RECORDINGS,
  ClassMaterialItem,
} from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-class-materials-recordings',
  templateUrl: './class-materials-recordings.html',
  styleUrl: './class-materials-recordings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassMaterialsRecordingsComponent {
  readonly materials = input<ClassMaterialItem[]>(CLASS_MATERIALS_RECORDINGS);
}
