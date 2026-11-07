import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumMetricsComponent } from './curriculum-metrics';
import { TEACHER_CURRICULUM_METRICS } from '../../data/teacher-curriculum.data';

describe('CurriculumMetricsComponent', () => {
  let component: CurriculumMetricsComponent;
  let fixture: ComponentFixture<CurriculumMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_CURRICULUM_METRICS);
    fixture.detectChanges();
  });

  it('should create and render 5 metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should render correct values and labels', () => {
    const labels = fixture.nativeElement.querySelectorAll('.metric-label');
    expect(labels[0].textContent).toContain('Total Subjects');
    expect(labels[1].textContent).toContain('Active Classes');
    expect(labels[2].textContent).toContain('Curriculum Coverage');

    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('3');
    expect(values[1].textContent.trim()).toBe('5');
    expect(values[2].textContent.trim()).toBe('68%');
  });

  it('should format growth subtext with growth class', () => {
    const growthElem = fixture.nativeElement.querySelector('.subtext-growth');
    expect(growthElem).toBeTruthy();
    expect(growthElem.textContent).toContain('↑ 8% vs last term');
  });
});
