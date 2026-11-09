import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PagePlaceholderComponent } from '@school-hub/ui-elements';
import { StudentPage } from './student-pages.config';

@Component({
  selector: 'school-hub-student',
  imports: [PagePlaceholderComponent],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student {
  private readonly route = inject(ActivatedRoute);

  protected readonly page = toSignal(
    this.route.data.pipe(map((data) => data['page'] as StudentPage)),
    { requireSync: true },
  );
}
