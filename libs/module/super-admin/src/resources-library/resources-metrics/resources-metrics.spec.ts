import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesMetricsComponent } from './resources-metrics';
import { INITIAL_RESOURCE_METRICS } from '../../data/super-admin-resources.data';

describe('ResourcesMetricsComponent', () => {
  let component: ResourcesMetricsComponent;
  let fixture: ComponentFixture<ResourcesMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_RESOURCE_METRICS);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 6 metric cards with correct labels and values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);

    expect(compiled.textContent).toContain('Total Resources');
    expect(compiled.textContent).toContain('8,742');
    expect(compiled.textContent).toContain('Approved Resources');
    expect(compiled.textContent).toContain('7,215');
    expect(compiled.textContent).toContain('Pending Review');
    expect(compiled.textContent).toContain('412');
    expect(compiled.textContent).toContain('Storage Used');
    expect(compiled.textContent).toContain('248.6 GB');
  });
});
