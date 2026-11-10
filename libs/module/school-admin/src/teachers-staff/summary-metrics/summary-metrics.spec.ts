import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeachersSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('TeachersSummaryMetricsComponent', () => {
  let component: TeachersSummaryMetricsComponent;
  let fixture: ComponentFixture<TeachersSummaryMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersSummaryMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render all 5 metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);

    expect(compiled.textContent).toContain('Total Teachers');
    expect(compiled.textContent).toContain('48');
    expect(compiled.textContent).toContain('Support Staff');
    expect(compiled.textContent).toContain('18');
    expect(compiled.textContent).toContain('Active Staff');
    expect(compiled.textContent).toContain('58');
    expect(compiled.textContent).toContain('Unassigned Teachers');
    expect(compiled.textContent).toContain('3');
    expect(compiled.textContent).toContain('Avg. Feedback Completion');
    expect(compiled.textContent).toContain('78%');
  });
});
