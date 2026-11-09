import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResourceCardItem } from '../resource-card/resource-card';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { StatusBadgeComponent } from '../status-badge/status-badge';
export interface ResourceTableRow extends ResourceCardItem {
  date: string;
  size: string;
  externalUrl?: string;
}
@Component({
  selector: 'school-hub-resource-table',
  imports: [RouterLink, IconBadgeComponent, StatusBadgeComponent],
  templateUrl: './resource-table.html',
  styleUrl: './resource-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceTableComponent {
  readonly rows = input.required<readonly ResourceTableRow[]>();
  readonly disabled = input(false);
  readonly more = output<string>();
  readonly visited = output<string>();
}
