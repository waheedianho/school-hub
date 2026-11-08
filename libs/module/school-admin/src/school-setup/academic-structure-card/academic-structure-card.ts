import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AcademicSession,
  AcademicStructure,
} from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-academic-structure-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './academic-structure-card.html',
  styleUrls: ['./academic-structure-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicStructureCardComponent {
  readonly structure = input.required<AcademicStructure>();
  readonly sessions = input<AcademicSession[]>([]);
  readonly structureChange = output<Partial<AcademicStructure>>();

  readonly namingConventions: string[] = [
    'JSS 1 - SS 3 (e.g. JSS 1A)',
    'Basic 7 - SS 3 (e.g. Basic 7A)',
    'Grade 7 - Grade 12 (e.g. Grade 7A)',
    'Year 7 - Year 12 (e.g. Year 7A)',
  ];

  readonly terms: string[] = ['First Term', 'Second Term', 'Third Term'];

  onFieldChange(field: keyof AcademicStructure, value: unknown): void {
    this.structureChange.emit({ [field]: value });
  }

  incrementArms(): void {
    const current = this.structure().classArms;
    if (current < 10) {
      this.structureChange.emit({ classArms: current + 1 });
    }
  }

  decrementArms(): void {
    const current = this.structure().classArms;
    if (current > 1) {
      this.structureChange.emit({ classArms: current - 1 });
    }
  }
}
