import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassesSummaryMetricsComponent } from './summary-metrics';
import { CLASSES_OVERVIEW_METRICS_DATA } from '../../data/school-admin-classes.data';

describe('ClassesSummaryMetricsComponent', () => {
  let component: ClassesSummaryMetricsComponent;
  let fixture: ComponentFixture<ClassesSummaryMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesSummaryMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesSummaryMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', CLASSES_OVERVIEW_METRICS_DATA);
    fixture.detectChanges();
  });

  it('should create and render all 4 metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.metric-card').length).toBe(4);
    expect(compiled.textContent).toContain('Total Classes');
    expect(compiled.textContent).toContain('24');
    expect(compiled.textContent).toContain('Total Learners');
    expect(compiled.textContent).toContain('612');
    expect(compiled.textContent).toContain('Active Enrollments');
    expect(compiled.textContent).toContain('598');
    expect(compiled.textContent).toContain('Average Class Size');
    expect(compiled.textContent).toContain('24.9');
  });
});
