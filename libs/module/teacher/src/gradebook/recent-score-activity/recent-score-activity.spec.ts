import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentScoreActivityComponent } from './recent-score-activity';
import { RECENT_SCORE_ACTIVITIES } from '../../data/teacher-gradebook.data';

describe('RecentScoreActivityComponent', () => {
  let component: RecentScoreActivityComponent;
  let fixture: ComponentFixture<RecentScoreActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentScoreActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentScoreActivityComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activities', RECENT_SCORE_ACTIVITIES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 activity items', () => {
    const items = fixture.nativeElement.querySelectorAll('.activity-item');
    expect(items.length).toBe(RECENT_SCORE_ACTIVITIES.length);
  });

  it('should emit viewAll when View all link is clicked', () => {
    const emitSpy = vi.fn();
    component.viewAll.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.view-all-link');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
