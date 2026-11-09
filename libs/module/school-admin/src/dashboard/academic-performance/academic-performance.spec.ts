import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AcademicPerformanceComponent } from './academic-performance';
import { ACADEMIC_PERFORMANCE_DATA } from '../../data/school-admin-dashboard.data';

describe('AcademicPerformanceComponent', () => {
  let component: AcademicPerformanceComponent;
  let fixture: ComponentFixture<AcademicPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicPerformanceComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicPerformanceComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('performance', ACADEMIC_PERFORMANCE_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 6 class form bars', () => {
    const bars = fixture.nativeElement.querySelectorAll('.bar-column');
    expect(bars.length).toBe(6);
  });

  it('should display the school average legend label', () => {
    const legendText = fixture.nativeElement.textContent;
    expect(legendText).toContain('School Average (72%)');
  });
});
