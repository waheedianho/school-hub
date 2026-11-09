import { ComponentFixture, TestBed } from '@angular/core/testing';
import { REVIEW_QUEUE_ITEMS } from '../../data/teacher-assignments.data';
import { ReviewQueueComponent } from './review-queue';

describe('ReviewQueueComponent', () => {
  let component: ReviewQueueComponent;
  let fixture: ComponentFixture<ReviewQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewQueueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all queue items', () => {
    const items = fixture.nativeElement.querySelectorAll('.queue-item');
    expect(items.length).toBe(REVIEW_QUEUE_ITEMS.length);
  });
});
