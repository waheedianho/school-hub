import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsPerformanceChartsComponent } from './performance-charts';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsPerformanceChartsComponent', () => {
  let component: ReportsPerformanceChartsComponent;
  let fixture: ComponentFixture<ReportsPerformanceChartsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsPerformanceChartsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsPerformanceChartsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render trend chart and class overview bar chart', () => {
    expect(component).toBeTruthy();
    expect(store.termPerformanceTrend().length).toBe(3);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-testid="chart-performance-trend"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="chart-class-overview"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('School Performance Trend');
    expect(compiled.textContent).toContain('Class Performance Overview');
    expect(compiled.textContent).toContain('First Term');
    expect(compiled.textContent).toContain('Mathematics');
    expect(compiled.textContent).toContain('English Language');
  });

  it('should compute SVG trend coordinates and bar heights accurately', () => {
    const coords = component.getTrendCoordinates();
    expect(coords.pointsStr).toBeTruthy();
    expect(coords.areaStr).toBeTruthy();

    const height = component.getBarHeight(75);
    expect(height).toBe(75);

    const clampedLow = component.getBarHeight(2);
    expect(clampedLow).toBe(10);

    const clampedHigh = component.getBarHeight(120);
    expect(clampedHigh).toBe(100);
  });

  it('should handle hovering on trend point and bar', () => {
    component.setHoveredTrend({ termName: 'Third Term', averageScore: 74.8 });
    expect(component.hoveredTrendPoint()?.termName).toBe('Third Term');

    component.setHoveredBar('Mathematics', 'JSS 3', 76);
    expect(component.hoveredBar()?.score).toBe(76);

    component.clearHoveredBar();
    expect(component.hoveredBar()).toBeNull();
  });
});
