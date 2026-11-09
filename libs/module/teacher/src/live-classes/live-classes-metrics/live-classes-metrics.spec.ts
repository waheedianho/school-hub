import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesMetricsComponent } from './live-classes-metrics';

describe('LiveClassesMetricsComponent', () => {
  let component: LiveClassesMetricsComponent;
  let fixture: ComponentFixture<LiveClassesMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 metric cards by default', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });
});
