import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneralSettingsForm } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-general-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-settings.html',
  styleUrls: ['./general-settings.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent {
  readonly settings = input.required<GeneralSettingsForm>();
  readonly isDirty = input<boolean>(false);

  readonly update = output<Partial<GeneralSettingsForm>>();
  readonly save = output<void>();
  readonly discard = output<void>();

  onFieldChange<K extends keyof GeneralSettingsForm>(
    field: K,
    value: GeneralSettingsForm[K],
  ): void {
    this.update.emit({ [field]: value });
  }

  onSave(): void {
    this.save.emit();
  }

  onDiscard(): void {
    this.discard.emit();
  }
}
