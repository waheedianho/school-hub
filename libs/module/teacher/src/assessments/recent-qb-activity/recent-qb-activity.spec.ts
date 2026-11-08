import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentQBActivityComponent } from './recent-qb-activity';
import { RECENT_QB_ACTIVITY } from '../../data/teacher-assessments.data';

describe('RecentQBActivityComponent', () => {
  let component: RecentQBActivityComponent;
  let fixture: ComponentFixture<RecentQBActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentQBActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentQBActivityComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activities', RECENT_QB_ACTIVITY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 activity items', () => {
    const items = fixture.nativeElement.querySelectorAll('.activity-item');
    expect(items.length).toBe(RECENT_QB_ACTIVITY.length);
  });

  it('should show user names and action text', () => {
    const names = fixture.nativeElement.querySelectorAll('.user-name');
    expect(names[0].textContent.trim()).toBe('Aisha Musa');
    expect(names[1].textContent.trim()).toBe('Chinedu Okafor');
  });
});
