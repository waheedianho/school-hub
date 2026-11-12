import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopMetricsComponent } from './top-metrics';
import { SUPER_ADMIN_METRICS } from '../../data/super-admin-dashboard.data';

describe('TopMetricsComponent', () => {
  let component: TopMetricsComponent;
  let fixture: ComponentFixture<TopMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', SUPER_ADMIN_METRICS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 6 metrics', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should display correct values and labels', () => {
    const firstCard = fixture.nativeElement.querySelector('.metric-card');
    expect(firstCard.textContent).toContain('Total Schools');
    expect(firstCard.textContent).toContain('1,248');
    expect(firstCard.textContent).toContain('4.3%');
  });
});
