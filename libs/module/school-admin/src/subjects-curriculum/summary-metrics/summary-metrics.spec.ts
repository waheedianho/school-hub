import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CurriculumSummaryMetricsComponent', () => {
  let component: CurriculumSummaryMetricsComponent;
  let fixture: ComponentFixture<CurriculumSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render subjects metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Total Subjects');
    expect(compiled.textContent).toContain('7');
    expect(compiled.textContent).toContain('Active Curriculum Maps');
    expect(compiled.textContent).toContain('Topics This Term');
    expect(compiled.textContent).toContain('Coverage Rate');
    expect(compiled.textContent).toContain('76%');
  });

  it('should adapt metric cards when switching to curriculum-map tab', () => {
    store.setActiveCurriculumTab('curriculum-map');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Total Curriculum Maps');
    expect(compiled.textContent).toContain('248');
    expect(compiled.textContent).toContain('Total Classes Mapped');
    expect(compiled.textContent).toContain('36');
  });

  it('should adapt metric cards when switching to scheme-of-work tab', () => {
    store.setActiveCurriculumTab('scheme-of-work');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Total Schemes of Work');
    expect(compiled.textContent).toContain('124');
  });
});
