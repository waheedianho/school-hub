import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassesMetricsComponent } from './classes-metrics';
import { TEACHER_CLASSES_METRICS } from '../../data/teacher-classes.data';

describe('ClassesMetricsComponent', () => {
  let component: ClassesMetricsComponent;
  let fixture: ComponentFixture<ClassesMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_CLASSES_METRICS);
    fixture.detectChanges();
  });

  it('should create and render 5 metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should display correct labels and values', () => {
    const labels = fixture.nativeElement.querySelectorAll('.metric-label');
    expect(labels[0].textContent).toContain('Total Classes');
    expect(labels[2].textContent).toContain('Class Average');

    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent).toContain('4');
    expect(values[2].textContent).toContain('72%');
  });
});
