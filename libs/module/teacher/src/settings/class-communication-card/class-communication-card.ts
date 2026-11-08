import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassCommunicationPreferences } from '../../data/teacher-settings.data';

@Component({
  selector: 'school-hub-class-communication-card',
  imports: [FormsModule],
  templateUrl: './class-communication-card.html',
  styleUrl: './class-communication-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassCommunicationCardComponent {
  readonly preferences = input.required<ClassCommunicationPreferences>();
  readonly preferencesUpdated = output<ClassCommunicationPreferences>();

  readonly landingPageOptions: string[] = [
    'Class Dashboard',
    'Stream / Feed',
    'Learners List',
    'Curriculum',
  ];

  readonly visibilityOptions: string[] = [
    'Visible to All Classes',
    'Visible to Selected Classes Only',
    'Draft Only',
  ];

  readonly parentCopyOptions: string[] = [
    'Include by Default',
    'Do Not Include by Default',
    'Ask Each Time',
  ];

  onLandingPageChange(value: string): void {
    const updated: ClassCommunicationPreferences = {
      ...this.preferences(),
      defaultLandingPage: value,
    };
    this.preferencesUpdated.emit(updated);
  }

  onVisibilityChange(value: string): void {
    const updated: ClassCommunicationPreferences = {
      ...this.preferences(),
      announcementVisibility: value,
    };
    this.preferencesUpdated.emit(updated);
  }

  onParentCopyChange(value: string): void {
    const updated: ClassCommunicationPreferences = {
      ...this.preferences(),
      parentCopyDefault: value,
    };
    this.preferencesUpdated.emit(updated);
  }

  onSignatureChange(signature: string): void {
    const updated: ClassCommunicationPreferences = {
      ...this.preferences(),
      messageSignature: signature,
    };
    this.preferencesUpdated.emit(updated);
  }
}
