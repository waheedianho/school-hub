import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PagePlaceholderComponent } from '@school-hub/ui-elements';
import { SuperAdminPage } from './super-admin-pages.config';

@Component({
  selector: 'school-hub-super-admin',
  standalone: true,
  imports: [PagePlaceholderComponent],
  templateUrl: './super-admin.html',
  styleUrl: './super-admin.scss',
})
export class SuperAdmin {
  private readonly route = inject(ActivatedRoute);

  protected readonly page = toSignal(
    this.route.data.pipe(
      map((data) => data['page'] as SuperAdminPage | undefined),
    ),
    { initialValue: undefined },
  );
}
