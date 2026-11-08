import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherActivityComponent } from './teacher-activity';
import { TEACHER_ACTIVITY_DATA } from '../../data/school-admin-dashboard.data';

describe('TeacherActivityComponent', () => {
  let component: TeacherActivityComponent;
  let fixture: ComponentFixture<TeacherActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherActivityComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherActivityComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activities', TEACHER_ACTIVITY_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all 5 teacher activity rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.activity-row');
    expect(rows.length).toBe(5);
  });

  it('should display Lessons Delivered with 82%', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Lessons Delivered');
    expect(text).toContain('128 / 156');
    expect(text).toContain('82%');
  });
});
