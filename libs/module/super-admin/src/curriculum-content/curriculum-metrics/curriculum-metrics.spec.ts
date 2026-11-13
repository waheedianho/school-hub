import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumMetricsComponent } from './curriculum-metrics';
import { CURRICULUM_METRICS } from '../../data/super-admin-curriculum.data';

describe('CurriculumMetricsComponent', () => {
  let component: CurriculumMetricsComponent;
  let fixture: ComponentFixture<CurriculumMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', CURRICULUM_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 6 curriculum metrics', () => {
    const cards = fixture.nativeElement.querySelectorAll(
      '[data-testid^="metric-"]',
    );
    expect(cards.length).toBe(6);
  });

  it('should display correct values and labels for Total Curriculum Packs and Approved Content', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Total Curriculum Packs');
    expect(text).toContain('1,286');
    expect(text).toContain('Approved Content');
    expect(text).toContain('842');
  });

  it('should display trend indicators with percentage changes', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('5.2%');
    expect(text).toContain('vs Apr 2025');
  });
});
