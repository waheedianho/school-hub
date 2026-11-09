import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherMisconceptionNote } from '../../data/teacher-lessons.data';

@Component({
  selector: 'school-hub-misconception-notes',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './misconception-notes.html',
  styleUrl: './misconception-notes.scss',
})
export class MisconceptionNotesComponent {
  readonly notes = input.required<TeacherMisconceptionNote[]>();
  readonly viewNote = output<TeacherMisconceptionNote>();

  onView(note: TeacherMisconceptionNote): void {
    this.viewNote.emit(note);
  }
}
