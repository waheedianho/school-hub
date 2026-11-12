import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SupportTicketsCardComponent } from './support-tickets-card';
import { RECENT_SUPPORT_TICKETS } from '../../data/super-admin-dashboard.data';

describe('SupportTicketsCardComponent', () => {
  let component: SupportTicketsCardComponent;
  let fixture: ComponentFixture<SupportTicketsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportTicketsCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportTicketsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tickets', RECENT_SUPPORT_TICKETS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all support tickets', () => {
    const items = fixture.nativeElement.querySelectorAll('.ticket-item');
    expect(items.length).toBe(4);
  });

  it('should display ticket number and status', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('#SUP-4821');
    expect(text).toContain('Cannot import learners via CSV');
    expect(text).toContain('Open');
  });
});
