import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumSidebarComponent } from './curriculum-sidebar';
import {
  CONTENT_HEALTH_DATA,
  RECENT_CONTENT_ACTIVITIES,
  REVIEW_QUEUE_SUMMARY,
} from '../../data/super-admin-curriculum.data';

describe('CurriculumSidebarComponent', () => {
  let component: CurriculumSidebarComponent;
  let fixture: ComponentFixture<CurriculumSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('contentHealth', CONTENT_HEALTH_DATA);
    fixture.componentRef.setInput('reviewSummary', REVIEW_QUEUE_SUMMARY);
    fixture.componentRef.setInput('activities', RECENT_CONTENT_ACTIVITIES);
    fixture.componentRef.setInput('standardsCoverage', 81);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content health overview with donut breakdown numbers', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Content Health Overview');
    expect(text).toContain('842');
    expect(text).toContain('65.4%');
    expect(text).toContain('214');
    expect(text).toContain('16.6%');
    expect(text).toContain('178');
    expect(text).toContain('96');
  });

  it('should render review queue summary metrics', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('High Priority');
    expect(text).toContain('32');
    expect(text).toContain('Awaiting Academic Review');
    expect(text).toContain('128');
    expect(text).toContain('Total in Queue');
  });

  it('should render recent content activity items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('JSS 1 Mathematics – First Term');
    expect(text).toContain('Curriculum pack approved');
    expect(text).toContain('28m ago');
  });

  it('should render standards coverage percentage and progress bar', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Standards Coverage');
    expect(text).toContain('81%');
  });

  it('should emit events for review queue click and view all activities', () => {
    const queueSpy = vi.spyOn(component.openReviewQueue, 'emit');
    const viewAllSpy = vi.spyOn(component.viewAllActivities, 'emit');

    component.openReviewQueue.emit();
    component.viewAllActivities.emit();

    expect(queueSpy).toHaveBeenCalled();
    expect(viewAllSpy).toHaveBeenCalled();
  });
});
