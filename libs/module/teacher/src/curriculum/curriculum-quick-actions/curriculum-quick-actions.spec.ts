import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CurriculumQuickActionsComponent } from './curriculum-quick-actions';
import { TEACHER_CURRICULUM_QUICK_ACTIONS } from '../../data/teacher-curriculum.data';

describe('CurriculumQuickActionsComponent', () => {
  let component: CurriculumQuickActionsComponent;
  let fixture: ComponentFixture<CurriculumQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumQuickActionsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', TEACHER_CURRICULUM_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create and render 5 quick actions', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items.length).toBe(5);
  });

  it('should display action labels and routes correctly', () => {
    const labels = fixture.nativeElement.querySelectorAll('.action-label');
    expect(labels[0].textContent).toContain('Open Delivery Pack');
    expect(labels[1].textContent).toContain('View Scheme of Work');
    expect(labels[2].textContent).toContain('Create Lesson');
    expect(labels[3].textContent).toContain('Assign Worksheet');
    expect(labels[4].textContent).toContain('Open Question Bank');

    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items[0].getAttribute('href')).toBe('/teacher/lessons');
  });
});
