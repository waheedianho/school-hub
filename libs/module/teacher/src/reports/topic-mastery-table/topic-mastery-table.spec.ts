import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicMasteryTableComponent } from './topic-mastery-table';
import { TOPIC_MASTERY_DATA } from '../../data/teacher-reports.data';

describe('TopicMasteryTableComponent', () => {
  let component: TopicMasteryTableComponent;
  let fixture: ComponentFixture<TopicMasteryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicMasteryTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicMasteryTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('topics', TOPIC_MASTERY_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 topic rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
    expect(rows[0].textContent).toContain('Whole Numbers');
    expect(rows[0].textContent).toContain('76%');
    expect(rows[0].textContent).toContain('Good');
  });

  it('should emit viewFullAnalysis on link click', () => {
    const spy = vi.fn();
    component.viewFullAnalysis.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('.view-link-btn');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });
});
