import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsMetricsComponent } from './lessons-metrics';
import { TEACHER_LESSONS_METRICS } from '../../data/teacher-lessons.data';

describe('LessonsMetricsComponent', () => {
  let component: LessonsMetricsComponent;
  let fixture: ComponentFixture<LessonsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_LESSONS_METRICS);
    fixture.detectChanges();
  });

  it('should create and render 5 metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should render correct values and labels', () => {
    const labels = fixture.nativeElement.querySelectorAll('.metric-label');
    expect(labels[0].textContent).toContain('Total Delivery Packs');
    expect(labels[1].textContent).toContain('Ready to Teach');
    expect(labels[2].textContent).toContain('In Progress');

    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('128');
    expect(values[1].textContent.trim()).toBe('86');
    expect(values[2].textContent.trim()).toBe('28');
  });
});
