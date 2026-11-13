import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolsSidebarComponent } from './schools-sidebar';
import {
  ONBOARDING_BREAKDOWN_DATA,
  RECENT_INSTITUTION_ACTIVITIES,
  SCHOOLS_ATTENTION_STATS,
} from '../../../data/super-admin-schools.data';

describe('SchoolsSidebarComponent', () => {
  let component: SchoolsSidebarComponent;
  let fixture: ComponentFixture<SchoolsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'onboardingBreakdown',
      ONBOARDING_BREAKDOWN_DATA,
    );
    fixture.componentRef.setInput(
      'recentActivities',
      RECENT_INSTITUTION_ACTIVITIES,
    );
    fixture.componentRef.setInput('attentionStats', SCHOOLS_ATTENTION_STATS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 sidebar cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.sidebar-card');
    expect(cards.length).toBe(3);
  });

  it('should render activities list', () => {
    const items = fixture.nativeElement.querySelectorAll('.activity-item');
    expect(items.length).toBe(RECENT_INSTITUTION_ACTIVITIES.length);
  });

  it('should render attention items and emit on click', () => {
    let clickedId = '';
    component.filterByAttention.subscribe((id) => {
      clickedId = id;
    });

    const attentionBtns =
      fixture.nativeElement.querySelectorAll('.attention-item');
    expect(attentionBtns.length).toBe(SCHOOLS_ATTENTION_STATS.length);

    attentionBtns[0].click();
    expect(clickedId).toBe('att-1');
  });
});
