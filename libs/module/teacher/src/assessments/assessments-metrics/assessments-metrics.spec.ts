import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsMetricsComponent } from './assessments-metrics';
import { TEACHER_ASSESSMENTS_METRICS } from '../../data/teacher-assessments.data';

describe('AssessmentsMetricsComponent', () => {
  let component: AssessmentsMetricsComponent;
  let fixture: ComponentFixture<AssessmentsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_ASSESSMENTS_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(4);
  });

  it('should display correct metric values and labels', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('36');
    expect(values[1].textContent.trim()).toBe('248');
    expect(values[2].textContent.trim()).toBe('5');
    expect(values[3].textContent.trim()).toBe('9');
  });

  it('should render action badge for pending marking item', () => {
    const actionBadge = fixture.nativeElement.querySelector('.action-badge');
    expect(actionBadge).toBeTruthy();
  });
});
