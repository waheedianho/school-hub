import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AssessmentsSummaryMetricsComponent', () => {
  let component: AssessmentsSummaryMetricsComponent;
  let fixture: ComponentFixture<AssessmentsSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(store).toBeTruthy();
  });

  it('should display the metrics from store', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('128');
    expect(compiled.textContent).toContain('72');
    expect(compiled.textContent).toContain('28');
    expect(compiled.textContent).toContain('46');
    expect(compiled.textContent).toContain('72.4%');
  });
});
