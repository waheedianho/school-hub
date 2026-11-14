import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionDetailModalComponent } from './subscription-detail-modal';
import { INITIAL_SCHOOL_SUBSCRIPTIONS } from '../../data/super-admin-subscriptions.data';

describe('SubscriptionDetailModalComponent', () => {
  let component: SubscriptionDetailModalComponent;
  let fixture: ComponentFixture<SubscriptionDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'subscription',
      INITIAL_SCHOOL_SUBSCRIPTIONS[0],
    );
    fixture.detectChanges();
  });

  it('should create and render details of the school subscription', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Greenfield International School');
    expect(compiled.textContent).toContain('greenfield.edu');
    expect(compiled.textContent).toContain('Enterprise');
    expect(compiled.textContent).toContain('$12,000.00');
    expect(compiled.textContent).toContain('1200 learners');
  });

  it('should emit closed when close button is clicked', () => {
    const closeSpy = vi.fn();
    component.closed.subscribe(closeSpy);

    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
