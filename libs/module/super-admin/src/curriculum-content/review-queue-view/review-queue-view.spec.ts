import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewQueueViewComponent } from './review-queue-view';
import {
  REVIEW_QUEUE_SUMMARY,
  SAMPLE_REVIEW_QUEUE_ITEMS,
} from '../../data/super-admin-curriculum.data';

describe('ReviewQueueViewComponent', () => {
  let component: ReviewQueueViewComponent;
  let fixture: ComponentFixture<ReviewQueueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewQueueViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewQueueViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('queueItems', SAMPLE_REVIEW_QUEUE_ITEMS);
    fixture.componentRef.setInput('summary', REVIEW_QUEUE_SUMMARY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render review queue counter metrics', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('High Priority');
    expect(text).toContain('32');
    expect(text).toContain('Awaiting Academic Review');
    expect(text).toContain('128');
  });

  it('should filter queue items by priority', () => {
    component.priorityFilter.set('High');
    expect(component.filteredItems().every((i) => i.priority === 'High')).toBe(
      true,
    );
  });

  it('should emit approve and requestChanges events', () => {
    const approveSpy = vi.spyOn(component.approve, 'emit');
    const fixSpy = vi.spyOn(component.requestChanges, 'emit');

    const firstItem = SAMPLE_REVIEW_QUEUE_ITEMS[0];
    component.approve.emit(firstItem.id);
    component.requestChanges.emit(firstItem.id);

    expect(approveSpy).toHaveBeenCalledWith(firstItem.id);
    expect(fixSpy).toHaveBeenCalledWith(firstItem.id);
  });
});
