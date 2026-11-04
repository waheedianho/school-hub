import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from './student';
import { STUDENT_PAGES } from './student-pages.config';

describe('Student', () => {
  let component: Student;
  let fixture: ComponentFixture<Student>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Student],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ page: STUDENT_PAGES[0] }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Student);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
