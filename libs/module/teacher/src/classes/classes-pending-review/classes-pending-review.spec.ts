import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassesPendingReviewComponent } from './classes-pending-review';
import { TEACHER_CLASSES_PENDING_REVIEWS } from '../../data/teacher-classes.data';

describe('ClassesPendingReviewComponent', () => {
  let component: ClassesPendingReviewComponent;
  let fixture: ComponentFixture<ClassesPendingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesPendingReviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesPendingReviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_CLASSES_PENDING_REVIEWS);
    fixture.detectChanges();
  });

  it('should create and render all pending review items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.pending-item');
    expect(items.length).toBe(3);
  });

  it('should display item titles and counts correctly', () => {
    const titles = fixture.nativeElement.querySelectorAll('.item-title');
    expect(titles[0].textContent).toContain('Assignments');
    expect(titles[1].textContent).toContain('Portfolio Tasks');
    expect(titles[2].textContent).toContain('Essays / Theory');

    const counts = fixture.nativeElement.querySelectorAll('.count-box');
    expect(counts[0].textContent.trim()).toBe('12');
    expect(counts[1].textContent.trim()).toBe('4');
    expect(counts[2].textContent.trim()).toBe('2');
  });

  it('should render view all action link', () => {
    const link = fixture.nativeElement.querySelector('.card-header-link');
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('View all');
    expect(link.getAttribute('href')).toBe('/teacher/assignments');
  });
});
