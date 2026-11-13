import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateUserData, UserRole } from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user-modal.html',
  styleUrl: './add-user-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserModalComponent {
  readonly closeModal = output<void>();
  readonly userCreated = output<CreateUserData>();

  readonly formData = signal<CreateUserData>({
    name: '',
    email: '',
    role: 'Teacher',
    institution: 'Greenfield International',
    phone: '',
    sendInvite: true,
    requireMfa: true,
  });

  readonly validationError = signal<string | null>(null);

  readonly roleOptions: UserRole[] = [
    'Super Admin',
    'School Admin',
    'Teacher',
    'Learner',
    'Parent',
  ];

  readonly institutionOptions = [
    'Greenfield International',
    'Sunrise Public School',
    'Northview Academy',
    'Oakridge High School',
    'Bright Future School',
    'Westfield Secondary',
    'Lakeside Montessori',
    'Harmony Prep School',
    'City Central School',
    'Maple Leaf Academy',
  ];

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }

  updateField<K extends keyof CreateUserData>(
    field: K,
    val: CreateUserData[K],
  ): void {
    this.formData.update((prev) => ({ ...prev, [field]: val }));
    this.validationError.set(null);
  }

  onSubmit(): void {
    const data = this.formData();
    if (!data.name.trim()) {
      this.validationError.set('Please provide a full user name.');
      return;
    }
    if (!data.email.trim() || !data.email.includes('@')) {
      this.validationError.set('Please provide a valid email address.');
      return;
    }

    this.userCreated.emit(data);
  }
}
