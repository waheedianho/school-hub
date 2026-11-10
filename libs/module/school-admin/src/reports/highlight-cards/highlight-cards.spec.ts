import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsHighlightCardsComponent } from './highlight-cards';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsHighlightCardsComponent', () => {
  let component: ReportsHighlightCardsComponent;
  let fixture: ComponentFixture<ReportsHighlightCardsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsHighlightCardsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsHighlightCardsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render all 4 highlight cards and the notice banner', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="card-top-class"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-most-improved"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-lowest-attendance"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-intervention-success"]'),
    ).toBeTruthy();
    expect(compiled.querySelector('.notice-banner')).toBeTruthy();

    expect(compiled.textContent).toContain('Top Performing Class');
    expect(compiled.textContent).toContain('JSS 3B');
    expect(compiled.textContent).toContain('Computer Studies');
    expect(compiled.textContent).toContain('JSS 3A');
    expect(compiled.textContent).toContain('Intervention Success Rate');
    expect(compiled.textContent).toContain('Data Accuracy & Moderation Notice');
  });

  it('should react to store insight updates', () => {
    store.reportsHighlightInsights.set({
      topPerformingClass: {
        className: 'SSS 2A',
        averageScore: 84.2,
        change: 4.5,
      },
      mostImprovedSubject: {
        subject: 'Basic Science',
        improvement: 8.5,
      },
      lowestAttendanceClass: {
        className: 'JSS 1B',
        attendanceAverage: 81.0,
        change: -3.0,
      },
      interventionSuccess: {
        successRate: 85,
        studentsShowingImprovement: 150,
        change: 5,
      },
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SSS 2A');
    expect(compiled.textContent).toContain('84.2%');
    expect(compiled.textContent).toContain('Basic Science (+8.5%)');
  });
});
