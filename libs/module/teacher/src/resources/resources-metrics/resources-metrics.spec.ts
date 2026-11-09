import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesMetricsComponent } from './resources-metrics';
import { TEACHER_RESOURCES_METRICS } from '../../data/teacher-resources.data';

describe('ResourcesMetricsComponent', () => {
  let component: ResourcesMetricsComponent;
  let fixture: ComponentFixture<ResourcesMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', TEACHER_RESOURCES_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
    expect(cards[0].textContent).toContain('Total Resources');
    expect(cards[0].textContent).toContain('248');
    expect(cards[1].textContent).toContain('Lesson Notes');
    expect(cards[2].textContent).toContain('Worksheets');
    expect(cards[3].textContent).toContain('Video Lessons');
    expect(cards[4].textContent).toContain('Shared This Week');
  });
});
