import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignmentsMetricsComponent } from './assignments-metrics';

describe('AssignmentsMetricsComponent', () => {
  let component: AssignmentsMetricsComponent;
  let fixture: ComponentFixture<AssignmentsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });
});
