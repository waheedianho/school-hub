import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UpcomingEventsComponent } from './upcoming-events';
import { UPCOMING_EVENTS_DATA } from '../../data/school-admin-dashboard.data';

describe('UpcomingEventsComponent', () => {
  let component: UpcomingEventsComponent;
  let fixture: ComponentFixture<UpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingEventsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('events', UPCOMING_EVENTS_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all upcoming events', () => {
    const items = fixture.nativeElement.querySelectorAll('.event-item');
    expect(items.length).toBe(UPCOMING_EVENTS_DATA.length);
  });

  it('should display event title and month correctly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Third Term Continuous Assessment');
    expect(text).toContain('MAY');
    expect(text).toContain('02');
  });
});
