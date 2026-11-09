import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassesTableComponent } from './classes-table';
import {
  TEACHER_CLASSES_DATA,
  TeacherClassItem,
} from '../../data/teacher-classes.data';

describe('ClassesTableComponent', () => {
  let component: ClassesTableComponent;
  let fixture: ComponentFixture<ClassesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesTableComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('classes', TEACHER_CLASSES_DATA);
    fixture.detectChanges();
  });

  it('should create and render 4 class rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
  });

  it('should display class names, averages, and attendance', () => {
    const badges = fixture.nativeElement.querySelectorAll('.class-badge');
    expect(badges[0].textContent).toContain('JSS 1A');
    expect(badges[1].textContent).toContain('JSS 1B');

    const averages = fixture.nativeElement.querySelectorAll('.cell-average');
    expect(averages[0].textContent).toContain('76%');
    expect(averages[1].textContent).toContain('68%');
  });

  it('should emit viewClass when view button is clicked', () => {
    let selected: TeacherClassItem | undefined;
    component.viewClass.subscribe((cls) => (selected = cls));

    const viewBtn = fixture.nativeElement.querySelector('.btn-icon');
    viewBtn.click();

    expect(selected).toEqual(TEACHER_CLASSES_DATA[0]);
  });
});
