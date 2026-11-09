import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumProgressComponent } from './curriculum-progress';
import { TEACHER_WEEKS_COVERAGE } from '../../data/teacher-curriculum.data';

describe('CurriculumProgressComponent', () => {
  let component: CurriculumProgressComponent;
  let fixture: ComponentFixture<CurriculumProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumProgressComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('weeks', TEACHER_WEEKS_COVERAGE);
    fixture.detectChanges();
  });

  it('should create and render 13 week blocks', () => {
    expect(component).toBeTruthy();
    const blocks = fixture.nativeElement.querySelectorAll('.week-block');
    expect(blocks.length).toBe(13);
  });

  it('should mark completed and in-progress weeks with icons', () => {
    const completedBlocks =
      fixture.nativeElement.querySelectorAll('.block-completed');
    expect(completedBlocks.length).toBe(3);

    const inProgressBlocks =
      fixture.nativeElement.querySelectorAll('.block-in-progress');
    expect(inProgressBlocks.length).toBe(1);
  });

  it('should display summary values', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-big-val');
    expect(values[0].textContent.trim()).toBe('68%');
    expect(values[1].textContent.trim()).toBe('9 / 13');
    expect(values[2].textContent.trim()).toBe('4');
    expect(values[3].textContent.trim()).toBe('4');
  });
});
