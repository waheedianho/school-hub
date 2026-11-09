import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
export interface ResourceListItem {
  id: string;
  title: string;
  meta: string;
  icon: string;
  route?: string | readonly string[];
  queryParams?: Params;
}
@Component({
  selector: 'school-hub-resource-list',
  imports: [RouterLink],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent {
  readonly items = input.required<readonly ResourceListItem[]>();
  readonly newTab = input(false);
  readonly label = input('Class resources');
  readonly downloaded = output<string>();
}
