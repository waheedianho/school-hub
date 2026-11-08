import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CurriculumCoverageComponent } from './curriculum-coverage';
import { CURRICULUM_COVERAGE_DATA } from '../../data/school-admin-dashboard.data';

describe('CurriculumCoverageComponent', () => {
  let component: CurriculumCoverageComponent;
  let fixture: ComponentFixture<CurriculumCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumCoverageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumCoverageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('coverage', CURRICULUM_COVERAGE_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display overall coverage percentage', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('68%');
    expect(text).toContain('Overall Coverage');
  });

  it('should display breakdown status items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('On Track');
    expect(text).toContain('Behind');
    expect(text).toContain('At Risk');
  });
});
