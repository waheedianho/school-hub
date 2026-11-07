import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PagePlaceholderComponent } from '@school-hub/ui-elements';
import { TeacherPage, TEACHER_PAGES } from './teacher-pages.config';

@Component({
  selector: 'lib-teacher',
  imports: [PagePlaceholderComponent],
  templateUrl: './teacher.html',
  styleUrl: './teacher.scss',
})
export class Teacher {
  private readonly route = inject(ActivatedRoute);

  protected readonly page = toSignal(
    this.route.data.pipe(
      map((data) => (data['page'] as TeacherPage) || TEACHER_PAGES[0]),
    ),
    { requireSync: true },
  );
}
