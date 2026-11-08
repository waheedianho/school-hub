import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherProfileInfo } from '../../data/teacher-settings.data';

@Component({
  selector: 'school-hub-profile-settings-card',
  imports: [FormsModule],
  templateUrl: './profile-settings-card.html',
  styleUrl: './profile-settings-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsCardComponent {
  readonly profile = input.required<TeacherProfileInfo>();
  readonly profileUpdated = output<TeacherProfileInfo>();

  readonly isEditing = signal<boolean>(false);
  readonly editName = signal<string>('');
  readonly editPhone = signal<string>('');
  readonly editSpecialty = signal<string>('');

  onStartEdit(): void {
    const p = this.profile();
    this.editName.set(p.name);
    this.editPhone.set(p.phone);
    this.editSpecialty.set(p.specialty);
    this.isEditing.set(true);
  }

  onSaveEdit(): void {
    const updated: TeacherProfileInfo = {
      ...this.profile(),
      name: this.editName().trim() || this.profile().name,
      phone: this.editPhone().trim() || this.profile().phone,
      specialty: this.editSpecialty().trim() || this.profile().specialty,
    };
    this.profileUpdated.emit(updated);
    this.isEditing.set(false);
  }

  onCancelEdit(): void {
    this.isEditing.set(false);
  }

  onAvatarChange(): void {
    // Triggers avatar upload/selection
  }
}
