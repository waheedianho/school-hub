import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-class-observer-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-observer-modal.html',
  styleUrls: ['./class-observer-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassObserverModalComponent {
  readonly store = inject(SchoolAdminStore);

  readonly activeView = signal<'stream' | 'participants' | 'chat'>('stream');
  readonly broadcastMessageSent = signal<boolean>(false);

  readonly sampleParticipants = [
    { name: 'Adewale Johnson', mic: false, cam: true, status: 'Active' },
    { name: 'Chioma Okeke', mic: false, cam: true, status: 'Active' },
    { name: 'Emeka Nwachukwu', mic: false, cam: false, status: 'Active' },
    { name: 'Fatima Sanusi', mic: false, cam: true, status: 'Active' },
    { name: 'Oluwaseun Balogun', mic: false, cam: true, status: 'Active' },
    { name: 'Zainab Ibrahim', mic: false, cam: false, status: 'Active' },
    { name: 'David Adeleke', mic: true, cam: true, status: 'Speaking' },
    { name: 'Grace Bassey', mic: false, cam: true, status: 'Active' },
  ];

  readonly chatLog = [
    {
      sender: 'Mr. Tunde Adewale (Teacher)',
      text: 'Welcome everyone! Please open your workbook to page 42.',
      time: '09:02 AM',
    },
    {
      sender: 'Chioma Okeke',
      text: 'Good morning sir, page is open.',
      time: '09:03 AM',
    },
    {
      sender: 'David Adeleke',
      text: 'Sir, could you please repeat the formula for question 3?',
      time: '09:12 AM',
    },
    {
      sender: 'Mr. Tunde Adewale (Teacher)',
      text: 'Sure David, let me project the formula on screen.',
      time: '09:13 AM',
    },
  ];

  onClose(): void {
    this.store.closeLiveClassObserver();
  }

  sendAdminNotice(): void {
    this.broadcastMessageSent.set(true);
    setTimeout(() => {
      this.broadcastMessageSent.set(false);
    }, 4000);
  }
}
