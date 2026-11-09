import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookMetricsComponent } from './gradebook-metrics';
import { TEACHER_GRADEBOOK_METRICS } from '../../data/teacher-gradebook.data';

describe('GradebookMetricsComponent', () => {
  let component: GradebookMetricsComponent;
  let fixture: ComponentFixture<GradebookMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_GRADEBOOK_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should display correct metric values and labels', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('112');
    expect(values[1].textContent.trim()).toBe('36');
    expect(values[2].textContent.trim()).toBe('7');
    expect(values[3].textContent.trim()).toBe('72%');
    expect(values[4].textContent.trim()).toBe('84');
  });
});
