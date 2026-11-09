import { Component, input, output } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherTopicDeliveryPack } from '../../data/teacher-lessons.data';

@Component({
  selector: 'school-hub-topic-delivery-packs-table',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './topic-delivery-packs-table.html',
  styleUrl: './topic-delivery-packs-table.scss',
})
export class TopicDeliveryPacksTableComponent {
  readonly packs = input.required<TeacherTopicDeliveryPack[]>();
  readonly selectedPackId = input<string>('tdp-1');
  readonly selectPack = output<TeacherTopicDeliveryPack>();

  onSelect(pack: TeacherTopicDeliveryPack): void {
    this.selectPack.emit(pack);
  }
}
