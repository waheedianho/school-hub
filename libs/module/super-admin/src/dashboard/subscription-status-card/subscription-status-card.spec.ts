import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionStatusCardComponent } from './subscription-status-card';
import { SUBSCRIPTION_STATUS_DATA } from '../../data/super-admin-dashboard.data';

describe('SubscriptionStatusCardComponent', () => {
  let component: SubscriptionStatusCardComponent;
  let fixture: ComponentFixture<SubscriptionStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionStatusCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionStatusCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', SUBSCRIPTION_STATUS_DATA);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render subscription breakdown with correct values', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Active');
    expect(text).toContain('1,102');
    expect(text).toContain('61.3%');
    expect(text).toContain('Trial');
    expect(text).toContain('Total');
    expect(text).toContain('1,798');
  });
});
