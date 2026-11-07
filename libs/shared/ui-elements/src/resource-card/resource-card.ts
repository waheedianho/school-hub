import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { UiTone } from '../models/ui-tone.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { ResourceArtworkComponent } from '../resource-artwork/resource-artwork';
export interface ResourceCardItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  typeLabel: string;
  meta: string;
  tone: UiTone;
  artTone?: UiTone;
  icon: string;
  symbol: string;
  route: string;
  queryParams?: Params;
  available: boolean;
}
@Component({
  selector: 'school-hub-resource-card',
  imports: [RouterLink, StatusBadgeComponent, ResourceArtworkComponent],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent {
  readonly item = input.required<ResourceCardItem>();
  readonly saved = input(false);
  readonly disabled = input(false);
  readonly saveToggled = output<string>();
}
