import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectPerformanceChartComponent } from './subject-performance-chart';
import { CLASS_SUBJECT_PERFORMANCE_DATA } from '../../data/teacher-reports.data';

describe('SubjectPerformanceChartComponent', () => {
  let component: SubjectPerformanceChartComponent;
  let fixture: ComponentFixture<SubjectPerformanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectPerformanceChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectPerformanceChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', CLASS_SUBJECT_PERFORMANCE_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 subject bars', () => {
    const bars = fixture.nativeElement.querySelectorAll('.bar-col');
    expect(bars.length).toBe(5);
    expect(bars[0].textContent).toContain('English Lang.');
    expect(bars[0].textContent).toContain('78%');
  });
});
