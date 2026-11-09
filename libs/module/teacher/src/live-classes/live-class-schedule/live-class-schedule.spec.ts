import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TODAY_LIVE_CLASS_SCHEDULE } from '../../data/teacher-live-classes.data';
import { LiveClassScheduleComponent } from './live-class-schedule';

describe('LiveClassScheduleComponent', () => {
  let component: LiveClassScheduleComponent;
  let fixture: ComponentFixture<LiveClassScheduleComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassScheduleComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all schedule items', () => {
    const items = fixture.nativeElement.querySelectorAll('.schedule-item');
    expect(items.length).toBe(TODAY_LIVE_CLASS_SCHEDULE.length);
  });

  it('should navigate to session when Join is clicked', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    const joinBtn = fixture.nativeElement.querySelector('.join-btn');
    joinBtn.click();

    expect(navigatedCommands).toEqual(['/teacher/live-classes/session']);
  });
});
