import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassPerformanceComponent } from './class-performance';
import { TEACHER_CLASS_PERFORMANCE_DATA } from '../../data/teacher-dashboard.data';

describe('ClassPerformanceComponent', () => {
  let component: ClassPerformanceComponent;
  let fixture: ComponentFixture<ClassPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassPerformanceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassPerformanceComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'performance',
      TEACHER_CLASS_PERFORMANCE_DATA,
    );
    fixture.detectChanges();
  });

  it('should create and render donut segments', () => {
    expect(component).toBeTruthy();
    const circles = fixture.nativeElement.querySelectorAll('circle');
    expect(circles.length).toBe(3);
  });

  it('should render legend items with correct labels and percentages', () => {
    const labels = fixture.nativeElement.querySelectorAll('.class-label');
    expect(labels[0].textContent).toContain('JSS 1A');
    expect(labels[1].textContent).toContain('JSS 2B');
    expect(labels[2].textContent).toContain('JSS 3A');

    const values = fixture.nativeElement.querySelectorAll('.score-value');
    expect(values[0].textContent).toContain('74%');
    expect(values[1].textContent).toContain('68%');
    expect(values[2].textContent).toContain('61%');
  });
});
