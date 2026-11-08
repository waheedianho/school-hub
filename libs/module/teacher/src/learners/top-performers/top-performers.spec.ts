import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPerformersComponent } from './top-performers';
import { TOP_PERFORMERS_THIS_WEEK } from '../../data/teacher-learners.data';

describe('TopPerformersComponent', () => {
  let component: TopPerformersComponent;
  let fixture: ComponentFixture<TopPerformersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPerformersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopPerformersComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('performers', TOP_PERFORMERS_THIS_WEEK);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render performers list correctly', () => {
    const items = fixture.nativeElement.querySelectorAll('.performer-item');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Aisha Ahmed');
    expect(items[0].textContent).toContain('92%');
  });

  it('should emit viewAll when link is clicked', () => {
    const spy = vi.fn();
    component.viewAll.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('.view-all-link');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });
});
