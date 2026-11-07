import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassesPerformanceOverviewComponent } from './classes-performance-overview';
import { TEACHER_PERFORMANCE_TIERS } from '../../data/teacher-classes.data';

describe('ClassesPerformanceOverviewComponent', () => {
  let component: ClassesPerformanceOverviewComponent;
  let fixture: ComponentFixture<ClassesPerformanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesPerformanceOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesPerformanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tiers', TEACHER_PERFORMANCE_TIERS);
    fixture.detectChanges();
  });

  it('should create and calculate donut slices for 5 tiers', () => {
    expect(component).toBeTruthy();
    expect(component.slices().length).toBe(5);
    const legendRows = fixture.nativeElement.querySelectorAll('.legend-row');
    expect(legendRows.length).toBe(5);
  });

  it('should render center text with overall average', () => {
    const centerVal = fixture.nativeElement.querySelector('.center-val');
    expect(centerVal.textContent.trim()).toBe('72%');
  });

  it('should render legend percentages matching data', () => {
    const percentages =
      fixture.nativeElement.querySelectorAll('.legend-percentage');
    expect(percentages[0].textContent.trim()).toBe('25%');
    expect(percentages[1].textContent.trim()).toBe('30%');
    expect(percentages[2].textContent.trim()).toBe('35%');
    expect(percentages[3].textContent.trim()).toBe('8%');
    expect(percentages[4].textContent.trim()).toBe('2%');
  });
});
