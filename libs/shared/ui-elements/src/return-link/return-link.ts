import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'school-hub-return-link',
  imports: [RouterLink],
  template:
    '<a [routerLink]="destination()"><i class="ri-arrow-left-line" aria-hidden="true"></i>{{ label() }}</a>',
  styles: [
    ':host { display: block; margin-bottom: 16px; } a { display: inline-flex; align-items: center; gap: 8px; color: #7045ac; font-size: 0.875rem; font-weight: 600; text-decoration: none; } a:hover { text-decoration: underline; } a:focus-visible { outline: 2px solid #8b42dc; outline-offset: 4px; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnLinkComponent {
  private readonly router = inject(Router);
  readonly route = input.required<string>();
  readonly label = input('Back');
  protected readonly destination = computed(() =>
    this.router.parseUrl(this.route()),
  );
}
