import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SCHEDULED_LIVE_CLASSES } from '../../data/teacher-live-classes.data';
import { ScheduledLiveClassesTableComponent } from './scheduled-live-classes-table';

describe('ScheduledLiveClassesTableComponent', () => {
  let component: ScheduledLiveClassesTableComponent;
  let fixture: ComponentFixture<ScheduledLiveClassesTableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledLiveClassesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledLiveClassesTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.componentRef.setInput('scheduledClasses', SCHEDULED_LIVE_CLASSES);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render rows for all scheduled classes', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(SCHEDULED_LIVE_CLASSES.length);
  });

  it('should navigate to session when Join button is clicked', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    const joinBtn = fixture.nativeElement.querySelector('.join-link-btn');
    joinBtn.click();

    expect(navigatedCommands).toEqual(['/teacher/live-classes/session']);
  });
});
