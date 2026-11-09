import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MisconceptionNotesComponent } from './misconception-notes';
import {
  TEACHER_MISCONCEPTION_NOTES,
  TeacherMisconceptionNote,
} from '../../data/teacher-lessons.data';

describe('MisconceptionNotesComponent', () => {
  let component: MisconceptionNotesComponent;
  let fixture: ComponentFixture<MisconceptionNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisconceptionNotesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MisconceptionNotesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notes', TEACHER_MISCONCEPTION_NOTES);
    fixture.detectChanges();
  });

  it('should create and render 2 misconception notes', () => {
    expect(component).toBeTruthy();
    const notes = fixture.nativeElement.querySelectorAll('.note-card');
    expect(notes.length).toBe(2);
  });

  it('should display titles and snippets', () => {
    const titles = fixture.nativeElement.querySelectorAll('.note-title');
    expect(titles[0].textContent).toContain(
      'Confusing adjectives with adverbs',
    );
    expect(titles[1].textContent).toContain(
      'Place-value confusion in whole numbers',
    );
  });

  it('should emit viewNote when View Note button is clicked', () => {
    let clicked: TeacherMisconceptionNote | undefined;
    component.viewNote.subscribe((n) => (clicked = n));

    const btn = fixture.nativeElement.querySelector('.btn-view');
    btn.click();

    expect(clicked).toEqual(TEACHER_MISCONCEPTION_NOTES[0]);
  });
});
