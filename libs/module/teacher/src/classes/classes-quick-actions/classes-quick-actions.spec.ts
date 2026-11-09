import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassesQuickActionsComponent } from './classes-quick-actions';
import { TEACHER_CLASSES_QUICK_ACTIONS } from '../../data/teacher-classes.data';

describe('ClassesQuickActionsComponent', () => {
  let component: ClassesQuickActionsComponent;
  let fixture: ComponentFixture<ClassesQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesQuickActionsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', TEACHER_CLASSES_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create and render all 5 quick actions', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items.length).toBe(5);
  });

  it('should render action labels and links correctly', () => {
    const labels = fixture.nativeElement.querySelectorAll('.action-label');
    expect(labels[0].textContent).toContain('Create Assignment');
    expect(labels[1].textContent).toContain('Schedule Live Class');
    expect(labels[2].textContent).toContain('Create Quiz/Test');
    expect(labels[3].textContent).toContain('Send Announcement');
    expect(labels[4].textContent).toContain('Bulk Message to Classes');

    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items[0].getAttribute('href')).toBe('/teacher/assignments');
  });
});
