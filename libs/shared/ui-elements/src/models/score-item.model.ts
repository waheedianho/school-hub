import { Params } from '@angular/router';
import { UiTone } from './ui-tone.model';

export interface ScoreItem {
  id: string;
  label: string;
  value?: number;
  description?: string;
  tone: UiTone;
  badge?: string;
  route?: string;
  queryParams?: Params;
}
