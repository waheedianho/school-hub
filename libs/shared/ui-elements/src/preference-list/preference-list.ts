import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
export interface PreferenceListItem {
  id: string;
  label: string;
  icon: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  route?: string;
  queryParams?: Params;
}
@Component({
  selector: 'school-hub-preference-list',
  imports: [RouterLink],
  templateUrl: './preference-list.html',
  styleUrl: './preference-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferenceListComponent {
  readonly items = input.required<readonly PreferenceListItem[]>();
  readonly label = input('Preferences');
  readonly toggled = output<{ id: string; checked: boolean }>();
}
