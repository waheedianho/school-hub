import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ResourcesSummaryMetricsComponent', () => {
  let component: ResourcesSummaryMetricsComponent;
  let fixture: ComponentFixture<ResourcesSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render all 5 metric cards with exact design values', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="metric-total-resources"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-approved-resources"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-pending-review"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-low-data"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-resource-gaps"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('1,248');
    expect(compiled.textContent).toContain('Total Resources');
    expect(compiled.textContent).toContain('842');
    expect(compiled.textContent).toContain('Approved Resources');
    expect(compiled.textContent).toContain('186');
    expect(compiled.textContent).toContain('Pending Review');
    expect(compiled.textContent).toContain('72');
    expect(compiled.textContent).toContain('Low-Data Resources');
    expect(compiled.textContent).toContain('68');
    expect(compiled.textContent).toContain('Resource Gaps');
  });

  it('should reflect store updates when metrics change', () => {
    store.resourcesSummaryMetrics.update((m) => ({
      ...m,
      totalResources: 1300,
      approvedResources: 890,
    }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('1,300');
    expect(compiled.textContent).toContain('890');
  });
});
