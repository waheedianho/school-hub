import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LessonsQuickActionsComponent } from './lessons-quick-actions';
import { TEACHER_LESSONS_QUICK_ACTIONS } from '../../data/teacher-lessons.data';

describe('LessonsQuickActionsComponent', () => {
  let component: LessonsQuickActionsComponent;
  let fixture: ComponentFixture<LessonsQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsQuickActionsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', TEACHER_LESSONS_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create and render 5 quick actions', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items.length).toBe(5);
  });

  it('should display action labels and routes correctly', () => {
    const labels = fixture.nativeElement.querySelectorAll('.action-label');
    expect(labels[0].textContent).toContain('Create New Pack');
    expect(labels[1].textContent).toContain('Open Delivery Pack');
    expect(labels[2].textContent).toContain('Upload Worksheet');
  });
});
