import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherLayoutComponent } from './teacher-layout';

describe('TeacherLayoutComponent', () => {
  let component: TeacherLayoutComponent;
  let fixture: ComponentFixture<TeacherLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 14 sidebar items in the teacher section', () => {
    expect(component.sidebarSections.length).toBe(1);
    expect(component.sidebarSections[0].items.length).toBe(14);
  });

  it('should configure teacher user profile correctly', () => {
    expect(component.teacherUser.name).toBe('Mr. Tunde A.');
    expect(component.teacherUser.role).toBe('English Language Tutor');
  });
});
