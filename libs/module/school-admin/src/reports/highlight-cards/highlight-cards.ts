import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-reports-highlight-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlight-cards.html',
  styleUrls: ['./highlight-cards.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsHighlightCardsComponent {
  readonly store = inject(SchoolAdminStore);
  readonly insights = this.store.reportsHighlightInsights;
}
