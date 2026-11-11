import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CommunicationSummaryMetricsComponent', () => {
  let component: CommunicationSummaryMetricsComponent;
  let fixture: ComponentFixture<CommunicationSummaryMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationSummaryMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('renders all 4 metric cards with correct values from design', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const totalMessages = compiled.querySelector(
      '[data-testid="metric-total-messages"]',
    );
    expect(totalMessages).toBeTruthy();
    expect(totalMessages?.textContent).toContain('428');
    expect(totalMessages?.textContent).toContain('Total Messages Sent');
    expect(totalMessages?.textContent).toContain('+18% vs last week');

    const announcements = compiled.querySelector(
      '[data-testid="metric-announcements-published"]',
    );
    expect(announcements).toBeTruthy();
    expect(announcements?.textContent).toContain('24');
    expect(announcements?.textContent).toContain('Announcements Published');
    expect(announcements?.textContent).toContain('+20% vs last week');

    const parentComm = compiled.querySelector(
      '[data-testid="metric-parent-communications"]',
    );
    expect(parentComm).toBeTruthy();
    expect(parentComm?.textContent).toContain('276');
    expect(parentComm?.textContent).toContain('Parent Communications');
    expect(parentComm?.textContent).toContain('+15% vs last week');

    const pendingReplies = compiled.querySelector(
      '[data-testid="metric-pending-replies"]',
    );
    expect(pendingReplies).toBeTruthy();
    expect(pendingReplies?.textContent).toContain('37');
    expect(pendingReplies?.textContent).toContain('Pending Replies');
    expect(pendingReplies?.textContent).toContain('-8% vs last week');
  });
});
