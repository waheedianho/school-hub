import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LessonsSummaryMetricsComponent', () => {
  let component: LessonsSummaryMetricsComponent;
  let fixture: ComponentFixture<LessonsSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render active lessons 5 KPI metrics', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Active Lessons This Week');
    expect(compiled.textContent).toContain('42');
    expect(compiled.textContent).toContain('Lessons Completed');
    expect(compiled.textContent).toContain('31');
    expect(compiled.textContent).toContain('Classes On Track');
    expect(compiled.textContent).toContain('18');
    expect(compiled.textContent).toContain('Delivery Packs Ready');
    expect(compiled.textContent).toContain('88%');
    expect(compiled.textContent).toContain('Lessons Needing Review');
    expect(compiled.textContent).toContain('7');
  });

  it('should adapt metrics dynamically when active tab changes', () => {
    store.setActiveLessonsTab('delivery-oversight');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('48');
    expect(compiled.textContent).toContain('36');
    expect(compiled.textContent).toContain('22');
    expect(compiled.textContent).toContain('92%');
    expect(compiled.textContent).toContain('8');
  });
});
