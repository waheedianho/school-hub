import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportSidebarComponent } from './support-sidebar';
import {
  INITIAL_RECENT_SUPPORT_ACTIVITIES,
  INITIAL_SLA_QUEUE_BREAKDOWN,
  INITIAL_SUPPORT_HEALTH_CATEGORIES,
  INITIAL_SUPPORT_URGENT_ESCALATIONS,
} from '../../data/super-admin-support.data';

describe('SupportSidebarComponent', () => {
  let component: SupportSidebarComponent;
  let fixture: ComponentFixture<SupportSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'healthCategories',
      INITIAL_SUPPORT_HEALTH_CATEGORIES,
    );
    fixture.componentRef.setInput(
      'urgentEscalations',
      INITIAL_SUPPORT_URGENT_ESCALATIONS,
    );
    fixture.componentRef.setInput('slaQueue', INITIAL_SLA_QUEUE_BREAKDOWN);
    fixture.componentRef.setInput(
      'recentActivities',
      INITIAL_RECENT_SUPPORT_ACTIVITIES,
    );
    fixture.detectChanges();
  });

  it('should create and render all 5 sidebar cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.sidebar-card');
    expect(cards.length).toBe(5);
  });

  it('should display health overview donut values', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Support Health Overview');
    expect(text).toContain('128');
    expect(text).toContain('Total Tickets');
    expect(text).toContain('Urgent Escalations');
    expect(text).toContain('SLA Queue');
    expect(text).toContain('Recent Support Activity');
    expect(text).toContain('Quick Support Actions');
  });

  it('should emit action events when quick buttons are clicked', () => {
    const createSpy = vi.spyOn(component.createTicketAction, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    buttons[0].click();
    expect(createSpy).toHaveBeenCalled();
  });
});
