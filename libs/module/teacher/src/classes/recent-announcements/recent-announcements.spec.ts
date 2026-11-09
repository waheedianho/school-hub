import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecentAnnouncementsComponent } from './recent-announcements';
import { TEACHER_ANNOUNCEMENTS_DATA } from '../../data/teacher-classes.data';

describe('RecentAnnouncementsComponent', () => {
  let component: RecentAnnouncementsComponent;
  let fixture: ComponentFixture<RecentAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentAnnouncementsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_ANNOUNCEMENTS_DATA);
    fixture.detectChanges();
  });

  it('should create and render all announcements', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.announcement-item');
    expect(items.length).toBe(3);
  });

  it('should render titles and timestamps', () => {
    const titles = fixture.nativeElement.querySelectorAll(
      '.announcement-title',
    );
    expect(titles[0].textContent).toContain('Weekly Quiz on Nouns');
    expect(titles[1].textContent).toContain('Submit Homework');
    expect(titles[2].textContent).toContain('Live Class Reminder');

    const times = fixture.nativeElement.querySelectorAll('.announcement-time');
    expect(times[0].textContent).toContain('Today, 9:00 AM');
  });

  it('should render header link to view all', () => {
    const link = fixture.nativeElement.querySelector('.card-header-link');
    expect(link.textContent).toContain('View all');
    expect(link.getAttribute('href')).toBe('/teacher/messages');
  });
});
