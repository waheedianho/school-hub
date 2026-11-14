import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesBottomMetricsComponent } from './resources-bottom-metrics';
import { INITIAL_RESOURCE_BOTTOM_METRICS } from '../../data/super-admin-resources.data';

describe('ResourcesBottomMetricsComponent', () => {
  let component: ResourcesBottomMetricsComponent;
  let fixture: ComponentFixture<ResourcesBottomMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesBottomMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesBottomMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'bottomMetrics',
      INITIAL_RESOURCE_BOTTOM_METRICS,
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 bottom metric cards with values and labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.bottom-card');
    expect(cards.length).toBe(4);

    expect(compiled.textContent).toContain('Downloads This Month');
    expect(compiled.textContent).toContain('28,641');
    expect(compiled.textContent).toContain('Approval Turnaround Time');
    expect(compiled.textContent).toContain('18h 42m');
    expect(compiled.textContent).toContain('Schools Using Shared Resources');
    expect(compiled.textContent).toContain('342');
    expect(compiled.textContent).toContain('Resource Reuse Rate');
    expect(compiled.textContent).toContain('67.8%');
  });
});
