import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnersMetricsComponent } from './learners-metrics';
import { TEACHER_LEARNERS_METRICS } from '../../data/teacher-learners.data';

describe('LearnersMetricsComponent', () => {
  let component: LearnersMetricsComponent;
  let fixture: ComponentFixture<LearnersMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnersMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_LEARNERS_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(4);
  });

  it('should display correct metric values and labels', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('112');
    expect(values[1].textContent.trim()).toBe('104');
    expect(values[2].textContent.trim()).toBe('18');
    expect(values[3].textContent.trim()).toBe('72%');
  });
});
