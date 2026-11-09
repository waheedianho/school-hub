import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Teacher } from './teacher';
import { TEACHER_PAGES } from './teacher-pages.config';

describe('Teacher', () => {
  let component: Teacher;
  let fixture: ComponentFixture<Teacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teacher],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ page: TEACHER_PAGES[0] }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Teacher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title from route data', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Dashboard');
  });
});
